'use client';

import React, { useRef } from 'react';
import {
  AuthFormValues,
  UseAuthFormRegisterReturns,
} from '@/features/auth/types';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form';
import { doAuthByFirebase, doAuthByResource } from '@/features/auth/api/auth';

import AuthFormPresentational from '@/features/auth/components/AuthFormPresentational/AuthFormPresentational';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { UserState } from '@/libs/recoil/atom';

type AuthFormContainerProps = {
  isRegister: boolean;
};

export default function AuthFormContainer({
  isRegister,
}: AuthFormContainerProps) {
  const [_userByRecoil, setUserByRecoil] = useRecoilState(UserState);

  const searchParams = useSearchParams();
  const fromPathName = searchParams.get('from');

  const router = useRouter();
  const { register, setValue, handleSubmit, formState } =
    useForm<AuthFormValues>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: {
        email: '',
        password: '',
      },
    });

  const authFormRegisterReturns: UseAuthFormRegisterReturns = {
    email: register('email', {
      required: 'メールアドレスを入力してください。',
    }),
    password: register('password', {
      required: 'パスワードを入力してください。',
    }),
  };

  const authErrorMessage = useRef('');

  const handleOnSubmit: SubmitHandler<AuthFormValues> = async (values) => {
    // Firebase Authentication 認証処理
    const { success, message, user } = await doAuthByFirebase(
      isRegister,
      values,
    );

    console.log(user);

    // Firebase Authentication の認証に成功した場合
    if (success) {
      // ジモニッチ API 認証処理
      const result = await doAuthByResource(isRegister, {
        // @ts-ignore
        Authorization: `Bearer ${user.accessToken}`,
      });

      // ユーザー情報を Recoil に格納する
      setUserByRecoil({ ...result });

      // 指定されたページに遷移
      router.push(fromPathName || '/');
    }

    authErrorMessage.current = message;
  };

  const handleOnError: SubmitErrorHandler<AuthFormValues> = (errors) => {
    console.log(errors);
  };

  return (
    <AuthFormPresentational
      isRegister={isRegister}
      authFormRegisterReturns={authFormRegisterReturns}
      setValue={setValue}
      handleSubmit={handleSubmit}
      formState={formState}
      handleOnSubmit={handleOnSubmit}
      handleOnError={handleOnError}
      authErrorMessage={authErrorMessage.current}
    />
  );
}
