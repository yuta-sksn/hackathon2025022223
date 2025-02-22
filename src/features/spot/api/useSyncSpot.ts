import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Spot, SpotResponse } from '@/features/spot/types';

/**
 * ニッチスポット詳細を API から購読する
 *
 * @returns {SWRResponse<Spot | null | void, FetchRequestError, boolean>}
 */
const useSyncSpot = (
  id: number,
): SWRResponse<Spot | null | void, FetchRequestError, boolean> => {
  return useSWR(`/api/niche_spot/${id}`, fetcher<SpotResponse, Spot>);
};

export default useSyncSpot;
