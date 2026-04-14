// 短歌設定フォームコンポーネント
'use client';

import {
  Box,
  Button,
  Field,
  Flex,
  HStack,
  Input,
  RadioGroup,
  SegmentGroup,
  Separator,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import {
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash2,
  LuUndo2,
} from 'react-icons/lu';
import type { BackgroundType, FontFamily, TankaSettings, TextAlignment } from '@/types/tanka';

interface TankaSettingFormProps {
  settings: TankaSettings;
  onUpdateSetting: <K extends keyof TankaSettings>(key: K, value: TankaSettings[K]) => void;
  onCreateGradient: () => void;
  onDownload: () => void;
  onBack: () => void;
  onSave: () => void;
  onDelete?: () => void;
}

// カラーピッカーフィールド
function ColorPickerField({
  label,
  value,
  onChange,
  disabled,
}: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <Field.Root disabled={disabled}>
      {label && (
        <Field.Label fontSize="sm" fontWeight="medium">
          {label}
        </Field.Label>
      )}
      <HStack gap="8px">
        <Input
          variant="outline"
          size="2xs"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          flex="1"
          opacity={disabled ? 0.5 : 1}
        />
        <Box position="relative" w="28px" h="28px" flexShrink={0} opacity={disabled ? 0.5 : 1}>
          <Box
            w="100%"
            h="100%"
            borderRadius="4px"
            border="1px solid"
            borderColor="#CFCCB9"
            bg={value}
            boxShadow="inset 0px 0px 0px 1px rgba(0, 0, 0, 0.05)"
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            aria-label={label ?? 'カラーピッカー'}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0,
              width: '100%',
              height: '100%',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          />
        </Box>
      </HStack>
    </Field.Root>
  );
}

export function TankaSettingForm({
  settings,
  onUpdateSetting,
  onCreateGradient,
  onDownload,
  onBack,
  onSave,
  onDelete,
}: TankaSettingFormProps) {
  return (
    <VStack gap="16px" p="32px" w="100%" alignItems="stretch">
      {/* ダウンロードボタン */}
      <Flex justify="flex-end">
        <Button size="2xs" colorPalette="pink" onClick={onDownload}>
          <LuDownload />
          画像を保存
        </Button>
      </Flex>

      {/* 短歌入力 */}
      <Field.Root>
        <Field.Label fontSize="sm" fontWeight="medium">
          短歌
        </Field.Label>
        <Textarea
          variant="flushed"
          placeholder={'短歌を入力してください。'}
          value={settings.tanka}
          onChange={(e) => onUpdateSetting('tanka', e.target.value)}
          rows={2}
          borderColor="#CFCCB9"
        />
      </Field.Root>

      {/* サブタイトル入力 + 配置切り替え */}
      <VStack gap="16px" alignItems="stretch">
        <Field.Root>
          <Field.Label fontSize="sm" fontWeight="medium">
            サブタイトル
          </Field.Label>
          <Input
            variant="flushed"
            size="2xs"
            placeholder="著名・サブタイトルを入力してください。"
            value={settings.subtitle}
            onChange={(e) => onUpdateSetting('subtitle', e.target.value)}
            borderColor="#CFCCB9"
          />
        </Field.Root>
        <SegmentGroup.Root
          value={settings.subtitleAlignment}
          onValueChange={(d) => onUpdateSetting('subtitleAlignment', d.value as TextAlignment)}
          size="xs"
          w="fit-content"
          bg="#CFCCB9"
          borderColor="#CFCCB9"
          css={{
            '--segment-indicator-bg': '#F5F5F1',
            '--segment-indicator-shadow':
              '0px 2px 4px 0px rgba(24, 24, 27, 0.1), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)',
          }}
        >
          <SegmentGroup.Indicator />
          {[
            { value: 'left', icon: <LuAlignLeft /> },
            { value: 'center', icon: <LuAlignCenter /> },
            { value: 'right', icon: <LuAlignRight /> },
          ].map((item) => (
            <SegmentGroup.Item key={item.value} value={item.value}>
              {item.icon}
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
          ))}
        </SegmentGroup.Root>
      </VStack>

      {/* フォント切り替え */}
      <VStack gap="6px" alignItems="flex-start">
        <Text fontSize="sm" fontWeight="medium" color="#27272A">
          書体
        </Text>
        <SegmentGroup.Root
          value={settings.fontFamily}
          onValueChange={(d) => onUpdateSetting('fontFamily', d.value as FontFamily)}
          size="xs"
          bg="#CFCCB9"
          borderColor="#CFCCB9"
          css={{
            '--segment-indicator-bg': '#F5F5F1',
            '--segment-indicator-shadow':
              '0px 2px 4px 0px rgba(24, 24, 27, 0.1), 0px 0px 1px 0px rgba(24, 24, 27, 0.3)',
          }}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Item value="serif">
            <SegmentGroup.ItemText>明朝</SegmentGroup.ItemText>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
          <SegmentGroup.Item value="sans">
            <SegmentGroup.ItemText>ゴシック</SegmentGroup.ItemText>
            <SegmentGroup.ItemHiddenInput />
          </SegmentGroup.Item>
        </SegmentGroup.Root>
      </VStack>

      {/* フォントカラー */}
      <ColorPickerField
        label="文字色"
        value={settings.fontColor}
        onChange={(v) => onUpdateSetting('fontColor', v)}
      />

      {/* 背景設定 */}
      <Text fontSize="sm" fontWeight="medium" color="#27272A">
        背景
      </Text>

      <RadioGroup.Root
        value={settings.backgroundType}
        onValueChange={(d) => onUpdateSetting('backgroundType', d.value as BackgroundType)}
        size="xs"
      >
        <VStack gap="16px" alignItems="stretch">
          <RadioGroup.Item value="monocrome">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText fontSize="xs" fontWeight="medium">
              単色
            </RadioGroup.ItemText>
          </RadioGroup.Item>

          <ColorPickerField
            value={settings.monocromeColor}
            onChange={(v) => onUpdateSetting('monocromeColor', v)}
            disabled={settings.backgroundType !== 'monocrome'}
          />

          <RadioGroup.Item value="gradient">
            <RadioGroup.ItemHiddenInput />
            <RadioGroup.ItemIndicator />
            <RadioGroup.ItemText fontSize="xs" fontWeight="medium">
              グラデーション
            </RadioGroup.ItemText>
          </RadioGroup.Item>

          <Button
            size="2xs"
            colorPalette="pink"
            w="fit-content"
            onClick={onCreateGradient}
            disabled={settings.backgroundType !== 'gradient'}
          >
            <LuPalette />
            グラデーションを生成
          </Button>
        </VStack>
      </RadioGroup.Root>

      <Separator borderColor="#CFCCB9" />

      {/* 削除・戻る・保存ボタン */}
      <Flex justify="space-between" align="center">
        {onDelete && (
          <Button
            size="sm"
            variant="outline"
            color="#9C3C1F"
            borderColor="#F6DCD4"
            onClick={onDelete}
          >
            <LuTrash2 />
            削除
          </Button>
        )}
        <Flex gap="16px" ml="auto">
          <Button
            size="sm"
            variant="outline"
            bg="#E6E5DB"
            color="#4E4A35"
            borderColor="#CFCCB9"
            onClick={onBack}
          >
            <LuUndo2 />
            もどる
          </Button>
          <Button size="sm" colorPalette="pink" onClick={onSave}>
            <LuSave />
            保存
          </Button>
        </Flex>
      </Flex>
    </VStack>
  );
}
