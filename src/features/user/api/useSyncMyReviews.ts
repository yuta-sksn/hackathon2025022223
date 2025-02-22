import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Reviews, ReviewsResponse } from '@/features/review/types';

/**
 * 自分が投稿したレビュー一覧を API から購読する
 *
 * @returns {SWRResponse<Reviews | null | void, FetchRequestError, boolean>}
 */
const useSyncMyReviews = (
  accessToken: string,
): SWRResponse<Reviews | null | void, FetchRequestError, boolean> => {
  return useSWR(
    [
      `/v1/users/me/reviews`,
      'GET',
      {
        'Authorization': `Bearer ${accessToken}`
      },
    ],
    ([url, method, headers]) => fetcher<ReviewsResponse, Reviews>(url, method, headers)
  );
}

export default useSyncMyReviews;