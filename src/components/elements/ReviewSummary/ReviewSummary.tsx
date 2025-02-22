import { classNames } from '@/helpers/classNames';

import classes from './ReviewSummary.module.scss';
import { CSSProperties, HTMLAttributes, useEffect, useState } from 'react';
import { ProfessorReviewSummary } from '@/features/professor/types';

type ReviewSummaryProps = {
  profileImageUrl?: string | null;
  professorReviewSummary: ProfessorReviewSummary;
} & HTMLAttributes<HTMLDivElement>;

interface Distribution {
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
}

interface DistributionPercentage {
  rate: number;
  rateNum: number;
  percentage: number;
}

const ReviewSummary = ({
  profileImageUrl,
  professorReviewSummary,
  className,
}: ReviewSummaryProps) => {
  const [distribution, setDistribution] = useState<Distribution | null>(null);
  const [distributionPercentages, setDistributionPercentages] = useState<
    DistributionPercentage[]
  >(
    Array.from({ length: 5 }, (_, i) => ({
      rate: 5 - i,
      rateNum: 0,
      percentage: 0,
    })),
  );
  const [isShowReviewSummary, setIsShowReviewSummary] =
    useState<boolean>(false);

  useEffect(() => {
    if (!professorReviewSummary.data) return;

    const reviewSummaryDistribution =
      professorReviewSummary.data.attributes.distribution;

    setDistribution({
      rate1: reviewSummaryDistribution.rate1 ?? 0,
      rate2: reviewSummaryDistribution.rate2 ?? 0,
      rate3: reviewSummaryDistribution.rate3 ?? 0,
      rate4: reviewSummaryDistribution.rate4 ?? 0,
      rate5: reviewSummaryDistribution.rate5 ?? 0,
    });
  }, [professorReviewSummary]);

  useEffect(() => {
    if (!distribution) return;

    const totalRatings =
      distribution.rate1 +
      distribution.rate2 +
      distribution.rate3 +
      distribution.rate4 +
      distribution.rate5;

    setTimeout(() => {
      setDistributionPercentages(
        Array.from({ length: 5 }, (_, i) => ({
          rate: 5 - i,
          rateNum: distribution[`rate${5 - i}` as keyof Distribution],
          percentage:
            (distribution[`rate${5 - i}` as keyof Distribution] /
              totalRatings) *
            100,
        })),
      );
      setIsShowReviewSummary(true);
    }, 750);
  }, [distribution]);

  const RatingBars = distributionPercentages?.map(
    (dp: DistributionPercentage) => {
      return (
        <div
          key={dp.rate}
          className={classNames(classes.reviewSummaryRatingBarContainer)}
          data-rate-num={dp.rateNum}
        >
          <div
            className={classNames(classes.reviewSummaryRatingBar)}
            style={{ width: `calc(${dp.percentage}% - 8px)` }}
            data-rate={dp.rate}
          />
        </div>
      );
    },
  );

  const profileBgImageStyle: CSSProperties = {
    backgroundImage: `url(${profileImageUrl || '/images/icons/no_image.png'})`,
  };

  return (
    <div className={classNames(classes.reviewSummary, className)}>
      <div
        className={classNames(
          classes.reviewSummaryWrap,
          isShowReviewSummary ? classes.isShow : '',
        )}
      >
        {/* 教授の画像と平均スコア */}
        <div className={classNames(classes.reviewSummaryProfileBox)}>
          {/* プロフィール画像 */}
          <div
            className={classNames(classes.reviewSummaryProfileImage)}
            style={profileBgImageStyle}
          />
          {/* 平均スコア */}
          <p className={classNames(classes.reviewSummaryProfileMean)}>
            {professorReviewSummary.data?.attributes.mean || '-'}
          </p>
        </div>

        {/* レビュースコアグラフ */}
        <div className={classNames(classes.reviewSummaryRatingBox)}>
          {RatingBars}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
