// 短歌設定の型定義

export type TextAlignment = 'left' | 'center' | 'right';
export type FontFamily = 'serif' | 'sans';
export type BackgroundType = 'monocrome' | 'gradient';
export type FontColorType = 'monocrome' | 'invert';
export type TankaMenu = '' | 'tanka' | 'aspect' | 'font' | 'color' | 'tag' | 'other';

export interface MeshGradientStyle {
  backgroundColor: string;
  backgroundImage: string;
}

export interface TankaSettings {
  tanka: string;
  tankaAlignment: TextAlignment;
  subtitle: string;
  subtitleAlignment: TextAlignment;
  fontFamily: FontFamily;
  fontWeight: number;
  fontColorType: FontColorType;
  fontColor: string;
  aspectRatio: string;
  backgroundType: BackgroundType;
  monocromeColor: string;
  meshGradient: MeshGradientStyle;
  tags?: string[];
}

export interface TankaTag {
  name: string;
  ids: string[];
}

// IndexedDBに保存するレコード型(短歌用)
export interface TankaRecord extends TankaSettings {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// IndexedDBに保存するレコード型(タグ用)
export interface TankaTagRecord extends TankaTag {
  id: string;
  createdAt: string;
  updateAt: string;
}
