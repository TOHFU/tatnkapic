# TankaPic API

短歌管理・短歌画像生成アプリケーションのAPI仕様書。

## 概要

TankaPicは主にindexedDBを使用したクライアント側の処理を中心としています。

## データ構造

### Tanka (短歌)

```typescript
interface Tanka {
  id: string;
  lines: [string, string, string, string, string]; // 5-7-5-7-7
  createdAt: Date;
  updatedAt: Date;
  metadata?: {
    theme?: string;
    season?: string;
    notes?: string;
  };
}
```

## indexedDB スキーマ

### Object Stores

- `tankas`: 短歌データの保存

## Canvas API

短歌画像生成時のCanvas操作:
- テキストレンダリング
- 背景パターン生成
- 画像エクスポート (PNG/JPEG)
