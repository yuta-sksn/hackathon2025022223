import { FetchRequestError, responseToModelObject } from '@/utils/fetcher';
import { UserByResource } from '@/features/auth/types';
import { assertIsDefined } from '@/utils/assert';

/**
 * スタンプを押す
 *
 * @returns {Promise<UserByResource>}
 */
const usePostStamp = async (
  headers: {
    [key: string]: string;
  },
  spotId: number,
): Promise<UserByResource> => {
  // API Base URL を取得
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // env に定義されていなければ、ランタイムエラーを発生させる
  assertIsDefined(apiBaseUrl);

  // body 作成
  const body = {
    niche_spot_id: spotId,
  } as { [key: string]: string | number | null | undefined };

  // Fetch API でリクエストを送信
  const result = await fetch(`${apiBaseUrl}/api/stamp`, {
    mode: 'cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  })
    .then(async (res: Response) => {
      // OK 以外なら FetchRequestError Object を throw し .catch のエラーハンドリングに移行
      if (!res.ok) {
        throw {
          errObj: new Error(res.statusText),
          response: await res.json(),
        };
      }

      return res.json();
    })
    .catch((err) => {
      // FetchRequestError を catch
      const fetchError = err as FetchRequestError;
      // エラー処理 (エラーをログに出力したり、Sentry に通知する)
      console.error(fetchError.errObj);
      // 呼び出し元にエラーレスポンスをスローする
      throw fetchError;
    });

  return responseToModelObject(result);
};

export default usePostStamp;
