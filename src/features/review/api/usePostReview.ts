import { FetchRequestError, responseToModelObject } from '@/utils/fetcher';
import { UserByResource } from '@/features/auth/types';
import { assertIsDefined } from '@/utils/assert';
import { PostReviewFormValues, PostReviewRequest } from '@/features/review/types';

/**
 * レビューを投稿する
 *
 * @returns {Promise<UserByResource>}
 */
const usePatchUser = async (
  headers: {
    [key: string]: string;
  },
  universitiesUuid: string,
  professorsUuid: string,
  postReviewRequestParams: PostReviewFormValues,
): Promise<UserByResource> => {
  // API Base URL を取得
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  // env に定義されていなければ、ランタイムエラーを発生させる
  assertIsDefined(apiBaseUrl);

  // body 作成
  const body = {
    rate: postReviewRequestParams.rate,
    status: Number(postReviewRequestParams.status),
    attendance: postReviewRequestParams.attendance,
    assignment: postReviewRequestParams.assignment,
    difficulty: postReviewRequestParams.difficulty,
  } as { [key: string]: string | number | null | undefined; }

  // 学部
  if (Number(postReviewRequestParams.facultyId) === -1) {
    body['faculty_name'] = postReviewRequestParams.facultyName
  } else {
    body['faculty_id'] = Number(postReviewRequestParams.facultyId)
  }

  // カリキュラム
  if (Number(postReviewRequestParams.lectureId) === -1) {
    body['lecture_name'] = postReviewRequestParams.lectureName
  } else {
    body['lecture_id'] = Number(postReviewRequestParams.lectureId)
  }

  // コメント
  if (postReviewRequestParams.comment && postReviewRequestParams.comment !== '') {
    body['comment'] = postReviewRequestParams.comment
  }

  // タグ
  if (postReviewRequestParams.tagIds.length > 0) {
    body['tag_ids'] = postReviewRequestParams.tagIds.join(',')
  }

  // Fetch API でリクエストを送信
  const result = await fetch(`${apiBaseUrl}/v1/universities/${universitiesUuid}/professors/${professorsUuid}/reviews`, {
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