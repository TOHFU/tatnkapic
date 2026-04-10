# TankaPic - 短歌管理・短歌画像生成WebアプリケーションTankaPicは、短歌の管理と短歌画像の生成を行うブラウザベースのWebアプリケーションです。ホーム画面への追加によりPWA（Progressive Web App）として利用できます。

## 🛠️ 技術スタック

- **フレームワーク**: Next.js v16
- **UI フレームワーク**: Chakra UI
- **コンポーネント管理**: Storybook v10 (@storybook/nextjs-vite)
- **型チェック**: Zod
- **言語**: TypeScript
- **データベース**: indexedDB
- **画像生成**: Canvas API
- **E2E テスト**: Playwright
- **フォーマッタ**: Prettier
- **リンター**: ESLint
- **ランタイム**: Node.js 18.17 以上（LTS推奨）

## 📁 プロジェクト構成

```
tankapic/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React コンポーネント
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # ユーティリティ関数
│   ├── styles/           # グローバルスタイル
│   └── types/            # TypeScript 型定義
├── .storybook/           # Storybook 設定
│   ├── main.ts           # Storybookメイン設定
│   ├── preview.ts        # グローバル設定
│   └── vitest.setup.ts   # Vitest設定
├── tests/
│   └── e2e/              # Playwright E2E テスト
├── public/               # 静的アセット
└── docs/                 # プロジェクトドキュメント
```

## 📦 インストール

```bash
# Node.js LTS をインストール（.nvmrc で指定）
nvm install
nvm use

# 依存パッケージをインストール
npm install
```

## 🚀 開発

```bash
# 開発サーバー起動
npm run dev

# Storybook 起動（コンポーネント管理）
npm run storybook

# コード品質チェック
npm run lint           # ESLint 実行
npm run lint:fix       # ESLint 自動修正
npm run format         # Prettier で整形
npm run format:check   # Prettier 検証
npm run type-check     # TypeScript 型チェック

# E2E テスト実行
npm run test:e2e
npm run test:e2e:ui   # UI モード
```

## 🔨 ビルド

```bash
# 本番用ビルド
npm run build

# 本番サーバー起動
npm start

# Storybook ビルド
npm run storybook:build
```

## 📋 コーディング規約

- **言語**: コメントは日本語で簡潔に記述
- **ファイルサイズ**: 1 ファイル 200 行超過時は分割を検討
- **アクセシビリティ**: WCAG 2.1 AA レベルを目指す
- **コンポーネント**: 再利用可能なコンポーネント設計を意識
- **命名規則**: 変数名・関数名は意味のある英語で命名
- **HTML**: セマンティックタグを使用し、ARIA 属性も適切に利用
- **インデント**: 半角スペース 2 つ

## 🎨 Storybook コンポーネント開発

Storybook を使用してコンポーネントを単体で開発・テストできます。

```typescript
// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  component: Button,
  title: 'Components/Button',
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};
```

## 🎨 デザイン

プロジェクトの UI デザインは以下の Figma で管理:
https://www.figma.com/design/E5EL7sYy7EgkHicdsN51Zo/TankaPic

## 📚 参考リソース

- [Next.js ドキュメント](https://nextjs.org)
- [Chakra UI ドキュメント](https://chakra-ui.com)
- [Storybook ドキュメント](https://storybook.js.org)
- [Storybook + Next.js v16 + Vite セットアップガイド](https://developer.mamezou-tech.com/blogs/2026/02/18/next_storybook_1/)

