import { AdobeFont } from '@/components/AdobeFont';
import { createMeta } from '@/helpers/meta';

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { ...createMeta() };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <AdobeFont />
        <p></p>
      </head>
      <body className="font-notoSansCjkJp">{children}</body>
    </html>
  );
}
