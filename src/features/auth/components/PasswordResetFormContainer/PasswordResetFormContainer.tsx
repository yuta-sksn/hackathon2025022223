"use client"

import React, { useEffect, useRef, useState } from 'react';
import { PasswordResetFormValues, UsePasswordResetFormRegisterReturns } from '@/features/auth/types';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { resetPasswordByFirebase, verifyPasswordResetCodeByFirebase } from '@/features/auth/api/auth';

import PasswordResetFormPresentational from '@/features/auth/components/PasswordResetFormPresentational/PasswordResetFormPresentational';
import { useRouter, useSearchParams } from 'next/navigation';

import classes from './PasswordResetFormContainer.module.scss'
import { toast } from 'react-toastify';

export default function PasswordResetFormContainer() {
  const hasMounted = useRef(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  const [actionCode, setActionCode] = useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(false)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true

      const mode = searchParams.get('mode')
      const oobCode = searchParams.get('oobCode')
      const apiKey = searchParams.get('apiKey')

      // メールに添付された URL 以外でアクセスした場合, TOP へ遷移
      if (
        mode !== 'resetPassword' ||
        !oobCode ||
        apiKey !== process.env.NEXT_PUBLIC_APIKEY
      ) return router.replace('/')

      ;(async (actionCode: string) => await verifyPasswordResetCodeByFirebase(actionCode))(oobCode)
        .then((res) => {
          if (res.success) {
            // actionCode を設定
            setActionCode(oobCode)
            // フォームを表示
            setIsShow(true)
          } else {
            // エラートーストを表示
            const errorNotify = () => toast.error(res.message, { icon: false })
            errorNotify()
            // TOP ページに遷移
            router.replace('/')
          }
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const { register, setValue, handleSubmit, watch, formState } = useForm<PasswordResetFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    }
  })

  // バリデーション用
  const password = watch('password', '')

  const passwordResetFormRegisterReturns: UsePasswordResetFormRegisterReturns = {
    password: register('password', {
      required: 'パスワードを入力してください。'
    }),
    confirmPassword: register('confirmPassword', {
      required: 'パスワード (確認) を入力してください。',
      validate: value =>
        value === password || '入力したパスワードが一致しません。'
    }),
  }

  const notify = () => toast.info('パスワードをリセットしました。', {
    icon: false,
  })

  const resetPasswordErrorMessage = useRef('')

  const handleOnSubmit: SubmitHandler<PasswordResetFormValues> = async (values) => {
    if (actionCode === '') return 

    // Firebase Authentication パスワードリセット
    const { success, message } = await resetPasswordByFirebase(actionCode, values.password)

    // パスワードリセットに成功した場合 
    if (success) {
      // トーストを表示
      notify()
      // ログインページに遷移
      router.replace('/account/login')
    }

    resetPasswordErrorMessage.current = message
  }

  const handleOnError: SubmitErrorHandler<PasswordResetFormValues> = (errors) => {
    console.log(errors)
  }

  return (
    <>{(() => {
      if (isShow) return (<PasswordResetFormPresentational
        passwordResetFormRegisterReturns={passwordResetFormRegisterReturns}
        setValue={setValue}
        handleSubmit={handleSubmit}
        formState={formState}
        handleOnSubmit={handleOnSubmit}
        handleOnError={handleOnError}
        resetPasswordErrorMessage={resetPasswordErrorMessage.current}
      />)
      else return (<div className={classes.guard}>
        <div className={classes.guardLoading}><span /></div>
      </div>)
    })()}</>
  )
}
