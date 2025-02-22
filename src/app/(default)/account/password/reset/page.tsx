import React from 'react';
import PasswordResetForm from '@/features/auth/components/PasswordResetForm/PasswordResetForm';

import classes from '@/styles/page.module.scss';
import { classNames } from '@/helpers/classNames';
import { Metadata } from 'next';
// import { defaultCanonical } from '@/helpers/meta';

// export const metadata: Metadata = {
//   title: 'パスワード再設定',
//   ...defaultCanonical('/account/password/reset'),
//   openGraph: null,
//   robots: {
//     index: false, // noindexの設定
//   },
// };

export default function Home() {
  return (
    <main
      className={classNames(
        classes.pageContentsContainer,
        '!max-w-full overflow-x-hidden !px-0',
      )}
    >
      <PasswordResetForm />
    </main>
  );
}
