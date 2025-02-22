'use client';

import { classNames } from '@/helpers/classNames';

import classes from './MyReviewBox.module.scss';
import { HTMLAttributes, useEffect } from 'react';
import React from 'react';
import { Details } from '@/features/review/types';
import { useReviewDetailsOptions } from '@/features/review/hooks/useReviewDetailsOptions';

const REVIEW_BOX_TEXT_WEBKIT_LINE_CLAMP = 5;

type MyReviewBoxProps = {
  uuid: string;
  rate: number;
  reviewDetails: Details;
  universityName: string;
  professorName: string;
  facultyName: string;
  lectureName: string;
  comment: string;
  reviewDate: string;
} & HTMLAttributes<HTMLDivElement>;

const MyReviewBox = ({
  uuid,
  rate,
  reviewDetails,
  universityName,
  professorName,
  facultyName,
  lectureName,
  comment,
  reviewDate,
  className,
}: MyReviewBoxProps) => {
  const [myReviewBoxTextWebkitLineClamp, setMyReviewBoxTextWebkitLineClamp] =
    React.useState(100);
  const [isReadMore, setIsReadMore] = React.useState(false);
  const [isReadMoreOpen, setIsReadMoreOpen] = React.useState(false);
  const myReviewBoxTextId = `review-box-text-${uuid}`;

  useEffect(() => {
    const myReviewBoxText = document.getElementById(
      myReviewBoxTextId,
    ) as HTMLPreElement;
    const myReviewBoxTextLineHeight = Number(
      window.getComputedStyle(myReviewBoxText).lineHeight.replace('px', ''),
    );
    const myReviewBoxTextClientHeight = myReviewBoxText.clientHeight;

    if (
      myReviewBoxTextClientHeight >
      myReviewBoxTextLineHeight * REVIEW_BOX_TEXT_WEBKIT_LINE_CLAMP
    ) {
      setMyReviewBoxTextWebkitLineClamp(REVIEW_BOX_TEXT_WEBKIT_LINE_CLAMP);
      setIsReadMore(true);
    }
  }, [myReviewBoxTextId]);

  useEffect(() => {
    if (isReadMoreOpen) {
      setMyReviewBoxTextWebkitLineClamp(100);
    } else {
      setMyReviewBoxTextWebkitLineClamp(REVIEW_BOX_TEXT_WEBKIT_LINE_CLAMP);
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
            ? classes.myReviewBoxStarRatingActiveStar
            : classes.myReviewBoxStarRatingInactiveStar
        }
      ></div>
    );
  });

  // 出席, 課題, 単位の Options を取得
  const { attendanceOptions, assignmentOptions, difficultyOptions } =
    useReviewDetailsOptions();

  return (
    <div className={classNames(classes.myReviewBox, className)}>
      <div className={classes.myReviewBoxWrap}>
        {/* レート */}
        <div className={classes.myReviewBoxRate}>
          <span className={classes.myReviewBoxRateNum}>{rate}</span>
        </div>
        <div className={classes.myReviewBoxContainer}>
          <div className={classes.myReviewBoxReview}>
            {/* レーティングアイコン */}
            <div className={classes.myReviewBoxStarRating}>{Stars}</div>

            {/* 大学名 */}
            <p className={classes.myReviewBoxUniversityFaculty}>
              {universityName} {facultyName}
            </p>

            {/* 教授名 */}
            <p className={classes.myReviewBoxTitleProfessorName}>
              {professorName}
            </p>

            {/* カリキュラム名 */}
            <p className={classes.myReviewBoxLecture}>{lectureName}</p>

            {/* コメント */}
            <p
              id={myReviewBoxTextId}
              className={classNames(
                classes.myReviewBoxText,
                'whitespace-pre-wrap',
                !comment || comment === '' ? '!mt-0' : '',
              )}
              style={{ WebkitLineClamp: myReviewBoxTextWebkitLineClamp }}
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
                      className={classes.myReviewBoxTextReadMore}
                    >
                      {isReadMoreOpen ? '閉じる' : '続きを読む'}
                    </button>
                  </>
                );
              }
            })()}
          </div>
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
            <div className={classes.myReviewBoxDetails}>
              {/* 単位 */}
              <p className={classes.myReviewBoxDetailsDifficulty}>
                単位 :{' '}
                {
                  difficultyOptions.find(
                    (difficultyOption) =>
                      difficultyOption.value === reviewDetails.difficulty,
                  )?.text
                }
              </p>
              {/* 出席 */}
              <p className={classes.myReviewBoxDetailsAttendance}>
                出席 :{' '}
                {
                  attendanceOptions.find(
                    (attendanceOption) =>
                      attendanceOption.value === reviewDetails.attendance,
                  )?.text
                }
              </p>
              {/* 課題 */}
              <p className={classes.myReviewBoxDetailsAssignment}>
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

        {/* 投稿日時 */}
        <div className={classes.myReviewBoxDate}>{reviewDate}</div>
      </div>
    </div>
  );
};

export default MyReviewBox;
