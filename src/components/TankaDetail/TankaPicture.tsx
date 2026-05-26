// 短歌画像プレビューコンポーネント
'use client';

import { Box, Text } from '@chakra-ui/react';
import type { TankaSettings } from '@/types/tanka';

interface TankaPictureProps {
  settings: TankaSettings;
  /** 押下中はelevationを0にする */
  isPressed?: boolean;
}

const FONT_MAP = {
  serif: '"Noto Serif JP", serif',
  sans: '"Noto Sans JP", sans-serif',
} as const;

export function TankaPicture({ settings, isPressed = false }: TankaPictureProps) {
  const {
    tanka,
    tankaAlignment,
    subtitle,
    subtitleAlignment,
    fontFamily,
    fontWeight,
    fontColorType,
    fontColor,
    aspectRatio,
    backgroundType,
    monocromeColor,
    meshGradient,
  } = settings;

  // 反転色のときはmix-blend-mode: overlayで背景色に応じた色になる
  const fontStyle =
    fontColorType === 'invert'
      ? { color: '#000' as const, mixBlendMode: 'overlay' as const }
      : { color: fontColor };

  const backgroundStyle =
    backgroundType === 'monocrome'
      ? { backgroundColor: monocromeColor }
      : {
          backgroundColor: meshGradient.backgroundColor,
          backgroundImage: meshGradient.backgroundImage,
        };

  let aspectRatioHeight;
  switch (aspectRatio) {
    case '1_1':
      aspectRatioHeight = '320px';
      break;
    case '4_3':
      aspectRatioHeight = '240px';
      break;
    case '3_4':
      aspectRatioHeight = '425px';
      break;
    case '16_9':
      aspectRatioHeight = '180px';
      break;
    case '9_16':
      aspectRatioHeight = '570px';
      break;
    default:
      aspectRatioHeight = 'auto';
  }

  let tankaAlignItems;
  switch (tankaAlignment) {
    case 'left':
      tankaAlignItems = 'flex-start';
      break;
    case 'right':
      tankaAlignItems = 'flex-end';
      break;
    default:
      tankaAlignItems = 'center';
  }

  return (
    <Box
      id="tanka-picture"
      w="320px"
      h={aspectRatioHeight}
      boxShadow={isPressed ? 'none' : '2xl'}
      transition="box-shadow 0.15s ease-out"
      borderRadius="sm"
      overflow="hidden"
      style={backgroundStyle}
      display="flex"
      flexDirection="column"
      alignItems={tankaAlignItems}
      justifyContent="space-between"
      gap="4.5"
      pt="8"
      pb="3.5"
      px="3.5"
    >
      {/* 短歌テキスト（縦書き） */}
      <Box
        css={{ writingMode: 'vertical-rl' }}
        fontFamily={FONT_MAP[fontFamily]}
        fontSize="14px"
        fontWeight={fontWeight}
        lineHeight="2.2"
        letterSpacing="0.05em"
        style={fontStyle}
        minH={
          aspectRatio === null || aspectRatio === '' || aspectRatio === 'auto' ? '180px' : 'none'
        }
        whiteSpace="pre-line"
      >
        {tanka}
      </Box>

      {/* サブタイトル（横書き） */}
      <Text
        fontFamily={FONT_MAP[fontFamily]}
        fontSize="10px"
        fontWeight={fontWeight}
        lineHeight="1.47"
        style={fontStyle}
        textAlign={subtitleAlignment}
        w="100%"
      >
        {subtitle}
      </Text>
    </Box>
  );
}
