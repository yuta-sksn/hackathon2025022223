"use client"

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { PostReviewFormValues, UsePostReviewFormRegisterReturns } from '@/features/review/types'
import PostReviewFormPresentational from '@/features/review/components/PostReviewFormPresentational/PostReviewFormPresentational'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SelectOption, Tag } from '@/components/types';

import usePostReview from '@/features/review/api/usePostReview';
import useSyncProfessor from '@/features/professor/api/useSyncProfessor';
import useSyncFaculties from '@/features/faculty/api/useSyncFaculties';
import useSyncLectures from '@/features/lecture/api/useSyncLectures';
import useSyncReviewTags from '@/features/reviewTag/api/useSyncReviewTags';

import { useAuthContext } from '@/features/auth/components/AuthProvider/AuthProvider';
import { useReviewDetailsOptions } from '@/features/review/hooks/useReviewDetailsOptions';

import { toast } from 'react-toastify';

export default function PostReviewFormContainer() {
  const router = useRouter()
  const { user } = useAuthContext()

  const {
    universities_uuid: universitiesUuid,
    professors_uuid: professorsUuid,
  } = useParams<{
    universities_uuid: string
    professors_uuid: string
  }>()
  
  // 大学に紐づく教授詳細を API から購読
  const {
    data: professor,
    error: useSyncProfessorError,
    isLoading: useSyncProfessorIsLoading
  } = useSyncProfessor(universitiesUuid, professorsUuid)

  // 大学に紐づく学部一覧を API から購読
  const {
    data: faculties,
    error: useSyncFacultiesError,
    isLoading: useSyncFacultiesIsLoading
  } = useSyncFaculties(universitiesUuid)

  const [facultyOptions, setFacultyOptions] = useState<SelectOption[]>([])

  // 学部のセレクトメニュー更新
  useEffect(() => {
    if (!faculties) return

    const tempFacultyOptions = faculties?.objects.map((faculty) => ({ value: faculty.id, text: faculty.name }))
    tempFacultyOptions.push({ value: -1, text: 'その他' })

    setFacultyOptions(tempFacultyOptions)
  }, [faculties])

  // 大学に紐づくカリキュラム一覧を API から購読
  const {
    data: lectures,
    error: useSyncLecturesError,
    isLoading: useSyncLecturesIsLoading
  } = useSyncLectures(universitiesUuid)

  const [lectureOptions, setLectureOptions] = useState<SelectOption[]>([])

  // カリキュラムのセレクトメニュー更新
  useEffect(() => {
    if (!lectures) return

    const tempLectureOptions = lectures?.objects.map((lecture) => ({ value: lecture.id, text: lecture.name }))
    tempLectureOptions.push({ value: -1, text: 'その他' })

    setLectureOptions(tempLectureOptions)
  }, [lectures])

  const { register, watch, setValue, getValues, handleSubmit, formState } = useForm<PostReviewFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      facultyId: '',
      lectureId: '',
      rate: 0,
      status: '',
      comment: '',
      difficulty: '',
      assignment: '',
      attendance: '',
      tagIds: [],
    }
  })

  // タグ一覧を API から購読
  const {
    data: tags,
    error: useSyncReviewTagsError,
    isLoading: useSyncReviewTagsIsLoading
  } = useSyncReviewTags()

  const postReviewFormRegisterReturns: UsePostReviewFormRegisterReturns = {
    facultyId: register('facultyId', {
      required: '学部を選択してください。'
    }),
    facultyName: register('facultyName', {
      validate: (value) => {
        // 学部選択がその他でなければ, valid = true とする
        if (getValues('facultyId') !== '-1') return true
        return getValues('facultyId') === '-1' && getValues('facultyName') !== '' || '学部名を入力してください。'
      }
    }),
    lectureId: register('lectureId', {
      required: 'カリキュラムを選択してください。'
    }),
    lectureName: register('lectureName', {
      validate: (value) => {
        // カリキュラム選択がその他でなければ, valid = true とする
        if (getValues('lectureId') !== '-1') return true
        return getValues('lectureId') === '-1' && getValues('lectureName') !== '' || 'カリキュラム名を入力してください。'
      }
    }),
    rate: register('rate', {
      required: '評価を選択してください。'
    }),
    status: register('status', {
      required: '履修状況を選択してください。'
    }),
    comment: register('comment', {
      maxLength: {
        value: 1000,
        message: '入力文字数は最大1000文字までです。'
      }
    }),
    images: register('images'),
    difficulty: register('difficulty', {
      required: '履修状況を選択してください。'
    }),
    assignment: register('assignment', {
      required: '履修状況を選択してください。'
    }),
    attendance: register('attendance', {
      required: '履修状況を選択してください。'
    }),
    tagIds: register('tagIds'),
  }

  const notify = () => toast.info('レビューを投稿しました。', {
    icon: false,
  })

  const useHandleOnSubmit: SubmitHandler<PostReviewFormValues> = async (values) => {
    // console.log(values.facultyId)
    // console.log(values.facultyName)
    // console.log(values.lectureId)
    // console.log(values.lectureName)
    // console.log(values.rate)
    // console.log(values.status)
    // console.log(values.comment)

    // DataTransfer オブジェクトを作成することで擬似的に FileList に似せたオブジェクトを作成する
    // @TODO: 一時的にコメントアウト
    // const dt = new DataTransfer()
    // const images = values.images as File[]
    // for (let i = 0; i < images.length; i++) {
    //   dt.items.add(images[i])
    // }

    // FileList
    // console.log(dt.files)
    // console.log(values.difficulty)
    // console.log(values.difficulty)
    // console.log(values.assignment)
    // console.log(values.tagIds)

    const result = await usePostReview(
      {
        // @ts-ignore
        'Authorization': `Bearer ${user.accessToken}`
      },
      universitiesUuid,
      professorsUuid,
      values,
    )

    // 保存完了トーストを表示
    notify()

    // 教授詳細ページに遷移
    router.replace(`/universities/${universitiesUuid}/professors/${professorsUuid}`)
  }

  const handleOnError: SubmitErrorHandler<PostReviewFormValues> = (errors) => {
    console.log(errors)
  }

  // 履修状況
  const courseStatusOptions = [
    {
      value: 10,
      text: '未履修',
    },
    {
      value: 20,
      text: '履修中',
    },
    {
      value: 30,
      text: '履修済み',
    },
  ]

  // 出席, 課題, 単位の Options を取得
  const { attendanceOptions, assignmentOptions, difficultyOptions } = useReviewDetailsOptions()

  return (
    <PostReviewFormPresentational
      professorName={professor?.name as string}
      facultyOptions={facultyOptions}
      lectureOptions={lectureOptions}
      courseStatusOptions={courseStatusOptions}
      attendanceOptions={attendanceOptions}
      assignmentOptions={assignmentOptions}
      difficultyOptions={difficultyOptions}
      tags={(tags as Tag[] ?? []).sort((a, b) => b.weight - a.weight)}
      postReviewFormRegisterReturns={postReviewFormRegisterReturns}
      watch={watch}
      setValue={setValue}
      getValues={getValues}
      handleSubmit={handleSubmit}
      formState={formState}
      handleOnSubmit={useHandleOnSubmit}
      handleOnError={handleOnError}
    />
  )
}
