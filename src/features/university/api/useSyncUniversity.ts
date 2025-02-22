import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { University, UniversityResponse } from '@/features/university/types';

/**
 * 大学詳細を API から購読する
 *
 * @returns {SWRResponse<University | null | void, FetchRequestError, boolean>}
 */
const useSyncUniversity = (uuid: string): SWRResponse<University | null | void, FetchRequestError, boolean> => {
  return useSWR(
    `/v1/universities/${uuid}`,
    fetcher<UniversityResponse, University>
  );
}

export default useSyncUniversity;