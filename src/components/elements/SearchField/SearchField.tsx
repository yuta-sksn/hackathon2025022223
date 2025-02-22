import { InputHTMLAttributes, ReactNode } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

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
      className="h-12 w-full min-w-80 px-4 shadow-[0_2px_5px_rgba(0,0,0,0.26)]"
      placeholder={label}
      {...register}
      {...props}
    />
  );
};

export default SearchField;
