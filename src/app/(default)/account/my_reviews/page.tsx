import ShowMyReviews from '@/features/user/components/ShowMyReviews/ShowMyReviews';

import classes from '@/styles/page.module.scss';
import { classNames } from '@/helpers/classNames';
import { Metadata } from 'next';
import { defaultCanonical } from '@/helpers/meta';

export const metadata: Metadata = {
  title: 'マイレビュー一覧',
  ...defaultCanonical('/account/my_reviews'),
  openGraph: null,
  robots: {
    index: false, // noindexの設定
  },
};

export default function Home() {
  return (
    <main
      className={classNames(classes.pageContentsContainer, '!max-w-full !px-0')}
    >
      <ShowMyReviews />
    </main>
  );
}
