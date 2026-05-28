// IndexedDB操作モジュール
import type { TankaRecord, TankaTagRecord, TankaSettings, TankaTag } from '@/types/tanka';

const DB_NAME = 'tankapic';
const DB_VERSION = 2;

// 短歌データ
const STORE_NAME = 'tankaRecords';
// タグデータ
const STORE_TAG_NAME = 'tankaTagRecords';

// DB接続を取得
function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      const tx = request.transaction!;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }

      // v2 adds a tag store and an index for fast lookup by name
      if (!db.objectStoreNames.contains(STORE_TAG_NAME)) {
        const tagStore = db.createObjectStore(STORE_TAG_NAME, { keyPath: 'id' });
        tagStore.createIndex('by_name', 'name', { unique: false });
      } else {
        // if store exists but index missing, create it in the version change transaction
        const tagStore = tx.objectStore(STORE_TAG_NAME);
        if (!tagStore.indexNames.contains('by_name')) {
          tagStore.createIndex('by_name', 'name', { unique: false });
        }
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * バージョン1の既存indexedDBをバージョン2に移行します。
 * v2ではタグ用の`tankaTagRecords`ストアが追加されるだけなので、
 * 既存の`tankaRecords`ストアのデータはそのまま保持されます。
 */
export async function migrateIndexedDb(): Promise<void> {
  await openDb();
}

// UUIDv4を生成
function generateId(): string {
  return crypto.randomUUID();
}

// レコードIDに紐づくタグ名を取得
function getTagsFromRecordId(id: string, tagRecords: TankaTagRecord[]): string[] {
  const names = tagRecords
    .filter((tag) => tag.ids.includes(id))
    .map((tag) => tag.name)
    .filter((n, i, arr) => n && arr.indexOf(n) === i);
  return names;
}

// 全レコードを取得（更新日時の降順）
export async function getAllTankaRecords(): Promise<TankaRecord[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_NAME, STORE_TAG_NAME], 'readonly');

    // 短歌
    const store = tx.objectStore(STORE_NAME);
    // タグ
    const storeTag = tx.objectStore(STORE_TAG_NAME);

    const getStoreData = new Promise<TankaRecord[]>((res, rej) => {
      const request = store.getAll();
      request.onsuccess = () => res(request.result as TankaRecord[]);
      request.onerror = () => rej(request.error);
    });

    const getTagData = new Promise<TankaTagRecord[]>((res, rej) => {
      const requestTag = storeTag.getAll();
      requestTag.onsuccess = () => res(requestTag.result as TankaTagRecord[]);
      requestTag.onerror = () => rej(requestTag.error);
    });

    Promise.all([getStoreData, getTagData])
      .then(([records, tagRecords]) => {
        const recordsWithTags = (records as TankaRecord[]).map((record) => {
          const tags = getTagsFromRecordId(record.id, tagRecords);
          return { ...record, tags };
        });
        recordsWithTags.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
        resolve(recordsWithTags);
      })
      .catch((error) => reject(error));
  });
}

// 全タグを取得
export async function getAllTankaTags(): Promise<TankaTag[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_TAG_NAME, 'readonly');
    const storeTag = tx.objectStore(STORE_TAG_NAME);

    const requestTag = storeTag.getAll();
    requestTag.onsuccess = () => {
      const tagRecords = requestTag.result as TankaTagRecord[];
      // マージ：同一nameを持つタグがある場合はidsを統合して重複を排除
      const map = new Map<string, Set<string>>();
      tagRecords.forEach((tag) => {
        if (!tag || typeof tag.name !== 'string') return;
        const set = map.get(tag.name) ?? new Set<string>();
        (tag.ids || []).forEach((id) => set.add(id));
        map.set(tag.name, set);
      });

      const tags: TankaTag[] = Array.from(map.entries()).map(([name, ids]) => ({
        name,
        ids: Array.from(ids),
      }));
      resolve(tags);
    };
    requestTag.onerror = () => reject(requestTag.error);
  });
}

// IDでレコードを取得
export async function getTankaRecord(id: string): Promise<TankaRecord | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction([STORE_NAME, STORE_TAG_NAME], 'readonly');

    // 短歌
    const store = tx.objectStore(STORE_NAME);
    // タグ
    const storeTag = tx.objectStore(STORE_TAG_NAME);

    const getStoreData = new Promise<TankaRecord | undefined>((res, rej) => {
      const request = store.get(id);
      request.onsuccess = () => res(request.result as TankaRecord | undefined);
      request.onerror = () => rej(request.error);
    });

    const getTagData = new Promise<TankaTagRecord[]>((res, rej) => {
      const requestTag = storeTag.getAll();
      requestTag.onsuccess = () => res(requestTag.result as TankaTagRecord[]);
      requestTag.onerror = () => rej(requestTag.error);
    });

    Promise.all([getStoreData, getTagData])
      .then(([record, tagRecords]) => {
        if (!record) {
          resolve(undefined);
          return;
        }
        const tags = getTagsFromRecordId(record.id, tagRecords);
        resolve({ ...record, tags });
      })
      .catch((error) => reject(error));
  });
}

