"use client"

import React, { Suspense } from 'react';
import PasswordResetFormContainer from '@/features/auth/components/PasswordResetFormContainer/PasswordResetFormContainer';

export default function PasswordResetForm() {
  return (
    <Suspense>
      <PasswordResetFormContainer />
    </Suspense>
  )
}
