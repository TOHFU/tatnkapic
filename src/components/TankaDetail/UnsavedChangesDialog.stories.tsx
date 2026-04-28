import type { Meta, StoryObj } from '@storybook/react';
import { UnsavedChangesDialog } from './UnsavedChangesDialog';

const meta = {
  component: UnsavedChangesDialog,
  title: 'TankaDetail/UnsavedChangesDialog',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    open: true,
    onClose: () => {},
    onDiscard: () => {},
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'ダイアログの表示状態',
    },
    onClose: {
      description: 'キャンセル・閉じるボタン押下時のコールバック',
    },
    onDiscard: {
      description: '破棄ボタン押下時のコールバック',
    },
  },
} satisfies Meta<typeof UnsavedChangesDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ダイアログ表示中
export const Open: Story = {
  name: '表示中',
  args: {
    open: true,
  },
};

// ダイアログ非表示
export const Closed: Story = {
  name: '非表示',
  args: {
    open: false,
  },
};
