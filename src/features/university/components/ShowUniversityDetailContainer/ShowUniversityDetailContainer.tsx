"use client";

import { SelectOption } from '@/components/types';
import useSyncFaculties from '@/features/faculty/api/useSyncFaculties';
import useSyncProfessors from '@/features/professor/api/useSyncProfessors';
import {
  Professor,
  SearchProfessorsFormValues,
  UseSearchProfessorsFormRegisterReturns,
} from '@/features/professor/types';
import useSyncUniversity from '@/features/university/api/useSyncUniversity';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import ShowUniversityDetailPresentational from '@/features/university/components/ShowUniversityDetailPresentational/ShowUniversityDetailPresentational';

export default function ShowUniversityDetailContainer() {

  const searchParams = useSearchParams()
  const { universities_uuid: universitiesUuid } = useParams<{ universities_uuid: string }>()
  const [currentPage, setCurrentPage] = useState(1)
  const [professorsArray, setProfessorsArray] = useState<Array<Professor[]>>([])

  const [keyword, setKeyword] = useState<string | undefined>(searchParams.get('keyword') || undefined)
  const [facultyId, setFacultyId] = useState<number | undefined>(searchParams.get('faculty') ? Number(searchParams.get('faculty')) : undefined)

  const [searchConditionsTitle, setSearchConditionsTitle] = useState<string>('')

  // 大学詳細を API から購読
  const {
    data: university,
    error: useSyncUniversityError,
    isLoading: useSyncUniversityIsLoading
  } = useSyncUniversity(universitiesUuid)

  // 大学に紐づく教授一覧を API から購読
  const {
    data: professors,
    error: useSyncProfessorsError,
    isLoading: useSyncProfessorsIsLoading
  } = useSyncProfessors(universitiesUuid, 5, currentPage, keyword, facultyId)

  useEffect(() => {
    if (!professors) return
    const temp = professorsArray.concat()
    temp[currentPage - 1] = professors.objects.concat()
    setProfessorsArray(temp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [professors])

  // 大学に紐づく学部一覧を API から購読
  const {
    data: faculties,
    error: useSyncFacultiesError,
    isLoading: useSyncFacultiesIsLoading
  } = useSyncFaculties(universitiesUuid)

  const [facultyOptions, setFacultyOptions] = useState<SelectOption[] | null>(null)

  // 学部のセレクトメニュー更新
  useEffect(() => {
    if (!faculties) return
    setFacultyOptions(faculties?.objects.map((faculty) => ({ value: faculty.id, text: faculty.name })))
  }, [faculties])

  // 検索条件テキストを更新する
  useEffect(() => {
    if (!facultyOptions) return

    let searchConditionsKeyword = ''
    let searchConditionsFaculty = ''

    // キーワード
    if (searchParams.get('keyword')) {
      searchConditionsKeyword = `キーワード - ${searchParams.get('keyword')}`
    }

    // 学部
    if (searchParams.get('faculty')) {
      const facultyName = facultyOptions.find(facultyOption => facultyOption.value == searchParams.get('faculty'))?.text
      searchConditionsFaculty = `学部 - ${facultyName}`
    }

    setSearchConditionsTitle(
      `${searchConditionsKeyword}${
        searchConditionsKeyword !== '' && searchConditionsFaculty !== '' ? ' / ' : ''
      } ${searchConditionsFaculty}`
    )
  }, [facultyOptions, searchParams])

  const { register, setValue, handleSubmit, formState } = useForm<SearchProfessorsFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      keyword: keyword || '',
      facultyId: facultyId ? String(facultyId) : '',
    }
  })

  const searchProfessorsFormRegisterReturns: UseSearchProfessorsFormRegisterReturns = {
    keyword: register('keyword'),
    facultyId: register('facultyId'),
  }

  const handleOnSubmit: SubmitHandler<SearchProfessorsFormValues> = async (values) => {
    if (!facultyOptions) return

    setCurrentPage(1)
    setProfessorsArray([])

    const params = new URLSearchParams(searchParams)

    // キーワード
    if (values.keyword && values.keyword !== '') {
      // クエリパラメータセット
      params.set('keyword', values.keyword)
      // 検索処理
      setKeyword(values.keyword)
    } else if (values.keyword === '') {
      // クエリパラメータを削除
      params.delete('keyword')
      // undefined をセット
      setKeyword(undefined)
    }

    // 学部
    if (values.facultyId && values.facultyId !== '') {
      // クエリパラメータセット
      params.set('faculty', values.facultyId)
      // 検索処理
      setFacultyId(Number(values.facultyId))
    } else if (values.facultyId === '') {
      // クエリパラメータを削除
      params.delete('faculty')
      // undefined をセット
      setFacultyId(undefined)
    }

    // URL Query params 更新
    window.history.replaceState(null, '', `?${params.toString()}`)
  }

  const handleOnError: SubmitErrorHandler<SearchProfessorsFormValues> = (errors) => {
    console.log(errors)
  }

  const handleTapShowMore = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <ShowUniversityDetailPresentational
      searchParams={searchParams}
      universitiesUuid={universitiesUuid}
      university={university}
      facultyOptions={facultyOptions}
      searchProfessorsFormRegisterReturns={searchProfessorsFormRegisterReturns}
      setValue={setValue}
      professors={professors}
      searchConditionsTitle={searchConditionsTitle}
      professorsArray={professorsArray}
      handleSubmit={handleSubmit}
      formState={formState}
      handleTapShowMore={handleTapShowMore}
      handleOnSubmit={handleOnSubmit}
      handleOnError={handleOnError}
    />
  )
}
