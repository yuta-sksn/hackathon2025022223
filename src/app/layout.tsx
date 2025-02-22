import { createMeta } from '@/helpers/meta';

import type { Metadata } from 'next';
import './globals.css';
import { AdobeFont } from '@/components/layouts/AdobeFont';

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
      </head>
      <body className="font-notoSansCjkJp">{children}</body>
    </html>
  );
}
