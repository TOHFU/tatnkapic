// 短歌設定の型定義

export type TextAlignment = 'left' | 'center' | 'right';
export type FontFamily = 'serif' | 'sans';
export type BackgroundType = 'monocrome' | 'gradient';

export interface MeshGradientStyle {
  backgroundColor: string;
  backgroundImage: string;
}

export interface TankaSettings {
  tanka: string;
  subtitle: string;
  subtitleAlignment: TextAlignment;
  fontFamily: FontFamily;
  fontColor: string;
  backgroundType: BackgroundType;
  monocromeColor: string;
  meshGradient: MeshGradientStyle;
}

// IndexedDBに保存するレコード型
export interface TankaRecord extends TankaSettings {
  id: string;
  createdAt: string;
  updatedAt: string;
}
