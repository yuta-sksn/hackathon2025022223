"use client"

import React, { Suspense } from 'react';
import AuthFormContainer from '@/features/auth/components/AuthFormContainer/AuthFormContainer';
import { RecoilRoot } from 'recoil';

type AuthFormProps = {
  isRegister?: boolean;
}

export default function AuthForm({
  isRegister = false,
}: AuthFormProps) {
  return (
    <RecoilRoot>
      <Suspense>
        <AuthFormContainer isRegister={isRegister} />
      </Suspense>
    </RecoilRoot>
  )
}
