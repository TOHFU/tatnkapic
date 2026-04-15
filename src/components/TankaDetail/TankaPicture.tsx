// 短歌画像プレビューコンポーネント
'use client';

import { Box, Text } from '@chakra-ui/react';
import type { TankaSettings } from '@/types/tanka';

interface TankaPictureProps {
  settings: TankaSettings;
}

const FONT_MAP = {
  serif: '"Noto Serif JP", serif',
  sans: '"Noto Sans JP", sans-serif',
} as const;

export function TankaPicture({ settings }: TankaPictureProps) {
  const {
    tanka,
    subtitle,
    subtitleAlignment,
    fontFamily,
    fontColor,
    backgroundType,
    monocromeColor,
    meshGradient,
  } = settings;

  const backgroundStyle =
    backgroundType === 'monocrome'
      ? { backgroundColor: monocromeColor }
      : {
          backgroundColor: meshGradient.backgroundColor,
          backgroundImage: meshGradient.backgroundImage,
        };

  return (
    <Box
      id="tanka-picture"
      w="311px"
      boxShadow="0px 24px 40px 0px rgba(24, 24, 27, 0.16), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)"
      borderRadius="4px"
      overflow="hidden"
      style={backgroundStyle}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="18px"
      pt="32px"
      pb="14px"
      px="14px"
    >
      {/* 短歌テキスト（縦書き） */}
      <Box
        css={{ writingMode: 'vertical-rl' }}
        fontFamily={FONT_MAP[fontFamily]}
        fontSize="14px"
        lineHeight="2.2"
        letterSpacing="0.05em"
        color={fontColor}
        minH="180px"
        whiteSpace="pre-line"
      >
        {tanka}
      </Box>

      {/* サブタイトル（横書き） */}
      <Text
        fontFamily={FONT_MAP[fontFamily]}
        fontSize="10px"
        lineHeight="1.47"
        color={fontColor}
        textAlign={subtitleAlignment}
        w="100%"
      >
        {subtitle}
      </Text>
    </Box>
  );
}
