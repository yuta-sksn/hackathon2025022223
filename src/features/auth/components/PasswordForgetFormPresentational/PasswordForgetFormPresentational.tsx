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
  PasswordForgetFormValues,
  UsePasswordForgetFormRegisterReturns,
} from '@/features/auth/types';

import classes from './PasswordForgetFormPresentational.module.scss';
import { classNames } from '@/helpers/classNames';

type PasswordForgetFormPresentationalProps = {
  passwordForgetFormRegisterReturns: UsePasswordForgetFormRegisterReturns;
  setValue: UseFormSetValue<PasswordForgetFormValues>;
  handleSubmit: UseFormHandleSubmit<PasswordForgetFormValues, undefined>;
  formState: FormState<PasswordForgetFormValues>;
  handleOnSubmit: SubmitHandler<PasswordForgetFormValues>;
  handleOnError: SubmitErrorHandler<PasswordForgetFormValues>;
  sendPasswordResetEmailErrorMessage: string;
};

export default function PasswordForgetFormPresentational({
  passwordForgetFormRegisterReturns,
  setValue,
  handleSubmit,
  formState,
  handleOnSubmit,
  handleOnError,
  sendPasswordResetEmailErrorMessage,
}: PasswordForgetFormPresentationalProps) {
  return (
    <section className={classes.presentationalSection}>
      <h2 className={classes.presentationalFormTitle}>
        <span>パスワード再設定リンク発行</span>
      </h2>
      <form
        onSubmit={handleSubmit(handleOnSubmit, handleOnError)}
        className={classNames(classes.presentationalForm, 'pb-32')}
      >
        <div className={classes.presentationalFormGroupBox}>
          <label className={classes.presentationalFormLabel}>
            メールアドレス
          </label>
          <InputField
            label="メールアドレス"
            fullWidthCharactersNotAllowed={true}
            register={passwordForgetFormRegisterReturns.email}
            setValue={setValue}
            className="!max-w-lg"
          />
          <p className={classes.presentationalErrorMessage}>
            <span
              className={
                formState.errors.email?.message ? 'inline-block' : 'inline'
              }
            >
              {formState.errors.email?.message}
            </span>
          </p>
        </div>

        {/* サブミットボタン */}
        <SubmitField
          label="送信する"
          className="mt-10"
          disabled={!formState.isValid || formState.isSubmitting}
        />

        {/* Firebase 含むリソースサーバエラー表示 */}
        <p className={classes.presentationalAuthErrorMessage}>
          <span
            className={
              sendPasswordResetEmailErrorMessage ||
              sendPasswordResetEmailErrorMessage !== ''
                ? 'inline-block'
                : 'inline'
            }
          >
            {sendPasswordResetEmailErrorMessage}
          </span>
        </p>
      </form>
    </section>
  );
}
