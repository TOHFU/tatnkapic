import type { Meta, StoryObj } from '@storybook/react';
import { TankaPicture } from './TankaPicture';
import type { TankaSettings } from '@/types/tanka';

// グラデーション背景のサンプル値
const sampleGradient = {
  backgroundColor: '#f3d1e8',
  backgroundImage: [
    'radial-gradient(at 20% 30%, hsla(290, 80%, 70%, 0.8) 0px, transparent 50%)',
    'radial-gradient(at 80% 10%, hsla(340, 90%, 75%, 0.8) 0px, transparent 45%)',
    'radial-gradient(at 50% 80%, hsla(200, 85%, 65%, 0.8) 0px, transparent 55%)',
  ].join(', '),
};

// デフォルト設定値
const defaultSettings: TankaSettings = {
  tanka: '春の野に\n霞たなびき\nうら悲し\nこの夕かげに\n鶯鳴くも',
  subtitle: '万葉集 巻十九',
  subtitleAlignment: 'right',
  fontFamily: 'serif',
  fontColorType: 'monocrome',
  fontColor: '#333333',
  backgroundType: 'monocrome',
  monocromeColor: '#F5F5EE',
  meshGradient: sampleGradient,
};

const meta = {
  component: TankaPicture,
  title: 'TankaDetail/TankaPicture',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    settings: defaultSettings,
    isPressed: false,
  },
  argTypes: {
    isPressed: {
      control: 'boolean',
      description: '押下中（trueのときelevationが消える）',
    },
    // settingsはargs.settingsでオブジェクトごと上書きして動作を確認する
    settings: {
      control: 'object',
      description: '短歌設定オブジェクト',
    },
  },
} satisfies Meta<typeof TankaPicture>;

export default meta;
type Story = StoryObj<typeof meta>;

// モノクロ背景・明朝体
export const Default: Story = {
  name: 'モノクロ背景',
};

// グラデーション背景
export const Gradient: Story = {
  name: 'グラデーション背景',
  args: {
    settings: {
      ...defaultSettings,
      backgroundType: 'gradient',
      meshGradient: sampleGradient,
    },
  },
};

// ゴシック体
export const SansSerif: Story = {
  name: 'ゴシック体',
  args: {
    settings: {
      ...defaultSettings,
      fontFamily: 'sans',
    },
  },
};

// 反転色（mix-blend-mode: overlay）
export const InvertColor: Story = {
  name: '反転文字色',
  args: {
    settings: {
      ...defaultSettings,
      backgroundType: 'gradient',
      meshGradient: sampleGradient,
      fontColorType: 'invert',
    },
  },
};

// 押下中（elevation = 0）
export const Pressed: Story = {
  name: '押下中',
  args: {
    isPressed: true,
  },
};

// サブタイトル左揃え
export const SubtitleLeft: Story = {
  name: 'サブタイトル左揃え',
  args: {
    settings: {
      ...defaultSettings,
      subtitleAlignment: 'left',
    },
  },
};
