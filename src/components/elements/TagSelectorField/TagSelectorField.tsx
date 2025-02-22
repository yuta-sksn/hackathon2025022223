'use client';

import { InputHTMLAttributes, useState } from 'react';
import { classNames } from '@/helpers/classNames';

import classes from './TagSelectorField.module.scss';
import React from 'react';
import {
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form';
import { Tag } from '@/components/types';

type TagSelectorFieldProps = {
  maxSelectionNum?: number;
  tags: Tag[];
  register: UseFormRegisterReturn;
  getValues: UseFormGetValues<any>;
} & InputHTMLAttributes<HTMLInputElement>;

const TagSelectorField = ({
  maxSelectionNum = 3,
  tags,
  register,
  getValues,
  className,
  ...props
}: TagSelectorFieldProps) => {
  const [tagIds, setTagIds] = useState<Array<string>>([]);

  // タグ群
  const Tags = tags.map((tag, i) => {
    return (
      <React.Fragment key={tag.id}>
        <input
          type="checkbox"
          id={`${register.name}-${i}-${tag.id}`}
          className={classes.tagSelectorFieldCheckbox}
          value={tag.id}
          disabled={tagIds.length === 3 && !tagIds.includes(tag.id.toString())}
          {...register}
          onChange={(e) => {
            register.onChange(e);
            setTagIds(getValues(register.name));
          }}
        />
        <label
          className={classes.tagSelectorFieldCheckboxLabel}
          htmlFor={`${register.name}-${i}-${tag.id}`}
        >
          {tag.name}
        </label>
      </React.Fragment>
    );
  });

  return (
    <div className={classNames(classes.tagSelectorField, className)}>
      {Tags}
    </div>
  );
};

export default TagSelectorField;
