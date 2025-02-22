import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Professors, ProfessorsResponse } from '@/features/professor/types';

/**
 * 大学に紐づく教授一覧を API から購読する
 *
 * @returns {SWRResponse<Professors | null | void, FetchRequestError, boolean>}
 */
const useSyncProfessors = (
  universitiesUuid: string,
  perPage: number = 3,
  page?: number,
  keyword?: string,
  facultyId?: number,
): SWRResponse<Professors | null | void, FetchRequestError, boolean> => {

  const queryParams = {
    per_page: String(perPage),
  } as {[key: string]: string}

  if (page) {
    queryParams.page = String(page)
  }

  if (keyword) {
    queryParams.keyword = keyword
  }

  if (facultyId) {
    queryParams.faculty_id = String(facultyId)
  }

  return useSWR(
    `/v1/universities/${universitiesUuid}/professors?${new URLSearchParams(queryParams).toString()}`,
    fetcher<ProfessorsResponse, Professors>
  );
}

export default useSyncProfessors;