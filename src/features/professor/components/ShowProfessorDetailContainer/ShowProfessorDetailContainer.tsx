"use client";

import { SelectOption } from '@/components/types';
import useSyncProfessor from '@/features/professor/api/useSyncProfessor';
import useSyncProfessorReviewSummary from '@/features/professor/api/useSyncProfessorReviewSummary';
import useSyncReviews from '@/features/review/api/useSyncReviews';
import {
  Review,
  SearchReviewsFormValues,
  UseSearchReviewsFormRegisterReturns,
} from '@/features/review/types';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import ShowProfessorDetailPresentational from '@/features/professor/components/ShowProfessorDetailPresentational/ShowProfessorDetailPresentational';
import { useAuthContext } from '@/features/auth/components/AuthProvider/AuthProvider';
import { useRecoilState } from 'recoil';
import { LoginModalState } from '@/libs/recoil/atom';

export default function ShowProfessorDetailContainer() {

  const searchParams = useSearchParams()

  const { user } = useAuthContext()
  const router = useRouter()

  const [loginModal, setLoginModal] = useRecoilState(LoginModalState)

  const {
    universities_uuid: universitiesUuid,
    professors_uuid: professorsUuid,
  } = useParams<{
    universities_uuid: string
    professors_uuid: string
  }>()
  const [currentPage, setCurrentPage] = useState(1)
  const [reviewsArray, setReviewsArray] = useState<Array<Review[]>>([])

  const [lectureId, setLectureId] = useState<number | undefined>(searchParams.get('lecture') ? Number(searchParams.get('lecture')) : undefined)

  // 大学に紐づく教授詳細を API から購読
  const {
    data: professor,
    error: useSyncProfessorError,
    isLoading: useSyncProfessorIsLoading
  } = useSyncProfessor(universitiesUuid, professorsUuid)

  const [lectureOptions, setLectureOptions] = useState<SelectOption[] | null>(null)

  useEffect(() => {
    if (!professor) return
    setLectureOptions(professor?.lectures.map((lecture) => ({ value: lecture.id, text: lecture.name })))
  }, [professor])

  // 教授に紐づくレビューサマリーを API から購読
  const {
    data: professorReviewSummary,
    error: useSyncProfessorReviewSummaryError,
    isLoading: useSyncProfessorReviewSummaryIsLoading
  } = useSyncProfessorReviewSummary(universitiesUuid, professorsUuid)

  const { register, handleSubmit } = useForm<SearchReviewsFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      lectureId: lectureId ? String(lectureId) : '',
    }
  })

  const searchReviewsFormRegisterReturns: UseSearchReviewsFormRegisterReturns = {
    lectureId: register('lectureId'),
  }

  // 教授に紐づくレビュー一覧を API から購読
  const {
    data: reviews,
    error: useSyncReviewsError,
    isLoading: useSyncReviewsIsLoading
  } = useSyncReviews(universitiesUuid, professorsUuid, 3, currentPage, lectureId)

  const handleOnSubmit: SubmitHandler<SearchReviewsFormValues> = async (values) => {
    const params = new URLSearchParams(searchParams)

    // ページネーションと実表示用の配列を初期化
    setCurrentPage(1)
    setReviewsArray([])

    // カリキュラム
    if (values.lectureId && values.lectureId !== '') {
      // クエリパラメータセット
      params.set('lecture', values.lectureId)
      // 検索処理
      setLectureId(Number(values.lectureId))
    } else if (values.lectureId === '') {
      // クエリパラメータを削除
      params.delete('lecture')
      // undefined をセット
      setLectureId(undefined)
    }

    // URL Query params 更新
    window.history.replaceState(null, '', `?${params.toString()}`)
  }

  const handleOnError: SubmitErrorHandler<SearchReviewsFormValues> = (errors) => {
    console.log(errors)
  }

  // reviewsArray (最終的にユーザーに表示する配列)
  useEffect(() => {
    if (!reviews) return
    const temp = reviewsArray.concat()
    temp[currentPage - 1] = reviews.objects.concat()
    setReviewsArray(temp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reviews])

  const handleTapPostNewReview = () => {
    if (user) {
      router.push(`/universities/${universitiesUuid}/professors/${professor?.uuid}/review/new`)
    } else {
      setLoginModal({ isOpen: true })
    }
  }

  const handleTapShowMore = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <ShowProfessorDetailPresentational
      loginModalState={[loginModal, setLoginModal]}
      professor={professor}
      professorReviewSummary={professorReviewSummary}
      reviews={reviews}
      reviewsArray={reviewsArray}
      lectureOptions={lectureOptions}
      searchReviewsFormRegisterReturns={searchReviewsFormRegisterReturns}
      handleSubmit={handleSubmit}
      handleTapPostNewReview={handleTapPostNewReview}
      handleTapShowMore={handleTapShowMore}
      handleOnSubmit={handleOnSubmit}
      handleOnError={handleOnError}
    />
  )
}
