'use client';

import Button from '@/components/elements/Button/Button';
import ButtonLink from '@/components/elements/ButtonLink/ButtonLink';
import ProfessorName from '@/components/elements/ProfessorName/ProfessorName';
import ReviewBox from '@/components/elements/ReviewBox/ReviewBox';
import ReviewSummary from '@/components/elements/ReviewSummary/ReviewSummary';
import SelectField from '@/components/elements/SelectField/SelectField';
import { SelectOption } from '@/components/types';
import {
  Review,
  Reviews,
  SearchReviewsFormValues,
  UseSearchReviewsFormRegisterReturns,
} from '@/features/review/types';
import { convertPeriodSeparateDate } from '@/utils/date';
import { MouseEventHandler } from 'react';
import { Professor, ProfessorReviewSummary } from '@/features/professor/types';

import classes from './ShowProfessorDetailPresentational.module.scss';
import BaseModal from '@/components/elements/BaseModal/BaseModal';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ModalStateProps } from '@/libs/recoil/types';
import { SetterOrUpdater } from 'recoil';
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';

type ShowProfessorDetailPresentationalProps = {
  professor?: void | Professor | null;
  professorReviewSummary?: void | ProfessorReviewSummary | null;
  reviews?: void | Reviews | null;
  reviewsArray: Array<Review[]>;
  lectureOptions: SelectOption[] | null;
  searchReviewsFormRegisterReturns: UseSearchReviewsFormRegisterReturns;
  loginModalState: [ModalStateProps, SetterOrUpdater<ModalStateProps>];
  handleSubmit: UseFormHandleSubmit<SearchReviewsFormValues, undefined>;
  handleOnSubmit: SubmitHandler<SearchReviewsFormValues>;
  handleOnError: SubmitErrorHandler<SearchReviewsFormValues>;
  handleTapPostNewReview: MouseEventHandler<HTMLButtonElement> | undefined;
  handleTapShowMore: MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function ShowProfessorDetailPresentational({
  professor,
  professorReviewSummary,
  reviews,
  reviewsArray,
  lectureOptions,
  searchReviewsFormRegisterReturns,
  loginModalState,
  handleSubmit,
  handleOnSubmit,
  handleOnError,
  handleTapPostNewReview,
  handleTapShowMore,
}: ShowProfessorDetailPresentationalProps) {
  return (
    <>
      <section className={classes.presentationalSectionSummary}>
        <div className={classes.presentationalSectionSummaryBox}>
          {/* 教授名 */}
          <ProfessorName
            name={professor?.name}
            faculties={professor?.faculties
              .map((faculty) => faculty.name)
              .join(' / ')}
            className="mb-4"
          />

          {/* レビューサマリー */}
          <ReviewSummary
            className="mb-6"
            profileImageUrl={professor?.imageUrl}
            professorReviewSummary={
              (professorReviewSummary || {}) as ProfessorReviewSummary
            }
          />

          {/* レビューを投稿する */}
          <Button
            text="レビューを投稿する"
            className="mx-auto block"
            onClick={handleTapPostNewReview}
          />
        </div>
      </section>

      <section className={classes.presentationalSectionReviews}>
        <div className={classes.presentationalSectionReviewsBox}>
          <h3 className={classes.presentationalSectionReviewsTitle}>
            レビュー一覧
          </h3>

          {/* カリキュラム選択 */}
          {(() => {
            if (reviews?.objects.length === 0 || !lectureOptions) {
              return <></>;
            }

            return (
              <form onChange={handleSubmit(handleOnSubmit, handleOnError)}>
                <SelectField
                  options={lectureOptions || []}
                  placeholder="カリキュラムを選択してください"
                  register={searchReviewsFormRegisterReturns.lectureId}
                  className="mb-9 sm:mb-10 sm:!w-2/4"
                />
              </form>
            );
          })()}

          {/* レビュー一覧 */}
          {(() => {
            return reviewsArray.map((reviews, i) => {
              if (reviews.length === 0) {
                return (
                  <p
                    key={i}
                    className={classes.presentationalSectionReviewsNoReview}
                  >
                    まだレビューは投稿されていません。
                  </p>
                );
              }

              return reviews.map((review) => (
                <ReviewBox
                  key={review.uuid}
                  uuid={review.uuid}
                  rate={review.rate}
                  reviewDetails={review.details}
                  curriculum={review.lecture.name}
                  comment={review.comment}
                  reviewDate={convertPeriodSeparateDate(review.createdAt)}
                  className="mb-2.5 sm:mb-3"
                />
              ));
            });
          })()}

          {/* もっと見る */}
          {(() => {
            if (!reviews) return <></>;
            if (!reviews?.pagination?.isLastPage) {
              // is_last_page が false の場合でも要素数が 0 の場合
              if ((reviews as Reviews).objects.length === 0) return <></>;
              // 上記以外の場合
              return (
                <Button
                  text="もっと見る"
                  className="mx-auto mb-3 block"
                  onClick={handleTapShowMore}
                />
              );
            }
          })()}
        </div>
      </section>

      <BaseModal modalState={loginModalState} modalTitle="ログインが必要です">
        <div className="mt-8">
          <p className={`${classes.loginModalAnnotation}`}>
            ジモニッチの全ての機能をご利用いただくには
            <br />
            ログインが必要になります。
          </p>
          <ButtonLink
            text="ログイン"
            href={`/account/login?from=${usePathname()}`}
            className="mx-auto mb-8 block"
          />
          <p className={`${classes.loginModalPleaseRegister}`}>
            アカウントをお持ちでない方は
            <br />
            <Link
              href={`/account/register?from=${usePathname()}`}
              className="underline"
            >
              アカウント作成
            </Link>
            を行ってください。
          </p>
        </div>
      </BaseModal>
    </>
  );
}
