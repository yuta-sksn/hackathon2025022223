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
      className={classNames(classes.submitField, className)}
    >
      {label}
    </button>
  );
};

export default SubmitField;
