import type { Meta, StoryObj } from '@storybook/react';
import { EmptyState } from './EmptyState';

const meta = {
  component: EmptyState,
  title: 'Components/EmptyState',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '短歌なし',
};
