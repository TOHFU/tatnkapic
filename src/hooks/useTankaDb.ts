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

// 全レコード取得フック
export function useTankaList() {
  const [records, setRecords] = useState<TankaRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllTankaRecords();
      setRecords(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { records, loading, reload };
}

// 単一レコード取得フック
export function useTankaRecord(id: string | null) {
  const [record, setRecord] = useState<TankaRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
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
