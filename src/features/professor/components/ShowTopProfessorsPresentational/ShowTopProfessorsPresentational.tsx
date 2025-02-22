"use client";

import Button from '@/components/elements/Button/Button'
import ProfessorLink from '@/components/elements/ProfessorLink/ProfessorLink'
import {
  TopProfessor,
  TopProfessors,
} from '@/features/professor/types';
import { MouseEventHandler } from 'react';

import classes from './ShowTopProfessorsPresentational.module.scss'

type ShowTopProfessorsPresentationalProps = {
  professors?: void | TopProfessors | null;
  professorsArray: Array<TopProfessor[]>;
  handleTapShowMore: MouseEventHandler<HTMLButtonElement> | undefined
}

export default function ShowTopProfessorsPresentational({
  professorsArray,
  professors,
  handleTapShowMore,
}: ShowTopProfessorsPresentationalProps) {
  return (
    <>
      {/* 教授一覧・大学名 (住所) & 検索条件エリア */}
      <section className={classes.presentationalSectionUpper}>
        <div className={classes.presentationalSectionUpperBox}>
          {/* 教授一覧・大学名 (住所) */}
          <h2 className={classes.presentationalTitle}>
            <span>評価の高い先生</span>
          </h2>
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
                  university={professor.universities[0]}
                  href={`/universities/${professor.universities[0].uuid}/professors/${professor.uuid}`}
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
              if ((professors as TopProfessors).objects.length === 0) return <></>
              // 上記以外の場合
              return <Button text="もっと見る" className="block mx-auto mb-8" onClick={handleTapShowMore} />
            }
          })()}
        </div>
      </section>
    </>
  )
}
