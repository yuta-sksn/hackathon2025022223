"use client"

import { AuthGuard } from '@/features/auth/components/AuthGuard/AuthGuard'
import PatchUserFormContainer from '@/features/user/components/PatchUserFormContainer/PatchUserFormContainer'
import { RecoilRoot } from 'recoil'

export default function PatchUserForm() {
  return (
    <AuthGuard>
      <RecoilRoot>
        <PatchUserFormContainer />
      </RecoilRoot>
    </AuthGuard>
  )
}
