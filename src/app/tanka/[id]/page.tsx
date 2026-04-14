// 短歌画像出力画面
'use client';

import { useState, useCallback, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Flex, IconButton, VStack } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';
import { TankaPicture } from '@/components/TankaDetail/TankaPicture';
import { TankaSettingForm } from '@/components/TankaDetail/TankaSettingForm';
import { DeleteDialog } from '@/components/TankaDetail/DeleteDialog';
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // 既存レコード読み込み or 新規はグラデーション生成
  useEffect(() => {
    if (loading) return;
    if (record) {
      setSettings(record);
    } else {
      setSettings((prev) => ({ ...prev, meshGradient: generateMeshGradient() }));
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

  const handleBack = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleSave = useCallback(async () => {
    await save(settings);
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
      bg="#F5F5F1"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      pt="12px"
      pb="32px"
    >
      <VStack gap="4px" w="100%" minW="375px" alignItems="center">
        {/* ツールバー */}
        <Flex as="nav" w="100%" justify="flex-end" align="center" px="12px" aria-label="ツールバー">
          <IconButton
            aria-label="閉じる"
            variant="subtle"
            colorPalette="gray"
            size="md"
            onClick={handleBack}
          >
            <LuX />
          </IconButton>
        </Flex>

        <TankaPicture settings={settings} />
        <TankaSettingForm
          settings={settings}
          onUpdateSetting={updateSetting}
          onCreateGradient={handleCreateGradient}
          onDownload={handleDownload}
          onBack={handleBack}
          onSave={handleSave}
          onDelete={isNew ? undefined : () => setIsDeleteDialogOpen(true)}
        />
      </VStack>

      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
