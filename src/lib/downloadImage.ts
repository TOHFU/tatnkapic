// 短歌画像ダウンロードユーティリティ
import { toPng } from 'html-to-image';

// Google Fontsのフォント定義をインラインで埋め込む
const FONT_FACE_CSS = `
@font-face {
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/notoserifjp/v28/xn7mYHs73QKIGDMRxAOJzA9GIwqxr1c.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+3000-30FF, U+4E00-9FFF, U+FF00-FFEF;
}
@font-face {
  font-family: 'Noto Serif JP';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/notoserifjp/v28/xn7mYHs73QKIGDMRxAOJzA9GIwqxr1c.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+3000-30FF, U+4E00-9FFF, U+FF00-FFEF;
}
@font-face {
  font-family: 'Sawarabi Gothic';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/sawarabigothic/v12/x3d4ckfVaqqa-BEj-I9mE65u3k3NBSk.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+3000-30FF, U+4E00-9FFF, U+FF00-FFEF;
}
`;

// 外部スタイルシートを一時的にDOMから退避
function detachCrossOriginLinks(): HTMLLinkElement[] {
  const removed: HTMLLinkElement[] = [];
  document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]').forEach((link) => {
    const href = link.getAttribute('href') ?? '';
    if (href.startsWith('http') && !href.startsWith(window.location.origin)) {
      link.remove();
      removed.push(link);
    }
  });
  return removed;
}

// dataURLをBlobに変換
function dataUrlToBlob(dataUrl: string): Blob {
  const [header, base64] = dataUrl.split(',');
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/png';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

// File System Access APIで保存ダイアログを表示
async function saveWithPicker(blob: Blob, filename: string): Promise<void> {
  if ('showSaveFilePicker' in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: 'PNG画像',
            accept: { 'image/png': ['.png'] },
          },
        ],
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return;
    } catch (e) {
      // ユーザーがキャンセルした場合
      if (e instanceof DOMException && e.name === 'AbortError') return;
      throw e;
    }
  }

  // 非対応ブラウザはフォールバック
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

// TankaPicture要素を画像としてダウンロード
export async function downloadTankaImage(
  filename = 'tanka.png',
): Promise<void> {
  const node = document.getElementById('tanka-picture');
  if (!node) return;

  // インラインフォント定義を追加し、外部linkを一時退避
  const styleEl = document.createElement('style');
  styleEl.textContent = FONT_FACE_CSS;
  document.head.appendChild(styleEl);
  const removedLinks = detachCrossOriginLinks();

  try {
    const dataUrl = await toPng(node, {
      pixelRatio: 2,
    });

    const blob = dataUrlToBlob(dataUrl);
    await saveWithPicker(blob, filename);
  } finally {
    // 外部linkを復元し、インラインスタイルを削除
    removedLinks.forEach((l) => document.head.appendChild(l));
    document.head.removeChild(styleEl);
  }
}
