'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/helpers/classNames';

import classes from './SelectorBoxField.module.scss';
import { SelectOption } from '@/components/types';
import { UseFormRegisterReturn } from 'react-hook-form';
import React from 'react';

type SelectorBoxFieldProps = {
  options: SelectOption[];
  defaultCheckedValue?: string | number | readonly string[];
  register: UseFormRegisterReturn;
} & HTMLAttributes<HTMLDivElement>;

const SelectorBoxField = ({
  options,
  defaultCheckedValue,
  register,
  className,
  ...props
}: SelectorBoxFieldProps) => {
  const Boxes = options.map((option, i) => {
    return (
      <React.Fragment key={i}>
        <input
          type="radio"
          id={`${register.name}-${i}-${option.value}`}
          value={option.value}
          className={classes.selectorBoxFieldRadio}
          defaultChecked={
            defaultCheckedValue ? option.value === defaultCheckedValue : i === 0
          }
          {...register}
        />
        <label
          htmlFor={`${register.name}-${i}-${option.value}`}
          className={classes.selectorBoxFieldLabel}
        >
          {option.text}
        </label>
      </React.Fragment>
    );
  });

  return (
    <div className={classNames(classes.selectorBoxField, className)} {...props}>
      {Boxes}
    </div>
  );
};

export default SelectorBoxField;
