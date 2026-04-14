// IndexedDB操作モジュール
import type { TankaRecord, TankaSettings } from '@/types/tanka';

const DB_NAME = 'tankapic';
const DB_VERSION = 1;
const STORE_NAME = 'tankaRecords';

// DB接続を取得
function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// UUIDv4を生成
function generateId(): string {
  return crypto.randomUUID();
}

// 全レコードを取得（更新日時の降順）
export async function getAllTankaRecords(): Promise<TankaRecord[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => {
      const records = request.result as TankaRecord[];
      records.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      resolve(records);
    };
    request.onerror = () => reject(request.error);
  });
}

// IDでレコードを取得
export async function getTankaRecord(id: string): Promise<TankaRecord | undefined> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);
    request.onsuccess = () => resolve(request.result as TankaRecord | undefined);
    request.onerror = () => reject(request.error);
  });
}

// 新規レコードを作成
export async function createTankaRecord(settings: TankaSettings): Promise<TankaRecord> {
  const now = new Date().toISOString();
  const record: TankaRecord = {
    ...settings,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.add(record);
    request.onsuccess = () => resolve(record);
    request.onerror = () => reject(request.error);
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
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(record);
    request.onsuccess = () => resolve(record);
    request.onerror = () => reject(request.error);
  });
}

// レコードを削除
export async function deleteTankaRecord(id: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}
