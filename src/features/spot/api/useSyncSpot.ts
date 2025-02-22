import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Spot, SpotResponse } from '@/features/spot/types';

/**
 * ニッチスポット詳細を API から購読する
 *
 * @returns {SWRResponse<Spot | null | void, FetchRequestError, boolean>}
 */
const useSyncSpot = (
  accessToken: string | null,
  id: number,
): SWRResponse<Spot | null | void, FetchRequestError, boolean> => {
  const headers = {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  } as { [key: string]: string };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return useSWR(
    [`/api/niche_spot/${id}`, 'GET', headers],
    ([url, method, headers]) =>
      fetcher<SpotResponse, Spot>(url, method, headers),
  );
};

export default useSyncSpot;
