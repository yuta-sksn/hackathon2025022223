"use client";

import React, { MouseEventHandler } from 'react';

import classes from './ShowMyReviewsPresentational.module.scss'
import { Review, Reviews } from '@/features/review/types';
import { convertPeriodSeparateDate } from '@/utils/date';
import Button from '@/components/elements/Button/Button';
import MyReviewBox from '@/components/elements/MyReviewBox/MyReviewBox';

type ShowMyReviewsPresentationalProps = {
  myReviews?: void | Reviews | null;
  myReviewsArray: Array<Review[]>;
  handleTapShowMore: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function ShowMyReviewsPresentational({
  myReviews,
  myReviewsArray,
  handleTapShowMore,
}: ShowMyReviewsPresentationalProps) {
  return (
    <>
      <section className={classes.presentationalSectionUpper}>
        {/* マイレビュー一覧 */}
        <h2 className={classes.presentationalTitle}>
          <span>マイレビュー一覧</span><span>{myReviews?.objects.length}</span><span>件</span>
        </h2>
      </section>

      <section className={classes.presentationalSectionDowner}>
        {/* レビュー一覧 */}
        {(() => {
          return myReviewsArray.map((reviews, i) => {
            if (reviews.length === 0) {
              return <p key={i} className={classes.presentationalSectionNoReview}>まだレビューは投稿されていません。</p>
            }

            return reviews.map(
              (review) => <MyReviewBox
                key={review.uuid}
                uuid={review.uuid}
                reviewDetails={review.details}
                universityName={review.university.name}
                professorName={review.professor.name}
                rate={review.rate}
                facultyName={review.faculty.name}
                lectureName={review.lecture.name}
                comment={review.comment}
                reviewDate={convertPeriodSeparateDate(review.createdAt)}
                className="sm:mb-3 mb-2.5"
              />
            )
          })
        })()}

        {/* もっと見る */}
        {(() => {
          if (!myReviews) return <></>
          if (!myReviews?.pagination?.isLastPage) {
            // is_last_page が false の場合でも要素数が 0 の場合
            if ((myReviews as Reviews).objects.length === 0) return <></>
            // 上記以外の場合
            return <Button text="もっと見る" className="block mx-auto mb-3" onClick={handleTapShowMore} />
          }
        })()}
      </section>
    </>
  )
}
