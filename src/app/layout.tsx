import type { Metadata } from 'next';
import { Providers } from './providers';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'TankaPic | 短歌画像生成アプリ',
  description: '短歌の管理と短歌画像の生成を行うWebアプリケーションです。',
  applicationName: 'TankaPic',
  manifest: '/manifest.json',
  metadataBase: new URL('https://tankapic.netlify.app'),
  openGraph: {
    title: 'TankaPic | 短歌画像生成アプリ',
    description: '短歌の管理と短歌画像の生成を行うWebアプリケーションです。',
    url: 'https://tankapic.netlify.app',
    siteName: 'TankaPic',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/ogp.png',
        width: 3840,
        height: 2160,
        alt: 'TankaPicのOGP画像',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TankaPic | 短歌画像生成アプリ',
    description: '短歌の管理と短歌画像の生成を行うWebアプリケーションです。',
    images: ['/ogp.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WS5L7424');`,
          }}
        />
        {/* End Google Tag Manager */}
        <meta name="theme-color" content="#F5F5F1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=Noto+Serif+JP:wght@200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WS5L7424"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
