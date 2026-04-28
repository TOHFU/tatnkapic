import type { Meta, StoryObj } from '@storybook/react';
import { DeleteDialog } from './DeleteDialog';

const meta = {
  component: DeleteDialog,
  title: 'TankaDetail/DeleteDialog',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    open: true,
    onClose: () => {},
    onConfirm: () => {},
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'ダイアログの表示状態',
    },
    onClose: {
      description: 'キャンセル・閉じるボタン押下時のコールバック',
    },
    onConfirm: {
      description: '削除ボタン押下時のコールバック',
    },
  },
} satisfies Meta<typeof DeleteDialog>;

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
