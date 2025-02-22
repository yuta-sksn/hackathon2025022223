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
  AuthFormValues,
  UseAuthFormRegisterReturns,
} from '@/features/auth/types';
import Link from 'next/link';

type AuthFormPresentationalProps = {
  isRegister: boolean;
  authFormRegisterReturns: UseAuthFormRegisterReturns;
  setValue: UseFormSetValue<AuthFormValues>;
  handleSubmit: UseFormHandleSubmit<AuthFormValues, undefined>;
  formState: FormState<AuthFormValues>;
  handleOnSubmit: SubmitHandler<AuthFormValues>;
  handleOnError: SubmitErrorHandler<AuthFormValues>;
  authErrorMessage: string;
};

export default function AuthFormPresentational({
  isRegister,
  authFormRegisterReturns,
  setValue,
  handleSubmit,
  formState,
  handleOnSubmit,
  handleOnError,
  authErrorMessage,
}: AuthFormPresentationalProps) {
  const formTitle = isRegister ? 'ユーザー登録' : 'ログイン';
  const submitButtonLabel = isRegister ? '登録' : 'ログイン';

  return (
    <section className="mx-auto w-full max-w-lg pt-20 sm:pt-10">
      <h2 className="mb-8 text-center text-2xl">
        <span>{formTitle}</span>
      </h2>
      <form
        onSubmit={handleSubmit(handleOnSubmit, handleOnError)}
        className="flex flex-col gap-8 px-8"
      >
        <div>
          <label className="mb-4 inline-block text-base">
            メールアドレス<span className="text-red-500">（必須）</span>
          </label>
          <InputField
            label="mail@example.com"
            fullWidthCharactersNotAllowed={true}
            register={authFormRegisterReturns.email}
            setValue={setValue}
            className="!max-w-lg"
          />
          <p className="ml-2 text-sm tracking-[0.12em] text-red-500">
            {formState.errors.email?.message}
          </p>
        </div>
        <div className="mb-4">
          <label className="mb-4 inline-block text-base">
            パスワード<span className="text-red-500">（必須）</span>
          </label>
          <InputField
            type="password"
            label="password"
            register={authFormRegisterReturns.password}
            setValue={setValue}
            className="!max-w-lg"
          />
          <p className="ml-2 text-sm tracking-[0.12em] text-red-500">
            {formState.errors.password?.message}
          </p>
        </div>
        {/* {(() => {
          if (!isRegister) {
            return (
              <p className={classes.presentationalForgetPassword}>
                パスワードを忘れた方は
                <Link href={'/account/password/forget'}>こちら</Link>
              </p>
            );
          }
        })()} */}

        {/* サブミットボタン */}
        <SubmitField
          label={submitButtonLabel}
          className="mt-16"
          disabled={!formState.isDirty || formState.isSubmitting}
        />

        {/* Firebase 含むリソースサーバエラー表示 */}
        {authErrorMessage !== '' && (
          <p className="mx-2 mt-2 text-center text-sm tracking-[0.12em] text-red-500">
            {authErrorMessage}
          </p>
        )}

        {/* 注釈 */}
        <p className="text-center text-blue-600">
          アカウントを持っていない方は
          <br />
          <Link href="/account/register" className="underline">
            こちら
          </Link>
          から登録してくさい。
        </p>
      </form>
    </section>
  );
}
