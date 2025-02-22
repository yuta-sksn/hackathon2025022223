'use client';

import { HTMLAttributes, ReactNode } from 'react';
import { classNames } from '@/helpers/classNames';

import classes from './MainVisual.module.scss';

type MainVisualProps = {} & HTMLAttributes<HTMLElement>;

const MainVisual = ({ className, ...props }: MainVisualProps) => {
  return (
    <section className={classNames(classes.mainVisual, className)} {...props}>
      <div className={classes.mainVisualContents}>
        {/* キャッチコピー */}
        <p className={classes.mainVisualCatchCopy}>
          <span className="mb-3 inline-block">大学生活に</span>
          <br />
          <span className="mb-3 inline-block">
            <span
              className={classNames(
                classes.bgMainColorMr2,
                'mb-3 inline-block',
              )}
            >
              選択肢
            </span>
            と<br className={classNames(classes.newLineMaxW399pxSize)} />
            <span
              className={classNames(
                classes.bgMainColorMx2,
                classes.bgMainColorMl2,
                classes.bgMainColorMl0MaxW399pxSize,
              )}
            >
              可能性
            </span>
            を
          </span>
        </p>

        {/* 大学名で簡単検索 */}
        <p className={classes.mainVisualSimpleExplanation1}>
          <span>
            <span
              className={classNames(
                classes.bgMainColorMr2,
                'mb-3 inline-block',
              )}
            >
              日本最大級
            </span>
            の<br className={classNames(classes.newLineMaxW529pxSize)} />
            登録教員数
          </span>
        </p>

        {/* 大学名で検索 */}
        <div className={classes.mainVisualSearchUniversities}>
          {props.children}
        </div>

        {/* 学生と先生がつながるデータベース */}
        <p className={classes.mainVisualSimpleExplanation2}>
          <span>
            <span className="mb-4 inline-block">
              <span className={classNames(classes.bgMainColorMr2)}>
                プロフェッショナル
              </span>
              が
            </span>
            <br />
            <span className="mb-4 inline-block">
              もっと
              <span className={classNames(classes.bgMainColorMx2)}>身近</span>
              になる
            </span>
            <br />
            <span>口コミプラットフォーム</span>
          </span>
        </p>
      </div>
    </section>
  );
};

export default MainVisual;
