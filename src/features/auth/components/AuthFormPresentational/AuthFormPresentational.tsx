"use client"

import React from 'react';
import InputField from '@/components/elements/InputField/InputField'
import SubmitField from '@/components/elements/SubmitField/SubmitField'
import {
  FormState,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form';
import { AuthFormValues, UseAuthFormRegisterReturns } from '@/features/auth/types';

import classes from './AuthFormPresentational.module.scss'
import Link from 'next/link';

type AuthFormPresentationalProps = {
  isRegister: boolean;
  authFormRegisterReturns: UseAuthFormRegisterReturns
  setValue: UseFormSetValue<AuthFormValues>
  handleSubmit: UseFormHandleSubmit<AuthFormValues, undefined>
  formState: FormState<AuthFormValues>
  handleOnSubmit: SubmitHandler<AuthFormValues>
  handleOnError: SubmitErrorHandler<AuthFormValues>
  authErrorMessage: string
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

  const formTitle = isRegister ? 'アカウント作成' : 'ログイン'
  const submitButtonLabel = isRegister ? 'アカウント作成' : 'ログイン'

  return (
    <section className={classes.presentationalSection}>
      <h2 className={classes.presentationalFormTitle}><span>{ formTitle }</span></h2>
      <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} className={classes.presentationalForm}>
        <div className={classes.presentationalFormGroupBox}>
          <label className={classes.presentationalFormLabel}>メールアドレス</label>
          <InputField
            label="メールアドレス"
            fullWidthCharactersNotAllowed={true}
            register={authFormRegisterReturns.email}
            setValue={setValue}
            className="!max-w-lg"
          />
          <p className={classes.presentationalErrorMessage}>
            { formState.errors.email?.message }
          </p>
        </div>
        <div className={classes.presentationalFormGroupBox}>
          <label className={classes.presentationalFormLabel}>パスワード</label>
          <InputField
            type="password"
            label="パスワード"
            register={authFormRegisterReturns.password}
            setValue={setValue}
            className="!max-w-lg"
          />
          <p className={classes.presentationalErrorMessage}>
            { formState.errors.password?.message }
          </p>
        </div>
        {(() => {
          if (!isRegister) {
            return (<p className={classes.presentationalForgetPassword}>
              パスワードを忘れた方は<Link href={'/account/password/forget'}>こちら</Link>
            </p>)}
        })()}

        {/* サブミットボタン */}
        <SubmitField
          label={submitButtonLabel}
          className='mt-16'
          disabled={!formState.isDirty || formState.isSubmitting}
        />

        {/* Firebase 含むリソースサーバエラー表示 */}
        <p className={classes.presentationalAuthErrorMessage}>{ authErrorMessage }</p>

        {/* 注釈 */}
        <p className={classes.presentationalAnnotation}>
          本サービスを利用することにより、<br /><Link href="/terms">利用規約</Link>および<Link href="/privacy">プライバシーポリシー</Link>に同意したものとします。
        </p>
      </form>
    </section>
  )
}
