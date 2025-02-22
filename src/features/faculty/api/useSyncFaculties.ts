import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Faculties, FacultiesResponse } from '@/features/faculty/types';

/**
 * 大学に紐づく学部一覧を API から購読する
 *
 * @returns {SWRResponse<Faculties | null | void, FetchRequestError, boolean>}
 */
const useSyncFaculties = (universitiesUuid: string): SWRResponse<Faculties | null | void, FetchRequestError, boolean> => {
  return useSWR(
    `/v1/universities/${universitiesUuid}/faculties`,
    fetcher<FacultiesResponse, Faculties>
  );
}

export default useSyncFaculties;