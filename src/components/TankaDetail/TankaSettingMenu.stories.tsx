import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TankaSettingMenu } from './TankaSettingMenu';
import type { TankaMenu } from '@/types/tanka';

const defaultMenu: TankaMenu = '';
const meta = {
  component: TankaSettingMenu,
  title: 'TankaDetail/TankaSettingMenu',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    menu: defaultMenu,
  },
  argTypes: {
    menu: {
      control: {
        type: 'select',
        options: ['', 'tanka', 'aspect', 'color', 'font', 'other'],
      },
      description: 'カレントメニュー',
    },
  },
} satisfies Meta<typeof TankaSettingMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// 内部状態を持つラッパー（フォーム操作を実際に反映させる）
function StatefulForm(props: React.ComponentProps<typeof TankaSettingMenu>) {
  const [menu, setMenu] = useState<TankaMenu>(props.menu);

  const handleUpdate = (value: TankaMenu) => {
    setMenu(value);
    props.onChangeMenu(value);
  };

  return (
    <div style={{ width: 375 }}>
      <TankaSettingMenu {...props} menu={menu} onChangeMenu={handleUpdate} />
    </div>
  );
}

// 未選択
export const MenuEmpty: Story = {
  name: '未選択',
  args: {
    onChangeMenu: () => {},
    menu: '',
  },
  render: (args) => <StatefulForm {...args} />,
};

// 短歌
export const MenuTanka: Story = {
  name: '短歌',
  args: {
    onChangeMenu: () => {},
    menu: 'tanka',
  },
  render: (args) => <StatefulForm {...args} />,
};

// アスペクト
export const MenuAspect: Story = {
  name: 'アスペクト',
  args: {
    onChangeMenu: () => {},
    menu: 'tanka',
  },
  render: (args) => <StatefulForm {...args} />,
};

// カラー
export const MenuColor: Story = {
  name: 'カラー',
  args: {
    onChangeMenu: () => {},
    menu: 'color',
  },
  render: (args) => <StatefulForm {...args} />,
};

// フォント
export const MenuFont: Story = {
  name: 'フォント',
  args: {
    onChangeMenu: () => {},
    menu: 'font',
  },
  render: (args) => <StatefulForm {...args} />,
};

// その他
export const MenuOther: Story = {
  name: 'その他',
  args: {
    onChangeMenu: () => {},
    menu: 'other',
  },
  render: (args) => <StatefulForm {...args} />,
};
