"use client"

import React from 'react'
import PostReviewFormContainer from '@/features/review/components/PostReviewFormContainer/PostReviewFormContainer'
import { AuthGuard } from '@/features/auth/components/AuthGuard/AuthGuard'

export default function PostReviewForm() {
  return (
    <AuthGuard>
      <PostReviewFormContainer />
    </AuthGuard>
  )
}
