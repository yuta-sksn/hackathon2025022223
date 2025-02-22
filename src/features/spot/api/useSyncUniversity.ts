import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { spot, spotResponse } from '@/features/spot/types';

/**
 * スポット詳細を API から購読する
 *
 * @returns {SWRResponse<spot | null | void, FetchRequestError, boolean>}
 */
const useSyncspot = (
  uuid: string,
): SWRResponse<spot | null | void, FetchRequestError, boolean> => {
  return useSWR(`/v1/Spots/${uuid}`, fetcher<spotResponse, spot>);
};

export default useSyncspot;
