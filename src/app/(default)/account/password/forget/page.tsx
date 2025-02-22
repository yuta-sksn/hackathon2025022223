import React from 'react';
import PasswordForgetFormContainer from '@/features/auth/components/PasswordForgetFormContainer/PasswordForgetFormContainer';

import classes from '@/styles/page.module.scss';
import { classNames } from '@/helpers/classNames';
import { Metadata } from 'next';
// import { defaultCanonical, defaultOpenGraph } from '@/helpers/meta';

const pathName = '/account/password/forget';

// export const metadata: Metadata = {
//   title: 'パスワード再設定リンク発行',
//   ...defaultCanonical(pathName),
//   openGraph: defaultOpenGraph('パスワード再設定リンク発行', null, pathName),
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
      <PasswordForgetFormContainer />
    </main>
  );
}
