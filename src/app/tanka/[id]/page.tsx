// 短歌画像出力画面
'use client';

import { useState, useCallback, useEffect } from 'react';
import { Box, Flex, IconButton, VStack } from '@chakra-ui/react';
import { LuX } from 'react-icons/lu';
import { TankaPicture } from '@/components/TankaDetail/TankaPicture';
import { TankaSettingForm } from '@/components/TankaDetail/TankaSettingForm';
import { generateMeshGradient } from '@/lib/meshGradient';
import type { TankaSettings } from '@/types/tanka';

const INITIAL_GRADIENT = {
  backgroundColor: '#D9D9D9',
  backgroundImage: '',
};

const DEFAULT_SETTINGS: TankaSettings = {
  tanka: '好きなパン　好きな廃墟を教えるね\nこれで私が全部わかるね',
  subtitle: '岡乃あや',
  subtitleAlignment: 'center',
  fontFamily: 'serif',
  fontColor: '#000000',
  backgroundType: 'gradient',
  monocromeColor: '#D9D9D9',
  meshGradient: INITIAL_GRADIENT,
};

export default function TankaDetailPage() {
  const [settings, setSettings] = useState<TankaSettings>(DEFAULT_SETTINGS);

  // クライアント側でのみランダムなグラデーションを生成
  useEffect(() => {
    setSettings((prev) => ({ ...prev, meshGradient: generateMeshGradient() }));
  }, []);

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
    window.history.back();
  }, []);

  const handleSave = useCallback(() => {
    // TODO: indexedDBに保存
  }, []);

  const handleDownload = useCallback(() => {
    // TODO: Canvas APIで画像ダウンロード
  }, []);

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
        />
      </VStack>
    </Box>
  );
}
