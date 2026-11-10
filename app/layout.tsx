import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';
import './globals.css';

const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  title: 'Reforge — Software & creative technology studio',
  description: 'One team for the product, the interface, the data behind it and the security around it.',
  icons: { icon: '/logo-mark.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600&display=swap" />
      </head>
      <body>{children}</body>
    </html>
  );
}
