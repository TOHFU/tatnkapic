import type { Meta, StoryObj } from '@storybook/react';
import { ToolBar } from './ToolBar';

const meta = {
  component: ToolBar,
  title: 'Components/ToolBar',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToolBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'デフォルト',
};
