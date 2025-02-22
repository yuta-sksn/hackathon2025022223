"use client"

import React, { useRef } from 'react';
import { PasswordForgetFormValues, UsePasswordForgetFormRegisterReturns } from '@/features/auth/types';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { sendPasswordResetEmailByFirebase } from '@/features/auth/api/auth';

import PasswordForgetFormPresentational from '@/features/auth/components/PasswordForgetFormPresentational/PasswordForgetFormPresentational';
import { useRouter } from 'next/navigation';

import { toast } from 'react-toastify';

export default function PasswordForgetFormContainer() {

  const router = useRouter()
  const { register, setValue, handleSubmit, formState } = useForm<PasswordForgetFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    }
  })

  const passwordForgetFormRegisterReturns: UsePasswordForgetFormRegisterReturns = {
    email: register('email', {
      // 必須
      required: 'メールアドレスを入力してください。',
      // メールアドレス形式か否か
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: '正しいメールアドレスを入力してください。',
      },
    }),
  }

  const notify = () => toast.info('パスワードリセットメールを送信しました。メールをご確認ください。', {
    icon: false,
  })

  const sendPasswordResetEmailErrorMessage = useRef('')

  const handleOnSubmit: SubmitHandler<PasswordForgetFormValues> = async (values) => {
    // Firebase Authentication パスワード再設定リンク送信
    const { success, message } = await sendPasswordResetEmailByFirebase(values.email)

    // メール送信に成功した場合 
    if (success) {
      // トースト表示
      notify()
      // 指定されたページに遷移
      router.push('/')
    }

    sendPasswordResetEmailErrorMessage.current = message
  }

  const handleOnError: SubmitErrorHandler<PasswordForgetFormValues> = (errors) => {
    console.log(errors)
  }

  return (
    <PasswordForgetFormPresentational
      passwordForgetFormRegisterReturns={passwordForgetFormRegisterReturns}
      setValue={setValue}
      handleSubmit={handleSubmit}
      formState={formState}
      handleOnSubmit={handleOnSubmit}
      handleOnError={handleOnError}
      sendPasswordResetEmailErrorMessage={sendPasswordResetEmailErrorMessage.current}
    />
  )
}
