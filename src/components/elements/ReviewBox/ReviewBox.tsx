'use client';

import { classNames } from '@/helpers/classNames';

import classes from './ReviewBox.module.scss';
import { HTMLAttributes, useEffect } from 'react';
import React from 'react';
import { Details } from '@/features/review/types';
import { useReviewDetailsOptions } from '@/features/review/hooks/useReviewDetailsOptions';

const REVIEW_BOX_TEXT_WEBKIT_LINE_CLAMP = 5;

type ReviewBoxProps = {
  uuid: string;
  rate: number;
  reviewDetails: Details;
  professorName?: string;
  curriculum: string;
  comment: string;
  reviewDate: string;
} & HTMLAttributes<HTMLDivElement>;

const ReviewBox = ({
  uuid,
  rate,
  reviewDetails,
  professorName,
  curriculum,
  comment,
  reviewDate,
  className,
}: ReviewBoxProps) => {
  const [reviewBoxTextWebkitLineClamp, setReviewBoxTextWebkitLineClamp] =
    React.useState(100);
  const [isReadMore, setIsReadMore] = React.useState(false);
  const [isReadMoreOpen, setIsReadMoreOpen] = React.useState(false);
  const reviewBoxTextId = `review-box-text-${uuid}`;

  useEffect(() => {
    const reviewBoxText = document.getElementById(
      reviewBoxTextId,
    ) as HTMLPreElement;
    const reviewBoxTextLineHeight = Number(
      window.getComputedStyle(reviewBoxText).lineHeight.replace('px', ''),
    );
    const reviewBoxTextClientHeight = reviewBoxText.clientHeight;

    if (
      reviewBoxTextClientHeight >
      reviewBoxTextLineHeight * REVIEW_BOX_TEXT_WEBKIT_LINE_CLAMP
    ) {
      setReviewBoxTextWebkitLineClamp(REVIEW_BOX_TEXT_WEBKIT_LINE_CLAMP);
      setIsReadMore(true);
    }
  }, [reviewBoxTextId]);

  useEffect(() => {
    if (isReadMoreOpen) {
      setReviewBoxTextWebkitLineClamp(100);
    } else {
      setReviewBoxTextWebkitLineClamp(REVIEW_BOX_TEXT_WEBKIT_LINE_CLAMP);
    }
  }, [isReadMoreOpen]);

  const handleTapReadMore = () => {
    setIsReadMoreOpen(!isReadMoreOpen);
  };

  const Stars = Array.from({ length: 5 }, (_, i) => {
    return (
      <div
        key={i}
        className={
          rate >= i + 1
            ? classes.reviewBoxStarRatingActiveStar
            : classes.reviewBoxStarRatingInactiveStar
        }
      ></div>
    );
  });

  // 出席, 課題, 単位の Options を取得
  const { attendanceOptions, assignmentOptions, difficultyOptions } =
    useReviewDetailsOptions();

  return (
    <div className={classNames(classes.reviewBox, className)}>
      <div className={classes.reviewBoxWrap}>
        {/* レート */}
        <div className={classes.reviewBoxRate}>
          <span className={classes.reviewBoxRateNum}>{rate}</span>
        </div>
        <div className={classes.reviewBoxContainer}>
          <div className={classes.reviewBoxReview}>
            {/* 教授名 */}
            {(() => {
              if (!professorName || professorName === '') return;
              return (
                <p className={classes.reviewBoxTitleProfessorName}>
                  {professorName}
                </p>
              );
            })()}

            {/* レーティングアイコン */}
            <div className={classes.reviewBoxStarRating}>{Stars}</div>

            {/* カリキュラム名 */}
            <p className={classes.reviewBoxTitle}>{curriculum}</p>

            {/* コメント */}
            <p
              id={reviewBoxTextId}
              className={classNames(
                classes.reviewBoxText,
                'whitespace-pre-wrap',
              )}
              style={{ WebkitLineClamp: reviewBoxTextWebkitLineClamp }}
            >
              {comment}
            </p>

            {/* 続きを読む */}
            {(() => {
              if (isReadMore) {
                return (
                  <>
                    <button
                      onClick={handleTapReadMore}
                      className={classes.reviewBoxTextReadMore}
                    >
                      {isReadMoreOpen ? '閉じる' : '続きを読む'}
                    </button>
                  </>
                );
              }
            })()}
          </div>

          {/* 投稿日時 */}
          <div className={classes.reviewBoxDate}>{reviewDate}</div>
        </div>

        {/* 単位 出席 課題 */}
        {(() => {
          if (
            !reviewDetails.difficulty &&
            !reviewDetails.assignment &&
            !reviewDetails.attendance
          )
            return;
          return (
            <div className={classes.reviewBoxDetails}>
              {/* 単位 */}
              <p className={classes.reviewBoxDetailsDifficulty}>
                単位 :{' '}
                {
                  difficultyOptions.find(
                    (difficultyOption) =>
                      difficultyOption.value === reviewDetails.difficulty,
                  )?.text
                }
              </p>
              {/* 出席 */}
              <p className={classes.reviewBoxDetailsAttendance}>
                出席 :{' '}
                {
                  attendanceOptions.find(
                    (attendanceOption) =>
                      attendanceOption.value === reviewDetails.attendance,
                  )?.text
                }
              </p>
              {/* 課題 */}
              <p className={classes.reviewBoxDetailsAssignment}>
                課題 :{' '}
                {
                  assignmentOptions.find(
                    (assignmentOption) =>
                      assignmentOption.value === reviewDetails.assignment,
                  )?.text
                }
              </p>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default ReviewBox;
