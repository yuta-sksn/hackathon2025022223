import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { ReviewTags, ReviewTagsResponse } from '../types';


/**
 * タグ一覧を API から購読する
 *
 * @returns {SWRResponse<ReviewTags | null | void, FetchRequestError, boolean>}
 */
const useSyncReviewTags = (): SWRResponse<ReviewTags | null | void, FetchRequestError, boolean> => {
  return useSWR(
    `/v1/review_tags`,
    fetcher<ReviewTagsResponse, ReviewTags>
  );
}

export default useSyncReviewTags;