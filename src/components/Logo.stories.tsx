import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta = {
  component: Logo,
  title: 'Components/Logo',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'number',
      description: 'SVGの幅（px）',
    },
    height: {
      control: 'number',
      description: 'SVGの高さ（px）',
    },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトサイズ
export const Default: Story = {
  name: 'デフォルト',
};

// 拡大表示
export const Large: Story = {
  name: '拡大',
  args: {
    width: 144,
    height: 22,
  },
};

// ダーク背景上での表示確認用
export const OnDark: Story = {
  name: 'ダーク背景',
  decorators: [
    (Story) => (
      <div style={{ background: '#18181B', padding: '24px', borderRadius: '8px' }}>
        <Story />
      </div>
    ),
  ],
};
