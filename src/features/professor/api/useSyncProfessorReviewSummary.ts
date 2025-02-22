import useSWR, { SWRResponse } from 'swr';
import fetcher, { FetchRequestError } from '@/utils/fetcher';
import { ProfessorReviewSummary, ProfessorReviewSummaryResponse } from '@/features/professor/types';

/**
 * 教授に紐づくレビューサマリーを API から購読する
 *
 * @returns {SWRResponse<ProfessorReviewSummary | null | void, FetchRequestError, boolean>}
 */
const useSyncProfessor = (universitiesUuid: string, professorUuid: string): SWRResponse<ProfessorReviewSummary | null | void, FetchRequestError, boolean> => {
  return useSWR(
    `/v1/universities/${universitiesUuid}/professors/${professorUuid}/review_summary`,
    fetcher<ProfessorReviewSummaryResponse, ProfessorReviewSummary>
  );
}

export default useSyncProfessor;