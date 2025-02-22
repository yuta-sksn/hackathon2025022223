import { FetchRequestError, responseToModelObject } from '@/utils/fetcher';
import { UserByResource } from '@/features/auth/types';
import { assertIsDefined } from '@/utils/assert';
import { PatchUserRequest } from '@/features/user/types';

/**
 * ユーザー情報を更新する
 *
 * @returns {Promise<UserByResource>}
 */
const usePatchUser = async (
  headers: {
    [key: string]: string;
  },
  patchUserRequestParams: PatchUserRequest,
): Promise<UserByResource> => {
  // API Base URL を取得
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // env に定義されていなければ、ランタイムエラーを発生させる
  assertIsDefined(apiBaseUrl);
  // Fetch API でリクエストを送信
  const result = await fetch(`${apiBaseUrl}/v1/users/me`, {
    mode: 'cors',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({
      last_education_university_name: patchUserRequestParams.lastEducationUniversityName,
      last_education_faculty_name: patchUserRequestParams.lastEducationFacultyName,
      last_education_start_at: patchUserRequestParams.lastEducationStartAt,
      last_education_end_at: patchUserRequestParams.lastEducationEndAt,
    }),
  })
    .then(async (res: Response) => {
      // OK 以外なら FetchRequestError Object を throw し .catch のエラーハンドリングに移行
      if (!res.ok) {
        throw {
          errObj: new Error(res.statusText),
          response: await res.json()
        }
      }

      return res.json()
    })
    .catch((err) => {
      // FetchRequestError を catch
      const fetchError = err as FetchRequestError
      // エラー処理 (エラーをログに出力したり、Sentry に通知する)
      console.error(fetchError.errObj);
      // 呼び出し元にエラーレスポンスをスローする
      throw fetchError;
    });

  return responseToModelObject(result)
}

export default usePatchUser;