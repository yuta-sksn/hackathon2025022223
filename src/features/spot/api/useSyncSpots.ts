import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Spots, SpotsResponse } from '@/features/spot/types';

/**
 * ニッチスポット一覧を API から購読する
 *
 * @returns {SWRResponse<Spots | null | void, FetchRequestError, boolean>}
 */
const useSyncSpots = (
  accessToken: string | null,
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

  const headers = {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  } as { [key: string]: string };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return useSWR(
    [
      `/api/niche_spot?${new URLSearchParams(queryParams).toString()}`,
      'GET',
      headers,
    ],
    ([url, method, headers]) =>
      fetcher<SpotsResponse, Spots>(url, method, headers),
  );
};

export default useSyncSpots;