// 新規レコードを作成
export async function createTankaRecord(settings: TankaSettings): Promise<TankaRecord> {
  const now = new Date().toISOString();
  const { tags, ...record }: TankaRecord = {
    ...settings,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  const db = await openDb();
  return new Promise((resolve, reject) => {
    // 両ストアを含む単一トランザクションで処理することで一貫性を保つ
    const tx = db.transaction([STORE_NAME, STORE_TAG_NAME], 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const tagStore = tx.objectStore(STORE_TAG_NAME);

    // 短歌の追加（addの結果はトランザクション完了で確定する）
    const addReq = store.add(record);
    addReq.onerror = () => reject(addReq.error);

    // タグの追加（既存タグの更新 or 新規作成）
    if (tags && tags.length > 0) {
      tags.forEach((tagName) => {
        if (typeof tagName !== 'string' || !tagName.trim()) return;
        const name = tagName.trim();

        // 優先: nameインデックスが利用可能ならそれを利用して検索
        let foundReq: IDBRequest | null = null;
        try {
          const idx = tagStore.index('by_name');
          foundReq = idx.get(name);
        } catch (e) {
          // indexがない場合は全件走査にフォールバック
          foundReq = tagStore.getAll();
        }

        if (!foundReq) return;

        foundReq.onsuccess = () => {
          const result = foundReq!.result;
          let existingTag: TankaTagRecord | undefined;

          if (Array.isArray(result)) {
            existingTag = (result as TankaTagRecord[]).find((t) => t.name === name);
          } else {
            existingTag = result as TankaTagRecord | undefined;
          }

          if (existingTag) {
            if (!existingTag.ids.includes(record.id)) {
              existingTag.ids.push(record.id);
              tagStore.put(existingTag);
            }
          } else {
            const newTag: TankaTagRecord = {
              id: generateId(),
              name,
              ids: [record.id],
              createdAt: now,
              updateAt: now,
            };
            tagStore.put(newTag);
          }
        };

        foundReq.onerror = () => reject(foundReq!.error);
      });
    }

    tx.oncomplete = () => resolve(record);
    tx.onerror = () => reject(tx.error);
  });
}

// 既存レコードを更新
export async function updateTankaRecord(id: string, settings: TankaSettings): Promise<TankaRecord> {
  const db = await openDb();
  const existing = await getTankaRecord(id);
  const now = new Date().toISOString();
  const record: TankaRecord = {
    ...settings,
    id,
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
  return new Promise((resolve, reject) => {
    // 単一トランザクションで短歌とタグの更新を処理
    const tx = db.transaction([STORE_NAME, STORE_TAG_NAME], 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const tagStore = tx.objectStore(STORE_TAG_NAME);

    // 短歌の更新
    const putReq = store.put(record);
    putReq.onerror = () => reject(putReq.error);

    // 既存タグの取得
    const getTagRequest = tagStore.getAll();
    getTagRequest.onsuccess = () => {
      const tagRecords = getTagRequest.result as TankaTagRecord[];
      const existingTags = getTagsFromRecordId(id, tagRecords);
      const newTags = settings.tags ?? [];

      // 追加されたタグ
      newTags.forEach((tagName) => {
        if (typeof tagName !== 'string' || !tagName.trim()) return;
        const name = tagName.trim();
        const existingTag = tagRecords.find((t) => t.name === name);
        if (existingTag) {
          if (!existingTag.ids.includes(id)) {
            existingTag.ids.push(id);
            tagStore.put(existingTag);
          }
        } else {
          const newTag: TankaTagRecord = {
            id: generateId(),
            name,
            ids: [id],
            createdAt: now,
            updateAt: now,
          };
          tagStore.put(newTag);
        }
      });

      // 削除されたタグ
      existingTags.forEach((tagName) => {
        if (!newTags.includes(tagName)) {
          const existingTag = tagRecords.find((t) => t.name === tagName);
          if (existingTag) {
            existingTag.ids = existingTag.ids.filter((recordId) => recordId !== id);
            if (existingTag.ids.length > 0) {
              tagStore.put(existingTag);
            } else {
              tagStore.delete(existingTag.id);
            }
          }
        }
      });
    };
    getTagRequest.onerror = () => reject(getTagRequest.error);

    tx.oncomplete = () => resolve(record);
    tx.onerror = () => reject(tx.error);
  });
}

// レコードを削除
export async function deleteTankaRecord(id: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    // 短歌の削除
    const request = store.delete(id);
    request.onsuccess = () => {
      // タグの更新（関連するIDを削除、IDが空のタグは削除）
      const tagTx = db.transaction(STORE_TAG_NAME, 'readwrite');
      const tagStore = tagTx.objectStore(STORE_TAG_NAME);

      const getTagRequest = tagStore.getAll();
      getTagRequest.onsuccess = () => {
        const tagRecords = getTagRequest.result as TankaTagRecord[];
        const relatedTags = tagRecords.filter((tag) => tag.ids.includes(id));

        relatedTags.forEach((tag) => {
          tag.ids = tag.ids.filter((recordId) => recordId !== id);
          if (tag.ids.length > 0) {
            tagStore.put(tag);
          } else {
            tagStore.delete(tag.id);
          }
        });

        resolve();
      };
      getTagRequest.onerror = () => reject(getTagRequest.error);
    };
    request.onerror = () => reject(request.error);
  });
}
