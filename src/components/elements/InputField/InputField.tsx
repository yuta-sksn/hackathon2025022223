'use client';

import { InputHTMLAttributes, ReactNode, useEffect, useRef } from 'react';
import { UseFormRegisterReturn, UseFormSetValue } from 'react-hook-form';
import { classNames } from '@/helpers/classNames';

import classes from './InputField.module.scss';
import React from 'react';

type InputFieldProps = {
  type?: string;
  label: string;
  fullWidthCharactersNotAllowed?: boolean;
  error?: string;
  currentLength?: number;
  action?: ReactNode;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<any>;
} & InputHTMLAttributes<HTMLInputElement>;

const InputField = ({
  error,
  type,
  label,
  fullWidthCharactersNotAllowed = false,
  currentLength,
  register,
  setValue,
  action,
  className,
  ...props
}: InputFieldProps) => {
  // password が表示 / 非表示か
  const [showPassword, setShowPassword] = React.useState(false);
  const { ref, ...rest } = register;
  const inputRef = useRef<HTMLInputElement | null>(null);

  // password の表示非表示タップイベントハンドリング
  const handleTapShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    // 全角文字を入力させない
    if (fullWidthCharactersNotAllowed || type === 'password') {
      const inputField = inputRef.current as HTMLInputElement;
      inputField.oninput = () => {
        setValue(
          register.name,
          inputField.value.replace(/[^a-zA-Z0-9!-/:-@¥[-`{-~]/gi, ''),
          {
            shouldValidate: true,
            shouldDirty: true,
          },
        );
      };
    }
  });

  return (
    <>
      {(() => {
        if (type !== 'password') {
          // パスワード入力以外の input (type=text)
          return (
            <input
              {...rest}
              ref={(e) => {
                ref(e);
                inputRef.current = e;
              }}
              className="block w-full rounded-lg border border-[#B3B3B3] bg-white px-4 py-2"
              placeholder={label}
              {...props}
            />
          );
        } else {
          // パスワード入力
          return (
            <>
              <input
                {...rest}
                ref={(e) => {
                  ref(e);
                  inputRef.current = e;
                }}
                type={showPassword ? 'text' : 'password'}
                className="block w-full rounded-lg border border-[#B3B3B3] bg-white px-4 py-2"
                placeholder={label}
                {...props}
              />
              <span
                className={classNames(
                  classes.showPassword,
                  showPassword
                    ? classes.showPasswordOn
                    : classes.showPasswordOff,
                )}
                onClick={handleTapShowPassword}
              />
            </>
          );
        }
      })()}
    </>
  );
};

export default InputField;
