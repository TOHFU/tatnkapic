import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'TankaPic - 短歌管理アプリケーション',
  description: '短歌の管理と短歌画像の生成を行うWebアプリケーション',
  applicationName: 'TankaPic',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
