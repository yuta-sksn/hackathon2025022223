"use client";

import useSyncTopProfessors from '@/features/professor/api/useSyncTopProfessors';
import { TopProfessor } from '@/features/professor/types';
import { useEffect, useState } from 'react';
import ShowTopProfessorsPresentational from '@/features/professor/components/ShowTopProfessorsPresentational/ShowTopProfessorsPresentational';

export default function ShowTopProfessorsContainer() {

  const [currentPage, setCurrentPage] = useState(1)
  const [professorsArray, setProfessorsArray] = useState<Array<TopProfessor[]>>([])

  // 評価の高い教授一覧を API から購読
  const {
    data: professors,
    error: useSyncProfessorsError,
    isLoading: useSyncProfessorsIsLoading
  } = useSyncTopProfessors(20, currentPage)

  useEffect(() => {
    if (!professors) return
    const temp = professorsArray.concat()
    temp[currentPage - 1] = professors.objects.concat()
    setProfessorsArray(temp)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [professors])

  const handleTapShowMore = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <ShowTopProfessorsPresentational
      professors={professors}
      professorsArray={professorsArray}
      handleTapShowMore={handleTapShowMore}
    />
  )
}
