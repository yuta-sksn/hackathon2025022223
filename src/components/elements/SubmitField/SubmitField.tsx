import { ButtonHTMLAttributes } from 'react';
import { classNames } from '@/helpers/classNames';

import classes from './SubmitField.module.scss';

type SubmitFieldProps = {
  label: string;
  disabled: boolean;
} & ButtonHTMLAttributes<HTMLInputElement>;

const SubmitField = ({ label, disabled, className }: SubmitFieldProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="flex h-9 w-full items-center justify-center rounded-lg bg-blue-600 text-white disabled:opacity-50"
    >
      {label}
    </button>
  );
};

export default SubmitField;
