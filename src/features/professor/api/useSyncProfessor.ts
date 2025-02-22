import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Professor, ProfessorResponse } from '@/features/professor/types';

/**
 * 大学に紐づく教授詳細を API から購読する
 *
 * @returns {SWRResponse<Professor | null | void, FetchRequestError, boolean>}
 */
const useSyncProfessor = (universitiesUuid: string, professorUuid: string): SWRResponse<Professor | null | void, FetchRequestError, boolean> => {
  return useSWR(
    `/v1/universities/${universitiesUuid}/professors/${professorUuid}`,
    fetcher<ProfessorResponse, Professor>
  );
}

export default useSyncProfessor;