'use client';

import SearchField from '@/components/elements/SearchField/SearchField';
import spotLink from '@/components/elements/spotLink/spotLink';

import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';
import {
  SearchSpotsValues,
  Spots,
  spot,
  UseSearchSpotsRegisterReturns,
} from '@/features/spot/types';

import { classNames } from '@/helpers/class-names';

import classes from './SearchSpotsPresentational.module.scss';
import Button from '@/components/elements/Button/Button';
import { MouseEventHandler } from 'react';
import { TopProfessor, TopProfessors } from '@/features/professor/types';
import ProfessorLink from '@/components/elements/ProfessorLink/ProfessorLink';

type SearchSpotsPresentationalProps = {
  isRouterPush: boolean;
  Spots?: void | Spots | null;
  SpotsArray: Array<spot[]>;
  professors?: void | TopProfessors | null;
  professorsArray: Array<TopProfessor[]>;
  isSearched: boolean;
  isSubmit: boolean;
  searchSpotsRegisterReturns: UseSearchSpotsRegisterReturns;
  handleSubmit: UseFormHandleSubmit<SearchSpotsValues, undefined>;
  handleOnSubmit: SubmitHandler<SearchSpotsValues>;
  handleOnError: SubmitErrorHandler<SearchSpotsValues>;
  handleTapShowMoreSpots: MouseEventHandler<HTMLButtonElement> | undefined;
  handleTapShowMoreProfessors: MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function SearchSpotsPresentational({
  isRouterPush,
  Spots,
  SpotsArray,
  professors,
  professorsArray,
  isSearched,
  isSubmit,
  searchSpotsRegisterReturns,
  handleSubmit,
  handleOnSubmit,
  handleOnError,
  handleTapShowMoreSpots,
  handleTapShowMoreProfessors,
}: SearchSpotsPresentationalProps) {
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
            label="スポット・教授名で検索"
            register={searchSpotsRegisterReturns.keyword}
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
                登録されていないスポットをリクエスト
              </a>
            </div>
          );
        })()}
      </section>
      {(() => {
        if (isRouterPush) return;

        return (
          <section className={classes.presentationalSectionSpots}>
            {/* スポット */}
            {isSearched ? (
              (() => {
                const Spots =
                  Spots?.objects.length === 0 ? (
                    <p className={classes.presentationalSectionNospot}>
                      該当なし
                    </p>
                  ) : (
                    SpotsArray.map((Spots, i) => {
                      return Spots.map((spot) => (
                        <spotLink
                          key={spot.uuid}
                          name={spot.name}
                          address={spot.address}
                          thumbnailImageUrl={spot.thumbnailImageUrl}
                          href={`/Spots/${spot.uuid}`}
                          className="mb-4"
                        />
                      ));
                    })
                  );

                const h2ClassNames =
                  Spots?.objects.length === 0
                    ? 'mb-2 text-2xl font-bold'
                    : 'mb-4 text-2xl font-bold';

                return (
                  <>
                    <h2 className={h2ClassNames}>スポット</h2>
                    {Spots}
                  </>
                );
              })()
            ) : (
              <></>
            )}

            {/* もっと見る */}
            {(() => {
              if (!Spots) return <></>;
              if (!Spots?.pagination?.isLastPage) {
                // is_last_page が false の場合でも要素数が 0 の場合
                if ((Spots as Spots).objects.length === 0) return <></>;
                // 上記以外の場合
                return (
                  <Button
                    text="もっと見る"
                    className="mx-auto mb-4 mt-8 block"
                    onClick={handleTapShowMoreSpots}
                  />
                );
              }
            })()}

            {/* 教授 */}
            {isSearched ? (
              (() => {
                const Professors =
                  professors?.objects.length === 0 ? (
                    <p className={classes.presentationalSectionNospot}>
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
                          spot={professor.Spots[0]}
                          href={`/Spots/${professor.Spots[0].uuid}/professors/${professor.uuid}`}
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
