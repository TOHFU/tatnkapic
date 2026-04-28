// 短歌画像出力画面
'use client';

import { useState, useCallback, useEffect, ViewTransition } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Flex, IconButton, VStack } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';
import { TankaPicture } from '@/components/TankaDetail/TankaPicture';
import { TankaSettingForm } from '@/components/TankaDetail/TankaSettingForm';
import { DeleteDialog } from '@/components/TankaDetail/DeleteDialog';
import { UnsavedChangesDialog } from '@/components/TankaDetail/UnsavedChangesDialog';
import { generateMeshGradient } from '@/lib/meshGradient';
import { useTankaRecord } from '@/hooks/useTankaDb';
import { downloadTankaImage } from '@/lib/downloadImage';
import type { TankaSettings } from '@/types/tanka';

const INITIAL_GRADIENT = {
  backgroundColor: '#D9D9D9',
  backgroundImage: '',
};

const DEFAULT_SETTINGS: TankaSettings = {
  tanka: '',
  subtitle: '',
  subtitleAlignment: 'center',
  fontFamily: 'serif',
  fontColorType: 'monocrome',
  fontColor: '#000000',
  backgroundType: 'gradient',
  monocromeColor: '#D9D9D9',
  meshGradient: INITIAL_GRADIENT,
};

export default function TankaDetailPage() {
  const params = useParams();
  const router = useRouter();
  const rawId = params.id as string;
  const isNew = rawId === 'new';
  const recordId = isNew ? null : rawId;

  const { record, loading, save, remove } = useTankaRecord(recordId);
  const [settings, setSettings] = useState<TankaSettings>(DEFAULT_SETTINGS);
  // 保存済みの設定（変更検知の基準）
  const [savedSettings, setSavedSettings] = useState<TankaSettings>(DEFAULT_SETTINGS);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUnsavedDialogOpen, setIsUnsavedDialogOpen] = useState(false);

  // 既存レコード読み込み or 新規はグラデーション生成
  useEffect(() => {
    if (loading) return;
    if (record) {
      // 既存レコードにfontColorTypeがない場合はフォールバック
      const loaded = { ...record, fontColorType: record.fontColorType ?? 'monocrome' };
      setSettings(loaded);
      setSavedSettings(loaded);
    } else {
      const initial = { ...DEFAULT_SETTINGS, meshGradient: generateMeshGradient() };
      setSettings(initial);
      setSavedSettings(initial);
    }
  }, [loading, record]);

  const updateSetting = useCallback(
    <K extends keyof TankaSettings>(key: K, value: TankaSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleCreateGradient = useCallback(() => {
    updateSetting('meshGradient', generateMeshGradient());
  }, [updateSetting]);

  // 設定が変更されているか判定
  const isDirty = JSON.stringify(settings) !== JSON.stringify(savedSettings);

  // 戻る前に未保存チェックを挟む
  const handleBackWithCheck = useCallback(() => {
    if (isDirty) {
      setIsUnsavedDialogOpen(true);
    } else {
      router.push('/');
    }
  }, [isDirty, router]);

  const handleDiscard = useCallback(() => {
    setIsUnsavedDialogOpen(false);
    router.push('/');
  }, [router]);

  const handleSave = useCallback(async () => {
    await save(settings);
    setSavedSettings(settings);
    router.push('/');
  }, [save, settings, router]);

  const handleDownload = useCallback(async () => {
    await downloadTankaImage();
  }, []);

  const handleDelete = useCallback(async () => {
    await remove();
    router.push('/');
  }, [remove, router]);

  return (
    <Box
      bg="bg"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt="3"
      pb="8"
    >
        <VStack gap="1" w="100%" minW="375px" alignItems="center">
        {/* ツールバー */}
        <Flex
          as="nav"
          w="100%"
          justify="flex-end"
          align="center"
          px="3"
          aria-label="ツールバー"
        >
          <IconButton
            aria-label="閉じる"
            variant="subtle"
            colorPalette="gray"
            size="md"
            onClick={handleBackWithCheck}
          >
            <LuX />
          </IconButton>
        </Flex>

        {isNew ? (
          <TankaPicture settings={settings} />
        ) : (
          <ViewTransition name={`tanka-${rawId}`}>
            <TankaPicture settings={settings} />
          </ViewTransition>
        )}
        <Box className="fade-in-content" w="100%">
          <TankaSettingForm
            settings={settings}
            onUpdateSetting={updateSetting}
            onCreateGradient={handleCreateGradient}
            onDownload={handleDownload}
            onBack={handleBackWithCheck}
            onSave={handleSave}
            onDelete={isNew ? undefined : () => setIsDeleteDialogOpen(true)}
          />
        </Box>
      </VStack>

      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />

      <UnsavedChangesDialog
        open={isUnsavedDialogOpen}
        onClose={() => setIsUnsavedDialogOpen(false)}
        onDiscard={handleDiscard}
      />
    </Box>
  );
}
