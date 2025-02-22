import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { TopProfessors, TopProfessorsResponse } from '@/features/professor/types';

/**
 * 評価の高い教授一覧を API から購読する
 *
 * @returns {SWRResponse<TopProfessors | null | void, FetchRequestError, boolean>}
 */
const useSyncTopProfessors = (
  perPage: number = 20,
  page?: number,
  keyword?: string
): SWRResponse<TopProfessors | null | void, FetchRequestError, boolean> => {

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
    `/v1/professors?${new URLSearchParams(queryParams).toString()}`,
    fetcher<TopProfessorsResponse, TopProfessors>
  );
}

export default useSyncTopProfessors;