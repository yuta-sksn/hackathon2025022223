"use client"

import { AuthGuard } from '@/features/auth/components/AuthGuard/AuthGuard'
import ShowUserDetailContainer from '@/features/user/components/ShowUserDetailContainer/ShowUserDetailContainer'
import { RecoilRoot } from 'recoil'

export default function ShowUserDetail() {
  return (
    <AuthGuard>
      <RecoilRoot>
        <ShowUserDetailContainer />
      </RecoilRoot>
    </AuthGuard>
  )
}
