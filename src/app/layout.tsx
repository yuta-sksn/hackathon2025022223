import { createMeta } from '@/helpers/meta';

import type { Metadata } from 'next';
import './globals.css';
import { AdobeFont } from '@/components/layouts/AdobeFont';
import { AuthProvider } from '@/features/auth/components/AuthProvider/AuthProvider';

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
      <body className="font-notoSansCjkJp">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
