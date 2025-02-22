import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Universities, UniversitiesResponse } from '@/features/university/types';

/**
 * 大学一覧を API から購読する
 *
 * @returns {SWRResponse<Universities | null | void, FetchRequestError, boolean>}
 */
const useSyncUniversities = (
  perPage: number = 3,
  page?: number,
  keyword?: string
): SWRResponse<Universities | null | void, FetchRequestError, boolean> => {

  const queryParams = {
    per_page: String(perPage),
  } as {[key: string]: string}

  if (page) {
    queryParams.page = String(page)
  }

  if (keyword) {
    queryParams.keyword = keyword
  }

  return useSWR(
    `/v1/universities?${new URLSearchParams(queryParams).toString()}`,
    fetcher<UniversitiesResponse, Universities>
  );
}

export default useSyncUniversities;