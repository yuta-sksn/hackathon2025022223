"use client";

import Button from '@/components/elements/Button/Button'
import ProfessorLink from '@/components/elements/ProfessorLink/ProfessorLink'
import SelectField from '@/components/elements/SelectField/SelectField';
import { SelectOption } from '@/components/types';
import {
  Professor,
  Professors,
  SearchProfessorsFormValues,
  UseSearchProfessorsFormRegisterReturns,
} from '@/features/professor/types';
import { University } from '@/features/university/types';
import { MouseEventHandler, useState } from 'react';

import classes from './ShowProfessorsPresentational.module.scss'
import SubmitField from '@/components/elements/SubmitField/SubmitField';
import {
  FormState,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form';
import InputField from '@/components/elements/InputField/InputField';
import { ReadonlyURLSearchParams } from 'next/navigation';

type ShowProfessorsPresentationalProps = {
  searchParams: ReadonlyURLSearchParams;
  universitiesUuid: string;
  university?: void | University | null;
  facultyOptions: SelectOption[] | null;
  searchProfessorsFormRegisterReturns: UseSearchProfessorsFormRegisterReturns;
  setValue: UseFormSetValue<SearchProfessorsFormValues>;
  professors?: void | Professors | null;
  searchConditionsTitle: string,
  professorsArray: Array<Professor[]>;
  handleSubmit: UseFormHandleSubmit<SearchProfessorsFormValues, undefined>
  formState: FormState<SearchProfessorsFormValues>;
  handleTapShowMore: MouseEventHandler<HTMLButtonElement> | undefined
  handleOnSubmit: SubmitHandler<SearchProfessorsFormValues>
  handleOnError: SubmitErrorHandler<SearchProfessorsFormValues>
}

export default function ShowProfessorsPresentational({
  searchParams,
  universitiesUuid,
  university,
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
}: ShowProfessorsPresentationalProps) {
  const [isNarrowDownOpen, setIsNarrowDownOpen] = useState<boolean>(
    // !!searchParams.get('keyword') || !!searchParams.get('faculty')
    true
  )

  return (
    <>
      {/* 教授一覧・大学名 (住所) & 検索条件エリア */}
      <section className={classes.presentationalSectionUpper}>
        <div className={classes.presentationalSectionUpperBox}>
          {/* 教授一覧・大学名 (住所) */}
          <h2 className={classes.presentationalTitle}>
            {(() => {
              if (!university) return
              return (<>
                <span>教授一覧</span>
                <span>{ university.name }<br /><span>{ university.address }</span></span>
              </>)
            })()}
          </h2>

          {/* 検索条件 */}
          <div className={classes.presentationalSearchConditions}>
            <p className={classes.presentationalSearchConditionsTitle}>検索条件 : {searchConditionsTitle}</p>

            <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
              {/* 検索条件を絞り込むを押下で表示 */}
              {(() => {
                if (!facultyOptions) return
                if (!isNarrowDownOpen) return
                return (<div className={classes.presentationalSearchConditionsBox}>
                  {/* キーワード入力 */}
                  <div className={classes.presentationalSearchConditionsBoxUnity}>
                    <label className={classes.presentationalSearchConditionsLabel}>キーワード</label>
                    <InputField
                      label="キーワードを入力してください"
                      fullWidthCharactersNotAllowed={false}
                      register={searchProfessorsFormRegisterReturns.keyword}
                      setValue={setValue}
                      className="md:!w-2/4 !max-w-lg"
                    />
                  </div>
                  {/* 学部選択 */}
                  <div className={classes.presentationalSearchConditionsBoxUnity}>
                  <label className={classes.presentationalSearchConditionsLabel}>学部</label>
                    <SelectField
                      options={facultyOptions || []}
                      placeholder="学部を選択してください"
                      register={searchProfessorsFormRegisterReturns.facultyId}
                      className="md:!w-2/4"
                    />
                  </div>
                </div>)
              })()}

              {/* 検索条件を絞り込む */}
              {(() => {
                if (isNarrowDownOpen) {
                  return (<div className={classes.presentationalSearchConditionsNarrowDownSubmit}>
                    <SubmitField
                      label="検索条件を絞り込む"
                      disabled={!formState.isDirty || formState.isSubmitting}
                    />
                  </div>)
                } else {
                  return (<p className={classes.presentationalSearchConditionsNarrowDown}>
                    <span onClick={() => setIsNarrowDownOpen(true)}>検索条件を絞り込む</span>
                  </p>)
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
                return <p key={i} className={classes.presentationalSectionNoMatch}>該当なし</p>
              }
    
              return professors.map(
                (professor) => <ProfessorLink
                  key={professor.uuid}
                  name={professor.name}
                  imageUrl={professor.imageUrl}
                  lectures={professor.lectures.map(lecture => lecture.name).join(', ')}
                  faculties={professor.faculties.map(faculty => faculty.name).join(', ')}
                  reviewMeanScore={professor.reviewMeanScore}
                  reviewQuantity={professor.reviewQuantity}
                  href={`/universities/${universitiesUuid}/professors/${professor.uuid}`}
                  className="mb-4"
                />
              )
            })
          })()}

          {/* もっと見る */}
          {(() => {
            if (!professors) return <></>
            if (!professors?.pagination?.isLastPage) {
              // is_last_page が false の場合でも要素数が 0 の場合
              if ((professors as Professors).objects.length === 0) return <></>
              // 上記以外の場合
              return <Button text="もっと見る" className="block mx-auto mb-8" onClick={handleTapShowMore} />
            }
          })()}
        </div>
      </section>
    </>
  )
}
