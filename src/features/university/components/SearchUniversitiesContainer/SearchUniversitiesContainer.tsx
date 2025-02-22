"use client"

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import useSyncUniversities from '@/features/university/api/useSyncUniversities'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchUniversitiesValues, University, UseSearchUniversitiesRegisterReturns } from '@/features/university/types'
import SearchUniversitiesPresentational from '@/features/university/components/SearchUniversitiesPresentational/SearchUniversitiesPresentational'
import { TopProfessor } from '@/features/professor/types'
import useSyncTopProfessors from '@/features/professor/api/useSyncTopProfessors'

type SearchUniversitiesContainerProps = {
  isRouterPush?: boolean;
}

export default function SearchUniversitiesContainer({
  isRouterPush = false
}: SearchUniversitiesContainerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isSearched, setIsSearched] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)

  const [currentUniversitiesPage, setCurrentUniversitiesPage] = useState(1)
  const [currentProfessorsPage, setCurrentProfessorsPage] = useState(1)
  const [universitiesArray, setUniversitiesArray] = useState<Array<University[]>>([])
  const [professorsArray, setProfessorsArray] = useState<Array<TopProfessor[]>>([])
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '')

  useEffect(() => {
    // 初めから大学一覧全てを表示する場合は以下のガード節をコメントアウト
    if (keyword === '') return
    setIsSearched(true)
  }, [keyword])

  // 大学一覧を API から購読
  const {
    data: universities,
    error: useSyncUniversitiesError,
    isLoading: useSyncUniversitiesIsLoading,
  } = useSyncUniversities(3, currentUniversitiesPage, keyword)

  // 教授一覧を API から購読
  const {
    data: professors,
    error: useSyncProfessorsError,
    isLoading: useSyncProfessorsIsLoading
  } = useSyncTopProfessors(3, currentProfessorsPage, keyword)

  // 大害の Object に関する useEffect
  useEffect(() => {
    if (!universities) return
    const temp = universitiesArray.concat()
    temp[currentUniversitiesPage - 1] = universities.objects.concat()
    setUniversitiesArray(temp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [universities])

  // 教授の Object に関する useEffect
  useEffect(() => {
    if (!professors) return
    const temp = professorsArray.concat()
    temp[currentProfessorsPage - 1] = professors.objects.concat()
    setProfessorsArray(temp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [professors])

  const { register, handleSubmit, formState } = useForm<SearchUniversitiesValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      keyword,
    }
  })

  const searchUniversitiesRegisterReturns: UseSearchUniversitiesRegisterReturns = {
    keyword: register('keyword'),
  }

  const handleOnSubmit: SubmitHandler<SearchUniversitiesValues> = async (values) => {

    setCurrentUniversitiesPage(1)
    setUniversitiesArray([])

    setKeyword(values.keyword)
    setIsSubmit(true)

    if (isRouterPush) {
      router.push(values.keyword === '' ?
        '/universities' : `/universities?keyword=${values.keyword}`)
    } else {
      router.replace(values.keyword === '' ?
        '/universities' : `/universities?keyword=${values.keyword}`)
    }
  }

  const handleOnError: SubmitErrorHandler<SearchUniversitiesValues> = (errors) => {
    console.log(errors)
  }

  const handleTapShowMoreUniversities = () => {
    setCurrentUniversitiesPage(currentUniversitiesPage + 1)
  }

  const handleTapShowMoreProfessors = () => {
    setCurrentProfessorsPage(currentProfessorsPage + 1)
  }

  return (
    <SearchUniversitiesPresentational
      isRouterPush={isRouterPush}
      universities={universities}
      universitiesArray={universitiesArray}
      professors={professors}
      professorsArray={professorsArray}
      isSearched={isSearched}
      isSubmit={isSubmit}
      searchUniversitiesRegisterReturns={searchUniversitiesRegisterReturns}
      handleSubmit={handleSubmit}
      handleOnSubmit={handleOnSubmit}
      handleOnError={handleOnError}
      handleTapShowMoreUniversities={handleTapShowMoreUniversities}
      handleTapShowMoreProfessors={handleTapShowMoreProfessors}
    />
  )
}
