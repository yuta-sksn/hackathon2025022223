import { createMeta } from '@/helpers/meta';

import type { Metadata } from 'next';
import './globals.scss';
import { AdobeFont } from '@/components/layouts/AdobeFont';
import { AuthProvider } from '@/features/auth/components/AuthProvider/AuthProvider';
import { ToastContainer } from 'react-toastify';

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
        {/* トースト */}
        <ToastContainer position="top-center" hideProgressBar />
      </body>
    </html>
  );
}
