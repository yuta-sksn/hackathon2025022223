"use client"

import { AuthGuard } from '@/features/auth/components/AuthGuard/AuthGuard'
import ShowMyReviewsContainer from '@/features/user/components/ShowMyReviewsContainer/ShowMyReviewsContainer'
import { RecoilRoot } from 'recoil'

export default function ShowMyReviews() {
  return (
    <AuthGuard>
      <RecoilRoot>
        <ShowMyReviewsContainer />
      </RecoilRoot>
    </AuthGuard>
  )
}
