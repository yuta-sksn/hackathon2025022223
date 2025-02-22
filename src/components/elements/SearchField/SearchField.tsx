import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { classNames } from '@/helpers/classNames';

import classes from './SearchField.module.scss';

type SearchFieldProps = {
  label: string;
  error?: string;
  currentLength?: number;
  action?: ReactNode;
  register: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

const SearchField = ({
  error,
  label,
  currentLength,
  register,
  action,
  className,
  ...props
}: SearchFieldProps) => {
  return (
    <input
      id={register.name}
      className={classNames(
        classes.searchField,
        classes.placeholderStyle,
        className,
      )}
      placeholder={label}
      {...register}
      {...props}
    />
  );
};

export default SearchField;
