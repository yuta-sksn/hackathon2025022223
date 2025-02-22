'use client';

import { UserState } from '@/libs/recoil/atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import PatchUserFormPresentational from '../PatchUserFormPresentational/PatchUserFormPresentational';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import {
  PatchUserFormValues,
  UsePatchUserFormRegisterReturns,
} from '@/features/user/types';
import usePatchUser from '@/features/user/api/usePatchUser';
import { useAuthContext } from '@/features/auth/components/AuthProvider/AuthProvider';

import { toast } from 'react-toastify';

export default function PatchUserFormContainer() {
  const { user: userByFirebase } = useAuthContext();
  const [userByRecoil, setUserByRecoil] = useRecoilState(UserState);

  const { control, register, setValue, handleSubmit, formState } =
    useForm<PatchUserFormValues>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      defaultValues: {
        lastEducationspotName: userByRecoil.lastEducationspotName ?? '',
        lastEducationFacultyName: userByRecoil.lastEducationFacultyName ?? '',
        lastEducationStartAt: userByRecoil.lastEducationStartAt ?? '',
        lastEducationEndAt: userByRecoil.lastEducationEndAt ?? '',
      },
    });

  const patchUserFormRegisterReturns: UsePatchUserFormRegisterReturns = {
    lastEducationspotName: register('lastEducationspotName'),
    lastEducationFacultyName: register('lastEducationFacultyName'),
    lastEducationStartAt: register('lastEducationStartAt'),
    lastEducationEndAt: register('lastEducationEndAt'),
  };

  const notify = () =>
    toast.info('編集内容を保存しました。', {
      icon: false,
    });

  // handleOnSubmit の React hooks (関数名は use から始めないとエラーになる)
  const useHandleOnSubmit: SubmitHandler<PatchUserFormValues> = async (
    values,
  ) => {
    // ジモニッチ API に対してユーザー情報の更新をリクエスト
    const result = await usePatchUser(
      {
        // @ts-ignore
        Authorization: `Bearer ${userByFirebase.accessToken}`,
      },
      {
        lastEducationspotName: values.lastEducationspotName,
        lastEducationFacultyName: values.lastEducationFacultyName,
        lastEducationStartAt: values.lastEducationStartAt,
        lastEducationEndAt: values.lastEducationEndAt,
      },
    );

    // ユーザー情報を Recoil に格納する
    setUserByRecoil({ ...result });

    // 保存完了トーストを表示
    notify();
  };

  const handleOnError: SubmitErrorHandler<PatchUserFormValues> = (errors) => {
    console.log(errors);
  };

  return (
    <PatchUserFormPresentational
      control={control}
      patchUserFormRegisterReturns={patchUserFormRegisterReturns}
      setValue={setValue}
      handleSubmit={handleSubmit}
      formState={formState}
      handleOnSubmit={useHandleOnSubmit}
      handleOnError={handleOnError}
    />
  );
}
