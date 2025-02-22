'use client';

import ProfessorLink from '@/components/elements/ProfessorLink/ProfessorLink';
import SelectField from '@/components/elements/SelectField/SelectField';
import { SelectOption } from '@/components/types';
import {
  Professor,
  Professors,
  SearchProfessorsFormValues,
  UseSearchProfessorsFormRegisterReturns,
} from '@/features/professor/types';
import { spot } from '@/features/spot/types';
import { CSSProperties, MouseEventHandler, useState } from 'react';

import classes from './ShowspotDetailPresentational.module.scss';
import SubmitField from '@/components/elements/SubmitField/SubmitField';
import {
  FormState,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form';
import Link from 'next/link';
import InputField from '@/components/elements/InputField/InputField';
import { ReadonlyURLSearchParams } from 'next/navigation';

type ShowspotDetailPresentationalProps = {
  searchParams: ReadonlyURLSearchParams;
  SpotsUuid: string;
  spot?: void | spot | null;
  facultyOptions: SelectOption[] | null;
  searchProfessorsFormRegisterReturns: UseSearchProfessorsFormRegisterReturns;
  setValue: UseFormSetValue<SearchProfessorsFormValues>;
  professors?: void | Professors | null;
  searchConditionsTitle: string;
  professorsArray: Array<Professor[]>;
  handleSubmit: UseFormHandleSubmit<SearchProfessorsFormValues, undefined>;
  formState: FormState<SearchProfessorsFormValues>;
  handleTapShowMore: MouseEventHandler<HTMLButtonElement> | undefined;
  handleOnSubmit: SubmitHandler<SearchProfessorsFormValues>;
  handleOnError: SubmitErrorHandler<SearchProfessorsFormValues>;
};

export default function ShowspotDetailPresentational({
  searchParams,
  SpotsUuid,
  spot,
  facultyOptions,
  searchProfessorsFormRegisterReturns,
  setValue,
  professorsArray,
  professors,
  searchConditionsTitle,
  handleSubmit,
  formState,
  handleTapShowMore,
  handleOnSubmit,
  handleOnError,
}: ShowspotDetailPresentationalProps) {
  const [isNarrowDownOpen, setIsNarrowDownOpen] = useState<boolean>(
    // !!searchParams.get('keyword') || !!searchParams.get('faculty')
    true,
  );

  const mvBgImageStyle: CSSProperties = {
    backgroundImage: `url(${spot?.bannerImageUrl || ''})`,
    // バナー画像が返却された際は背景を透過, それ以外は背景をグレーに
    backgroundColor:
      !spot?.bannerImageUrl || spot?.bannerImageUrl === ''
        ? '#aaa'
        : 'rgba(#fff, 0)',
  };

  const thumbnailBgImageStyle: CSSProperties = {
    backgroundImage: `url(${spot?.thumbnailImageUrl || ''})`,
    // サムネイル画像が返却された際は背景を透過, それ以外は背景をグレーに
    backgroundColor:
      !spot?.thumbnailImageUrl || spot?.thumbnailImageUrl === ''
        ? '#aaa'
        : 'rgba(#fff, 0)',
  };

  return (
    <>
      {/* スポットのメインビジュアル */}
      <section className={classes.presentationalSectionMainVisual}>
        <div
          className={classes.presentationalSectionMainVisualBgImageBlur}
          style={mvBgImageStyle}
        />
        <div
          className={classes.presentationalSectionMainVisualBgImage}
          style={mvBgImageStyle}
        />
        {/* スポット名帯 */}
        <div className={classes.presentationalSectionMainVisualBandContainer}>
          <h2 className={classes.presentationalSectionMainVisualBand}>
            {(() => {
              if (!spot) return;
              return (
                <>
                  {/* スポットアイコン */}
                  <span style={thumbnailBgImageStyle} />
                  <span>
                    {spot.name}
                    <br />
                    <span>{spot.address}</span>
                  </span>
                </>
              );
            })()}
          </h2>
        </div>
      </section>

      {/* 教授一覧・スポット名 (住所) & 検索条件エリア */}
      <section className={classes.presentationalSectionUpper}>
        <div className={classes.presentationalSectionUpperBox}>
          {/* 教授一覧・スポット名 (住所) */}
          <h2 className={classes.presentationalTitle}>
            {(() => {
              if (!spot) return;
              return (
                <>
                  <span>教授一覧</span>
                  <span>
                    {spot.name}
                    <br />
                    <span>{spot.address}</span>
                  </span>
                </>
              );
            })()}
          </h2>

          {/* 検索条件 */}
          <div className={classes.presentationalSearchConditions}>
            <p className={classes.presentationalSearchConditionsTitle}>
              検索条件 : {searchConditionsTitle}
            </p>

            <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
              {/* 検索条件を絞り込むを押下で表示 */}
              {(() => {
                if (!facultyOptions) return;
                if (!isNarrowDownOpen) return;
                return (
                  <div className={classes.presentationalSearchConditionsBox}>
                    {/* キーワード入力 */}
                    <div
                      className={classes.presentationalSearchConditionsBoxUnity}
                    >
                      <label
                        className={classes.presentationalSearchConditionsLabel}
                      >
                        キーワード
                      </label>
                      <InputField
                        label="キーワードを入力してください"
                        fullWidthCharactersNotAllowed={false}
                        register={searchProfessorsFormRegisterReturns.keyword}
                        setValue={setValue}
                        className="!max-w-lg md:!w-2/4"
                      />
                    </div>
                    {/* 学部選択 */}
                    <div
                      className={classes.presentationalSearchConditionsBoxUnity}
                    >
                      <label
                        className={classes.presentationalSearchConditionsLabel}
                      >
                        学部
                      </label>
                      <SelectField
                        options={facultyOptions || []}
                        placeholder="学部を選択してください"
                        register={searchProfessorsFormRegisterReturns.facultyId}
                        className="md:!w-2/4"
                      />
                    </div>
                  </div>
                );
              })()}

              {/* 検索条件を絞り込む */}
              {(() => {
                if (isNarrowDownOpen) {
                  return (
                    <div
                      className={
                        classes.presentationalSearchConditionsNarrowDownSubmit
                      }
                    >
                      <SubmitField
                        label="検索条件を絞り込む"
                        disabled={!formState.isDirty || formState.isSubmitting}
                      />
                    </div>
                  );
                } else {
                  return (
                    <p
                      className={
                        classes.presentationalSearchConditionsNarrowDown
                      }
                    >
                      <span onClick={() => setIsNarrowDownOpen(true)}>
                        検索条件を絞り込む
                      </span>
                    </p>
                  );
                }
              })()}
            </form>
          </div>
        </div>
      </section>

      {/* 教授一覧 */}
      <section className={classes.presentationalSectionDowner}>
        <div className={classes.presentationalSectionDownerBox}>
          {(() => {
            return professorsArray.map((professors, i) => {
              if (professors.length === 0) {
                return (
                  <p key={i} className={classes.presentationalSectionNoMatch}>
                    該当なし
                  </p>
                );
              }

              return professors.map((professor) => (
                <ProfessorLink
                  key={professor.uuid}
                  name={professor.name}
                  imageUrl={professor.imageUrl}
                  lectures={professor.lectures
                    .map((lecture) => lecture.name)
                    .join(', ')}
                  faculties={professor.faculties
                    .map((faculty) => faculty.name)
                    .join(', ')}
                  reviewMeanScore={professor.reviewMeanScore}
                  reviewQuantity={professor.reviewQuantity}
                  href={`/Spots/${SpotsUuid}/professors/${professor.uuid}`}
                  className="mb-4"
                />
              ));
            });
          })()}

          {/* 全ての教授, 学部毎の教授一覧ページへ */}
          {(() =>
            professors?.objects.length === 0 ? (
              <></>
            ) : (
              <div className={classes.presentationalSectionDisplayAllContainer}>
                <Link
                  href={`/Spots/${SpotsUuid}/professors?${searchParams.toString()}`}
                  className="underline"
                >
                  全ての教授を見る
                </Link>
              </div>
            ))()}
        </div>
      </section>
    </>
  );
}
