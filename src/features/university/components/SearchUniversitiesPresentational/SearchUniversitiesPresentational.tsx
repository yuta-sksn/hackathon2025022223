'use client';

import SearchField from '@/components/elements/SearchField/SearchField';
import UniversityLink from '@/components/elements/UniversityLink/UniversityLink';

import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';
import {
  SearchUniversitiesValues,
  Universities,
  University,
  UseSearchUniversitiesRegisterReturns,
} from '@/features/university/types';

import { classNames } from '@/helpers/classNames';

import classes from './SearchUniversitiesPresentational.module.scss';
import Button from '@/components/elements/Button/Button';
import { MouseEventHandler } from 'react';
import { TopProfessor, TopProfessors } from '@/features/professor/types';
import ProfessorLink from '@/components/elements/ProfessorLink/ProfessorLink';

type SearchUniversitiesPresentationalProps = {
  isRouterPush: boolean;
  universities?: void | Universities | null;
  universitiesArray: Array<University[]>;
  professors?: void | TopProfessors | null;
  professorsArray: Array<TopProfessor[]>;
  isSearched: boolean;
  isSubmit: boolean;
  searchUniversitiesRegisterReturns: UseSearchUniversitiesRegisterReturns;
  handleSubmit: UseFormHandleSubmit<SearchUniversitiesValues, undefined>;
  handleOnSubmit: SubmitHandler<SearchUniversitiesValues>;
  handleOnError: SubmitErrorHandler<SearchUniversitiesValues>;
  handleTapShowMoreUniversities:
    | MouseEventHandler<HTMLButtonElement>
    | undefined;
  handleTapShowMoreProfessors: MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function SearchUniversitiesPresentational({
  isRouterPush,
  universities,
  universitiesArray,
  professors,
  professorsArray,
  isSearched,
  isSubmit,
  searchUniversitiesRegisterReturns,
  handleSubmit,
  handleOnSubmit,
  handleOnError,
  handleTapShowMoreUniversities,
  handleTapShowMoreProfessors,
}: SearchUniversitiesPresentationalProps) {
  return (
    <>
      <section
        className={
          isRouterPush
            ? classes.presentationalSectionSearchField
            : classes.presentationalSectionSearchFieldByPage
        }
        style={{ transition: isSubmit ? 'margin-top 0.3s' : 'margin-top 0' }}
      >
        <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
          <SearchField
            label="大学・教授名で検索"
            register={searchUniversitiesRegisterReturns.keyword}
          />
        </form>
        {(() => {
          if (isRouterPush) return;
          return (
            <div className={classes.presentationalSectionRequestRegister}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeDj6n1mIiCugC-sFoVOh2Z_5xmjdz7vRrx7GhA5jdYSOB8sQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
              >
                登録されていない大学をリクエスト
              </a>
            </div>
          );
        })()}
      </section>
      {(() => {
        if (isRouterPush) return;

        return (
          <section className={classes.presentationalSectionUniversities}>
            {/* 大学 */}
            {isSearched ? (
              (() => {
                const Universities =
                  universities?.objects.length === 0 ? (
                    <p className={classes.presentationalSectionNoUniversity}>
                      該当なし
                    </p>
                  ) : (
                    universitiesArray.map((universities, i) => {
                      return universities.map((university) => (
                        <UniversityLink
                          key={university.uuid}
                          name={university.name}
                          address={university.address}
                          thumbnailImageUrl={university.thumbnailImageUrl}
                          href={`/universities/${university.uuid}`}
                          className="mb-4"
                        />
                      ));
                    })
                  );

                const h2ClassNames =
                  universities?.objects.length === 0
                    ? 'mb-2 text-2xl font-bold'
                    : 'mb-4 text-2xl font-bold';

                return (
                  <>
                    <h2 className={h2ClassNames}>大学</h2>
                    {Universities}
                  </>
                );
              })()
            ) : (
              <></>
            )}

            {/* もっと見る */}
            {(() => {
              if (!universities) return <></>;
              if (!universities?.pagination?.isLastPage) {
                // is_last_page が false の場合でも要素数が 0 の場合
                if ((universities as Universities).objects.length === 0)
                  return <></>;
                // 上記以外の場合
                return (
                  <Button
                    text="もっと見る"
                    className="mx-auto mb-4 mt-8 block"
                    onClick={handleTapShowMoreUniversities}
                  />
                );
              }
            })()}

            {/* 教授 */}
            {isSearched ? (
              (() => {
                const Professors =
                  professors?.objects.length === 0 ? (
                    <p className={classes.presentationalSectionNoUniversity}>
                      該当なし
                    </p>
                  ) : (
                    professorsArray.map((professors, i) => {
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
                          university={professor.universities[0]}
                          href={`/universities/${professor.universities[0].uuid}/professors/${professor.uuid}`}
                          className="mb-4"
                        />
                      ));
                    })
                  );

                return (
                  <>
                    <h2 className="mb-2 text-2xl font-bold">教授</h2>
                    {Professors}
                  </>
                );
              })()
            ) : (
              <></>
            )}

            {/* もっと見る */}
            {(() => {
              if (!professors) return <></>;
              if (!professors?.pagination?.isLastPage) {
                // is_last_page が false の場合でも要素数が 0 の場合
                if ((professors as TopProfessors).objects.length === 0)
                  return <></>;
                // 上記以外の場合
                return (
                  <Button
                    text="もっと見る"
                    className="mx-auto mb-4 mt-8 block"
                    onClick={handleTapShowMoreProfessors}
                  />
                );
              }
            })()}
          </section>
        );
      })()}
    </>
  );
}
