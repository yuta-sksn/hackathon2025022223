'use client';

import React from 'react';
import InputField from '@/components/elements/InputField/InputField';
import SubmitField from '@/components/elements/SubmitField/SubmitField';
import {
  FormState,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form';
import {
  PasswordResetFormValues,
  UsePasswordResetFormRegisterReturns,
} from '@/features/auth/types';

import classes from './PasswordResetFormPresentational.module.scss';
import { classNames } from '@/helpers/classNames';

type PasswordResetFormPresentationalProps = {
  passwordResetFormRegisterReturns: UsePasswordResetFormRegisterReturns;
  setValue: UseFormSetValue<PasswordResetFormValues>;
  handleSubmit: UseFormHandleSubmit<PasswordResetFormValues, undefined>;
  formState: FormState<PasswordResetFormValues>;
  handleOnSubmit: SubmitHandler<PasswordResetFormValues>;
  handleOnError: SubmitErrorHandler<PasswordResetFormValues>;
  resetPasswordErrorMessage: string;
};

export default function PasswordResetFormPresentational({
  passwordResetFormRegisterReturns,
  setValue,
  handleSubmit,
  formState,
  handleOnSubmit,
  handleOnError,
  resetPasswordErrorMessage,
}: PasswordResetFormPresentationalProps) {
  return (
    <section className={classes.presentationalSection}>
      <h2 className={classes.presentationalFormTitle}>
        <span>パスワード再設定</span>
      </h2>
      <form
        onSubmit={handleSubmit(handleOnSubmit, handleOnError)}
        className={classNames(classes.presentationalForm, 'pb-16')}
      >
        <div className={classes.presentationalFormGroupBox}>
          <label className={classes.presentationalFormLabel}>
            新しいパスワード
          </label>
          <InputField
            type="password"
            label="新しいパスワード"
            register={passwordResetFormRegisterReturns.password}
            setValue={setValue}
            className="!max-w-lg"
          />
          <p className={classes.presentationalErrorMessage}>
            <span
              className={
                formState.errors.password?.message ? 'inline-block' : 'inline'
              }
            >
              {formState.errors.password?.message}
            </span>
          </p>
        </div>
        <div className={classes.presentationalFormGroupBox}>
          <label className={classes.presentationalFormLabel}>
            新しいパスワード (確認)
          </label>
          <InputField
            type="password"
            label="新しいパスワード (確認)"
            register={passwordResetFormRegisterReturns.confirmPassword}
            setValue={setValue}
            className="!max-w-lg"
          />
          <p className={classes.presentationalErrorMessage}>
            <span
              className={
                formState.errors.confirmPassword?.message
                  ? 'inline-block'
                  : 'inline'
              }
            >
              {formState.errors.confirmPassword?.message}
            </span>
          </p>
        </div>

        {/* サブミットボタン */}
        <SubmitField
          label="再設定する"
          className="mt-16"
          disabled={!formState.isValid || formState.isSubmitting}
        />

        {/* Firebase 含むリソースサーバエラー表示 */}
        <p className={classes.presentationalAuthErrorMessage}>
          <span
            className={
              resetPasswordErrorMessage || resetPasswordErrorMessage !== ''
                ? 'inline-block'
                : 'inline'
            }
          >
            {resetPasswordErrorMessage}
          </span>
        </p>
      </form>
    </section>
  );
}
