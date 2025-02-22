'use client';

import {
  TextareaHTMLAttributes,
  ReactNode,
  createRef,
  useEffect,
  useRef,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { classNames } from '@/helpers/classNames';
const { v4: uuidv4 } = require('uuid');

import classes from './TextareaField.module.scss';
import React from 'react';

type TextareaFieldProps = {
  label?: string;
  error?: string;
  action?: ReactNode;
  register: UseFormRegisterReturn;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaField = ({
  label,
  error,
  register,
  action,
  className,
  ...props
}: TextareaFieldProps) => {
  const { ref, ...rest } = register;
  const labelRef = createRef<HTMLLabelElement>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const placeholderRef = createRef<HTMLLabelElement>();

  useEffect(() => {
    // 両 DOM が null の場合は return
    if (
      labelRef.current === null ||
      textareaRef.current === null ||
      placeholderRef.current === null
    )
      return;

    // id と htmlFor にパラメータを動的に追加
    const textareaId = uuidv4();
    labelRef.current.htmlFor = textareaId;
    textareaRef.current.id = textareaId;
    placeholderRef.current.htmlFor = textareaId;
  }, [labelRef, textareaRef, placeholderRef]);

  const handleChangeTextarea = () => {
    if (textareaRef.current === null || placeholderRef.current === null) return;

    // placeholder の表示/非表示
    const letterLength = textareaRef.current.value.length;
    if (letterLength !== 0) {
      placeholderRef.current.style.opacity = '0';
    } else {
      placeholderRef.current.style.opacity = '1';
    }

    // 自動リサイズ処理
    const resetHeight = new Promise((resolve) => {
      resolve(
        ((textareaRef.current as HTMLTextAreaElement).style.height = 'auto'),
      );
    });

    if (textareaRef.current.scrollHeight > textareaRef.current.offsetHeight) {
      resetHeight.then(() => {
        (textareaRef.current as HTMLTextAreaElement).style.height =
          (textareaRef.current as HTMLTextAreaElement).scrollHeight + 'px';
      });
    } else {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <>
      <label ref={labelRef} className={classes.textareaFieldLabel}>
        {label}
      </label>
      <div className={classes.textareaFieldContainer}>
        <textarea
          {...rest}
          ref={(e) => {
            ref(e);
            textareaRef.current = e;
          }}
          className={classNames(classes.textareaField, className)}
          rows={5}
          onKeyUp={handleChangeTextarea}
          onChange={(e) => {
            rest.onChange(e);
            handleChangeTextarea();
          }}
        />
        <label
          ref={placeholderRef}
          dangerouslySetInnerHTML={{ __html: props.placeholder as string }}
          className={classes.textareaFieldPlaceholder}
        />
      </div>
    </>
  );
};

export default TextareaField;
