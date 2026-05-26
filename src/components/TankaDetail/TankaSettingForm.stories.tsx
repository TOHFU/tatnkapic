import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TankaSettingForm } from './TankaSettingForm';
import type { TankaMenu, TankaSettings } from '@/types/tanka';

// グラデーション背景のサンプル値
const sampleGradient = {
  backgroundColor: '#f3d1e8',
  backgroundImage: [
    'radial-gradient(at 20% 30%, hsla(290, 80%, 70%, 0.8) 0px, transparent 50%)',
    'radial-gradient(at 80% 10%, hsla(340, 90%, 75%, 0.8) 0px, transparent 45%)',
    'radial-gradient(at 50% 80%, hsla(200, 85%, 65%, 0.8) 0px, transparent 55%)',
  ].join(', '),
};

const defaultSettings: TankaSettings = {
  tanka: '春の野に\n霞たなびき\nうら悲し\nこの夕かげに\n鶯鳴くも',
  tankaAlignment: 'center',
  subtitle: '万葉集 巻十九',
  subtitleAlignment: 'right',
  fontFamily: 'serif',
  fontWeight: 400,
  fontColorType: 'monocrome',
  fontColor: '#333333',
  aspectRatio: '1:1',
  backgroundType: 'monocrome',
  monocromeColor: '#F5F5EE',
  meshGradient: sampleGradient,
};

const defaultMenu: TankaMenu = '';

const meta = {
  component: TankaSettingForm,
  title: 'TankaDetail/TankaSettingForm',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    settings: defaultSettings,
    menu: defaultMenu,
    onUpdateSetting: () => {},
    onCreateGradient: () => {},
    onDownload: () => {},
    onBack: () => {},
    onSave: () => {},
    onDelete: () => {},
  },
  argTypes: {
    settings: {
      control: 'object',
      description: '短歌の設定値',
    },
    onUpdateSetting: {
      description: '設定値変更コールバック',
    },
    onCreateGradient: {
      description: 'グラデーション再生成コールバック',
    },
    onDownload: {
      description: '画像ダウンロードコールバック',
    },
    onBack: {
      description: '戻るボタンコールバック',
    },
    onSave: {
      description: '保存ボタンコールバック',
    },
    onDelete: {
      description: '削除ボタンコールバック（undefinedで削除ボタン非表示）',
    },
  },
} satisfies Meta<typeof TankaSettingForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// 内部状態を持つラッパー（フォーム操作を実際に反映させる）
function StatefulForm(props: React.ComponentProps<typeof TankaSettingForm>) {
  const [settings, setSettings] = useState<TankaSettings>(props.settings);

  const handleUpdate = <K extends keyof TankaSettings>(key: K, value: TankaSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    props.onUpdateSetting(key, value);
  };

  return (
    <div style={{ width: 375 }}>
      <TankaSettingForm {...props} settings={settings} onUpdateSetting={handleUpdate} />
    </div>
  );
}

// 新規作成（削除ボタンなし）
export const NewTanka: Story = {
  name: '新規作成',
  args: {
    settings: defaultSettings,
    onDelete: undefined,
    menu: 'other',
  },
  render: (args) => <StatefulForm {...args} />,
};

// 既存短歌の編集（削除ボタンあり）
export const EditTanka: Story = {
  name: '既存短歌の編集',
  args: {
    settings: defaultSettings,
    menu: 'other',
  },
  render: (args) => <StatefulForm {...args} />,
};

export const TankaSetting: Story = {
  name: '短歌入力',
  args: {
    settings: defaultSettings,
    menu: 'tanka',
  },
  render: (args) => <StatefulForm {...args} />,
};

export const AspectSetting: Story = {
  name: 'アスペクト入力',
  args: {
    settings: defaultSettings,
    menu: 'aspect',
  },
  render: (args) => <StatefulForm {...args} />,
};

export const ColorSetting: Story = {
  name: '色入力',
  args: {
    settings: defaultSettings,
    menu: 'color',
  },
  render: (args) => <StatefulForm {...args} />,
};

export const FontSetting: Story = {
  name: 'フォント入力',
  args: {
    settings: defaultSettings,
    menu: 'font',
  },
  render: (args) => <StatefulForm {...args} />,
};

export const OtherSetting: Story = {
  name: 'その他メニュー入力',
  args: {
    settings: defaultSettings,
    menu: 'other',
  },
  render: (args) => <StatefulForm {...args} />,
};
