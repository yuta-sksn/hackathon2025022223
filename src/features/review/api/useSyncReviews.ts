import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Reviews, ReviewsResponse } from '@/features/review/types';

/**
 * 教授に紐づくレビュー一覧を API から購読する
 *
 * @returns {SWRResponse<Reviews | null | void, FetchRequestError, boolean>}
 */
const useSyncReviews = (
  universitiesUuid: string,
  professorsUuid: string,
  perPage: number = 3,
  page?: number,
  lectureId?: number,
): SWRResponse<Reviews | null | void, FetchRequestError, boolean> => {

  const queryParams = {
    per_page: String(perPage),
  } as {[key: string]: string}

  if (page) {
    queryParams.page = String(page)
  }

  if (lectureId) {
    queryParams.lecture_id = String(lectureId)
  }

  return useSWR(
    `/v1/universities/${universitiesUuid}/professors/${professorsUuid}/reviews?${new URLSearchParams(queryParams).toString()}`,
    fetcher<ReviewsResponse, Reviews>
  );
}

export default useSyncReviews;