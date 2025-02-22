import React from 'react';
import AuthForm from '@/features/auth/components/AuthForm/AuthForm';

import classes from '@/styles/page.module.scss';
import { classNames } from '@/helpers/classNames';
import { Metadata } from 'next';
// import { defaultCanonical, defaultOpenGraph } from '@/helpers/meta';

const pathName = '/account/register';

// export const metadata: Metadata = {
//   title: 'アカウント作成',
//   ...defaultCanonical(pathName),
//   openGraph: defaultOpenGraph('アカウント作成', null, pathName),
// };

export default function Home() {
  return (
    <main
      className={classNames(
        classes.pageContentsContainer,
        '!max-w-full overflow-x-hidden !px-0',
      )}
    >
      <AuthForm isRegister />
    </main>
  );
}
