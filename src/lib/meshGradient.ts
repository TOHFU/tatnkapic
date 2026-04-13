// メッシュグラデーション生成ユーティリティ
import type { MeshGradientStyle } from '@/types/tanka';

// ランダムなHSLカラーを生成
function randomHslColor(): string {
  const h = Math.floor(Math.random() * 360);
  const s = 70 + Math.floor(Math.random() * 30);
  const l = 60 + Math.floor(Math.random() * 25);
  return `hsla(${h}, ${s}%, ${l}%, 0.8)`;
}

// メッシュグラデーションのCSSスタイルを生成
export function generateMeshGradient(): MeshGradientStyle {
  const blobCount = 5 + Math.floor(Math.random() * 3);
  const gradients = Array.from({ length: blobCount }, () => {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const size = 40 + Math.floor(Math.random() * 20);
    return `radial-gradient(at ${x}% ${y}%, ${randomHslColor()} 0px, transparent ${size}%)`;
  });

  return {
    backgroundColor: randomHslColor(),
    backgroundImage: gradients.join(', '),
  };
}
