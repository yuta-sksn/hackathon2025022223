import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Spots, SpotsResponse } from '@/features/spot/types';

/**
 * ニッチスポット一覧を API から購読する
 *
 * @returns {SWRResponse<Universities | null | void, FetchRequestError, boolean>}
 */
const useSyncSpots = (
  perPage: number = 3,
  page?: number,
  keyword?: string,
): SWRResponse<Spots | null | void, FetchRequestError, boolean> => {
  const queryParams = {
    per_page: String(perPage),
  } as { [key: string]: string };

  if (page) {
    queryParams.page = String(page);
  }

  if (keyword) {
    queryParams.keyword = keyword;
  }

  return useSWR(
    `/api/niche_spot?${new URLSearchParams(queryParams).toString()}`,
    fetcher<SpotsResponse, Spots>,
  );
};

export default useSyncSpots;
