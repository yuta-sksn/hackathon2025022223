import { classNames } from '@/helpers/classNames';

import colors from '@/styles/colors.module.scss';
import classes from './ProfessorLink.module.scss';
import { LinkHTMLAttributes, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { University } from '@/features/university/types';
import { ReviewMeanScore } from '@/features/professor/types';

type ProfessorLinkProps = {
  name: string;
  imageUrl: string | null;
  lectures: string;
  faculties: string;
  reviewMeanScore: number | ReviewMeanScore | null;
  reviewQuantity: number;
  university?: University;
} & LinkHTMLAttributes<HTMLLinkElement>;

const ProfessorLink = ({
  name,
  imageUrl,
  lectures,
  faculties,
  reviewMeanScore,
  reviewQuantity,
  university,
  href,
  className,
}: ProfessorLinkProps) => {
  const [meanScore, setMeanScore] = useState<number>(0.0);

  useEffect(() => {
    if (!reviewMeanScore) return;
    if (typeof reviewMeanScore === 'number') {
      setMeanScore(reviewMeanScore);
    } else if (
      reviewMeanScore !== null &&
      typeof reviewMeanScore === 'object' &&
      typeof reviewMeanScore.meanScore === 'number'
    ) {
      setMeanScore(reviewMeanScore.meanScore);
    }
  }, [reviewMeanScore]);

  const isFloat = (value: any): boolean => {
    return (
      typeof value === 'number' &&
      !Number.isInteger(value) &&
      !Number.isNaN(value) &&
      Number.isFinite(value)
    );
  };

  const decimalPart = (num: number, decDigits: number): number => {
    const decPart = num - (num >= 0 ? Math.floor(num) : Math.ceil(num));
    return Number(decPart.toFixed(decDigits));
  };

  const Stars = Array.from({ length: 5 }, (_, i) => {
    const isIncompleteStar =
      isFloat(meanScore) && i + 1 - meanScore > 0 && i + 1 - meanScore < 1;
    const scoreDecimal = decimalPart(meanScore, 1) * 100;
    const incompleteStarStyle = {
      background: `linear-gradient(90deg, ${colors.subColor} 0%, ${colors.subColor} ${scoreDecimal}%, #fff ${scoreDecimal}%, #fff 100%)`,
    };

    return (
      <div
        key={i}
        className={
          isIncompleteStar
            ? classes.professorLinkStarRatingIncompleteStar
            : Math.floor(meanScore) >= i + 1
              ? classes.professorLinkStarRatingActiveStar
              : classes.professorLinkStarRatingInactiveStar
        }
        style={isIncompleteStar ? incompleteStarStyle : {}}
      ></div>
    );
  });

  return (
    <Link
      href={href as string}
      className={classNames(classes.professorLink, className)}
    >
      {/* 教授名 */}
      <p className={classes.professorName}>
        {(() => {
          if (!university) return;
          return (
            <>
              <span className={classes.universityName}>{university.name}</span>
              <br />
            </>
          );
        })()}
        <span>{name}</span>
      </p>

      {/* 教授情報 */}
      <div className={classes.professorLinkBox}>
        {/* 教師の画像 */}
        <div className={classes.professorLinkBoxImage}>
          <Image
            src={imageUrl || '/images/icons/no_image.png'}
            width={96}
            height={96}
            alt={name}
          />
        </div>

        {/* スコア等 */}
        <div className={classes.professorLinkBoxScore}>
          <p
            className={
              isFloat(meanScore)
                ? classes.professorMeanScoreDecimalNum
                : classes.professorMeanScore
            }
          >
            <span>
              {(() =>
                meanScore == 0 || meanScore === null ? '-' : meanScore)()}
            </span>
          </p>
          {Stars}
        </div>

        {/* カリキュラム 学部 */}
        <p className={classes.professorFaculties}>
          {lectures} {faculties}
        </p>

        {/* 口コミ */}
        <div className={classes.professorLinkBoxReviewNum}>
          <Image
            src={'/images/icons/review.png'}
            width={25}
            height={23}
            alt={name}
          />
          <span>口コミ {reviewQuantity}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProfessorLink;
