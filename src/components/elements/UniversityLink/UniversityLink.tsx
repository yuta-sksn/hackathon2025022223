import { classNames } from '@/helpers/classNames';

import classes from './UniversityLink.module.scss';
import { CSSProperties, LinkHTMLAttributes } from 'react';
import Link from 'next/link';

type UniversityLinkProps = {
  name: string;
  address: string;
  thumbnailImageUrl: string | null;
} & LinkHTMLAttributes<HTMLLinkElement>;

const UniversityLink = ({
  name,
  address,
  thumbnailImageUrl,
  href,
  className,
}: UniversityLinkProps) => {
  const bannerBgImageStyle: CSSProperties = {
    backgroundImage: `url(${thumbnailImageUrl || ''})`,
    // サムネイル画像が返却された際は背景を透過, それ以外は背景をグレーに
    backgroundColor:
      !thumbnailImageUrl || thumbnailImageUrl === '' ? '#aaa' : 'rgba(#fff, 0)',
  };

  return (
    <Link
      href={href as string}
      className={classNames(classes.universityLink, className)}
    >
      {/* 大学アイコン */}
      <div className={classes.universityLinkIcon} style={bannerBgImageStyle} />

      {/* 大学名 / 住所 */}
      <div className={classes.universityLinkTextContainer}>
        <p className={classes.universityName}>{name}</p>
        <p className={classes.universityAddress}>{address}</p>
      </div>
    </Link>
  );
};

export default UniversityLink;
