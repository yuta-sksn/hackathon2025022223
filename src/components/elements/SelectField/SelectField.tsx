'use client';

import { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { classNames } from '@/helpers/classNames';

import classes from './SelectField.module.scss';
import colors from '@/styles/colors.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import { SelectOption } from '@/components/types';

type SelectFieldProps = {
  options: SelectOption[];
  register: UseFormRegisterReturn;
  placeholder: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const SelectField = ({
  options,
  register,
  placeholder,
  className,
  ...props
}: SelectFieldProps) => {
  const { ref, ...rest } = register;
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const SelectOptions = options.map((option) => {
    return (
      <option value={option.value} key={option.text}>
        {option.text}
      </option>
    );
  });

  useEffect(() => {
    if (!selectRef.current) return;
    selectRef.current.style.color = colors.subColor;
  }, [selectRef]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    (selectRef.current as HTMLSelectElement).style.color =
      event.target.value === '' ? colors.subColor : colors.mainColor;
  };

  return (
    <label className={classNames(classes.selectField, className)}>
      <select
        {...rest}
        ref={(e) => {
          ref(e);
          selectRef.current = e;
        }}
        defaultValue=""
        onChange={(e) => {
          rest.onChange(e);
          handleSelect(e);
        }}
        {...props}
      >
        {(() => {
          if (placeholder !== '') {
            return (
              <option value="" disabled>
                {placeholder}
              </option>
            );
          }
        })()}
        {SelectOptions}
      </select>
    </label>
  );
};

export default SelectField;
