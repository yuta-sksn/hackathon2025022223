'use client';

import { LinkHTMLAttributes } from 'react';
import { classNames } from '@/helpers/classNames';

import classes from './ButtonLink.module.scss';
import Link from 'next/link';

type ButtonLinkProps = {
  text: string;
  href: string;
} & LinkHTMLAttributes<HTMLLinkElement>;

const ButtonLink = ({ text, href, className }: ButtonLinkProps) => {
  return (
    <Link href={href} className={classNames(classes.buttonLink, className)}>
      {text}
    </Link>
  );
};

export default ButtonLink;
