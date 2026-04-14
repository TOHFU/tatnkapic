// IndexedDB操作用カスタムフック
'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  getAllTankaRecords,
  getTankaRecord,
  createTankaRecord,
  updateTankaRecord,
  deleteTankaRecord,
} from '@/lib/tankaDb';
import type { TankaRecord, TankaSettings } from '@/types/tanka';

// ページ間でデータを即座に共有するためのメモリキャッシュ
// View Transitionsのスナップショット撮影時にDOMが揃っている必要がある
let cachedRecords: TankaRecord[] | null = null;

// 全レコード取得フック
export function useTankaList() {
  // SSRと一致させるため初期値は常に空配列・loading=true
  const [records, setRecords] = useState<TankaRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllTankaRecords();
      cachedRecords = data;
      setRecords(data);
    } finally {
      setLoading(false);
    }
  }, []);

  // キャッシュがあれば即座に反映、なければIndexedDBから読み込み
  useEffect(() => {
    if (cachedRecords !== null) {
      setRecords(cachedRecords);
      setLoading(false);
    }
    reload();
  }, [reload]);

  return { records, loading, reload };
}

// 単一レコード取得フック
export function useTankaRecord(id: string | null) {
  // SSRと一致させるため初期値は常にnull・loading=true
  const [record, setRecord] = useState<TankaRecord | null>(null);
  const [loading, setLoading] = useState(id !== null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    // キャッシュがあれば即座に反映
    const cached = cachedRecords?.find((r) => r.id === id) ?? null;
    if (cached) {
      setRecord(cached);
      setLoading(false);
    }
    // IndexedDBからも読み込み（最新データ取得）
    let cancelled = false;
    (async () => {
      if (!cached) setLoading(true);
      try {
        const data = await getTankaRecord(id);
        if (!cancelled) setRecord(data ?? null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // 保存（新規作成 or 更新）
  const save = useCallback(
    async (settings: TankaSettings): Promise<TankaRecord> => {
      if (id) {
        const updated = await updateTankaRecord(id, settings);
        setRecord(updated);
        return updated;
      }
      const created = await createTankaRecord(settings);
      setRecord(created);
      return created;
    },
    [id]
  );

  // 削除
  const remove = useCallback(async () => {
    if (!id) return;
    await deleteTankaRecord(id);
    setRecord(null);
  }, [id]);

  return { record, loading, save, remove };
}
