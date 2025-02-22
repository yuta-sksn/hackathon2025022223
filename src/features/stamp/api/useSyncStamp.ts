import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { Stamp, StampResponse } from '@/features/stamp/types';

/**
 * スタンプ情報を API から購読する
 *
 * @returns {SWRResponse<Stamp | null | void, FetchRequestError, boolean>}
 */
const useSyncStamp = (
  accessToken: string | null,
  spotId: number,
): SWRResponse<Stamp | null | void, FetchRequestError, boolean> => {
  const headers = {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  } as { [key: string]: string };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return useSWR(
    [`/api/stamp/${spotId}`, 'GET', headers],
    ([url, method, headers]) =>
      fetcher<StampResponse, Stamp>(url, method, headers),
  );
};

export default useSyncStamp;
