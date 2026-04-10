# プロジェクト概要

このプロジェクトは、「TankaPic」という短歌の管理と短歌画像の生成を行うWebアプリケーションです。
ブラウザベースですが、ホームに追加することでスマートフォンのアプリのように利用できます。

# 技術スタック

- WEBフレームワーク：Next.js v16
- UIフレームワーク：Chakra UI
- コンポーネント管理：Storybook
- 型チェック：Zod
- 言語：TypeScript
- データベース：indexedDB
- 短歌画像：Canvas API
- E2Eテスト：Playwright
- ドキュメント整形：Prettier (保存時に整形する)
- コード品質：ESLint

# コーディング規約

- コメントは日本語で簡潔に記述
- 1ファイル200行を超えたら分割を検討
- アクセシビリティはWCAG 2.1 AAを目指す
- 可能な限り再利用可能なコンポーネントを作成
- 変数名や関数名は意味のある英語で命名
- HTMLはセマンティックなタグを使用し、ARIA属性も適切に使用する
- インデントは半角スペース2つ

# デザイン

以下のfigmaを利用します。
https://www.figma.com/design/E5EL7sYy7EgkHicdsN51Zo/TankaPic?t=ulfKGBJgzTYowhWJ-0