import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Lectures, LecturesResponse } from '@/features/lecture/types';

/**
 * 大学に紐づく学部一覧を API から購読する
 *
 * @returns {SWRResponse<Lectures | null | void, FetchRequestError, boolean>}
 */
const useSyncLectures = (universitiesUuid: string): SWRResponse<Lectures | null | void, FetchRequestError, boolean> => {
  return useSWR(
    `/v1/universities/${universitiesUuid}/lectures`,
    fetcher<LecturesResponse, Lectures>
  );
}

export default useSyncLectures;