// 短歌設定フォームコンポーネント
'use client';

import {
  Button,
  ColorPicker,
  Field,
  Flex,
  HStack,
  Input,
  Portal,
  RadioGroup,
  SegmentGroup,
  Separator,
  Text,
  Textarea,
  VStack,
  parseColor,
} from '@chakra-ui/react';
import {
  LuAlignCenter,
  LuAlignLeft,
  LuAlignRight,
  LuCheck,
  LuDownload,
  LuPalette,
  LuPipette,
  LuSave,
  LuTrash2,
  LuUndo2,
} from 'react-icons/lu';
import type {
  BackgroundType,
  FontColorType,
  FontFamily,
  TankaSettings,
  TextAlignment,
} from '@/types/tanka';

interface TankaSettingFormProps {
  settings: TankaSettings;
  onUpdateSetting: <K extends keyof TankaSettings>(key: K, value: TankaSettings[K]) => void;
  onCreateGradient: () => void;
  onDownload: () => void;
  onBack: () => void;
  onSave: () => void;
  onDelete?: () => void;
}

// プリセットカラー
const swatches = ['#000000', '#FFFFFF', '#eb5e41'];

// カラーピッカーフィールド（defaultValueで初期化し、onValueChangeEndで同期）
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
    <ColorPicker.Root
      key={value}
      defaultValue={parseColor(value)}
      onValueChangeEnd={(details) => onChange(details.value.toString('hex'))}
      disabled={disabled}
      size="xs"
    >
      <ColorPicker.HiddenInput />
      {label && (
        <ColorPicker.Label fontSize="sm" fontWeight="medium">
          {label}
        </ColorPicker.Label>
      )}
      <ColorPicker.Control>
        <ColorPicker.Input />
        <ColorPicker.Trigger />
      </ColorPicker.Control>
      <Portal>
        <ColorPicker.Positioner>
          <ColorPicker.Content>
            <ColorPicker.Area>
              <ColorPicker.AreaBackground />
              <ColorPicker.AreaThumb />
            </ColorPicker.Area>
            <HStack>
              <ColorPicker.EyeDropperTrigger asChild>
                <Button size="xs" variant="outline">
                  <LuPipette />
                </Button>
              </ColorPicker.EyeDropperTrigger>
              <ColorPicker.ChannelSlider channel="hue">
                <ColorPicker.ChannelSliderTrack />
                <ColorPicker.ChannelSliderThumb />
              </ColorPicker.ChannelSlider>
            </HStack>
            <ColorPicker.SwatchGroup>
              {swatches.map((swatch) => (
                <ColorPicker.SwatchTrigger key={swatch} value={swatch}>
                  <ColorPicker.Swatch value={swatch}>
                    <ColorPicker.SwatchIndicator>
                      <LuCheck />
                    </ColorPicker.SwatchIndicator>
                  </ColorPicker.Swatch>
                </ColorPicker.SwatchTrigger>
              ))}
            </ColorPicker.SwatchGroup>
          </ColorPicker.Content>
        </ColorPicker.Positioner>
      </Portal>
    </ColorPicker.Root>
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
    <VStack gap="4" p="8" w="100%" alignItems="stretch">
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
          borderColor="yellow.200"
          autoresize
        />
      </Field.Root>

      {/* サブタイトル入力 + 配置切り替え */}
      <VStack gap="4" alignItems="stretch">
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
            borderColor="yellow.200"
          />
        </Field.Root>
        <SegmentGroup.Root
          value={settings.subtitleAlignment}
          onValueChange={(d) => onUpdateSetting('subtitleAlignment', d.value as TextAlignment)}
          size="xs"
          w="fit-content"
          bg="yellow.200"
          borderColor="yellow.200"
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
      <VStack gap="1.5" alignItems="flex-start">
        <Text fontSize="sm" fontWeight="medium" color="gray.800">
          書体
        </Text>
        <SegmentGroup.Root
          value={settings.fontFamily}
          onValueChange={(d) => onUpdateSetting('fontFamily', d.value as FontFamily)}
          size="xs"
          bg="yellow.200"
          borderColor="yellow.200"
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
      <VStack gap="4" alignItems="flex-start">
        <Text fontSize="sm" fontWeight="medium" color="gray.800">
          文字色
        </Text>
        <RadioGroup.Root
          value={settings.fontColorType}
          onValueChange={(d) => onUpdateSetting('fontColorType', d.value as FontColorType)}
          size="xs"
        >
          <VStack gap="4" alignItems="stretch">
            <RadioGroup.Item value="monocrome">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText fontSize="xs" fontWeight="medium">
                単色
              </RadioGroup.ItemText>
            </RadioGroup.Item>

            <ColorPickerField
              value={settings.fontColor}
              onChange={(v) => onUpdateSetting('fontColor', v)}
              disabled={settings.fontColorType !== 'monocrome'}
            />

            <RadioGroup.Item value="invert">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText fontSize="xs" fontWeight="medium">
                反転色
              </RadioGroup.ItemText>
            </RadioGroup.Item>
          </VStack>
        </RadioGroup.Root>
      </VStack>

      {/* 背景設定 */}
      <VStack gap="4" alignItems="flex-start">
        <Text fontSize="sm" fontWeight="medium" color="gray.800">
          背景
        </Text>

        <RadioGroup.Root
          value={settings.backgroundType}
          onValueChange={(d) => onUpdateSetting('backgroundType', d.value as BackgroundType)}
          size="xs"
        >
          <VStack gap="4" alignItems="stretch">
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
      </VStack>

      <Separator borderColor="yellow.200" />

      {/* 削除・戻る・保存ボタン */}
      <Flex justify="space-between" align="center">
        {onDelete && (
          <Button
            size="sm"
            variant="outline"
            color="pink.700"
            borderColor="pink.200"
            onClick={onDelete}
          >
            <LuTrash2 />
            削除
          </Button>
        )}
        <Flex gap="4" ml="auto">
          <Button
            size="sm"
            variant="outline"
            bg="yellow.100"
            color="yellow.800"
            borderColor="yellow.200"
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
