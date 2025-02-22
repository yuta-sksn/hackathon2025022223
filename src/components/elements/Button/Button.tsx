'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/helpers/classNames';

import classes from './Button.module.scss';

type ButtonProps = {
  text: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ text, className, ...props }: ButtonProps) => {
  return (
    <button className={classNames(classes.button, className)} {...props}>
      {text}
    </button>
  );
};

export default Button;
