"use client";

import { useAuthContext } from '@/features/auth/components/AuthProvider/AuthProvider';
import { UserState } from '@/libs/recoil/atom';
import React from 'react';
import { useRecoilState } from 'recoil';
import ShowUserDetailPresentational from '../ShowUserDetailPresentational/ShowUserDetailPresentational';
import { User } from 'firebase/auth';

export default function ShowUserDetailContainer() {
  const { user: userByFirebase } = useAuthContext()
  const [userByRecoil, _setUserByRecoil] = useRecoilState(UserState)

  return (
    <ShowUserDetailPresentational
      userByFirebase={userByFirebase as User}
      userByRecoil={userByRecoil}
    />
  )
}
