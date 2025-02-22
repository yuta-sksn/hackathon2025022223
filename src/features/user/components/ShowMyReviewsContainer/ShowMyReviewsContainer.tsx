"use client";

import { useAuthContext } from '@/features/auth/components/AuthProvider/AuthProvider';
import { UserState } from '@/libs/recoil/atom';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import ShowMyReviewsPresentational from '../ShowMyReviewsPresentational/ShowMyReviewsPresentational';
import { User } from 'firebase/auth';
import useSyncMyReviews from '@/features/user/api/useSyncMyReviews';
import { Review } from '@/features/review/types';

export default function ShowMyReviewsContainer() {
  const { user: userByFirebase } = useAuthContext()
  const [userByRecoil, _setUserByRecoil] = useRecoilState(UserState)

  const [currentPage, setCurrentPage] = useState(1)
  const [myReviewsArray, setMyReviewsArray] = useState<Array<Review[]>>([])

  const {
    data: myReviews,
    error: useSyncReviewsError,
    isLoading: useSyncReviewsIsLoading
  } = useSyncMyReviews(
    // @ts-ignore
    userByFirebase.accessToken
  )

  useEffect(() => {
    if (!myReviews) return
    const temp = myReviewsArray.concat()
    temp[currentPage - 1] = myReviews.objects.concat()
    setMyReviewsArray(temp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myReviews])

  const handleTapShowMore = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <ShowMyReviewsPresentational
      myReviews={myReviews}
      myReviewsArray={myReviewsArray}
      handleTapShowMore={handleTapShowMore}
    />
  )
}
