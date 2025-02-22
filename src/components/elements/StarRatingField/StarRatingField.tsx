'use client';

import {
  InputHTMLAttributes,
  MutableRefObject,
  ReactNode,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { classNames } from '@/helpers/classNames';
const { v4: uuidv4 } = require('uuid');

import classes from './StarRatingField.module.scss';
import React from 'react';

type StarRatingFieldProps = {
  mode?: 'select' | 'readonly';
  maxRate: number;
  error?: string;
  action?: ReactNode;
  register: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

const StarRatingField = ({
  maxRate,
  error,
  register,
  action,
  className,
  ...props
}: StarRatingFieldProps) => {
  const [selectedDataIndex, setSelectedDataIndex] = useState<number>(-1);
  const { ref, ...rest } = register;
  const starRadioRefs = useRef<MutableRefObject<HTMLInputElement>[]>([]);
  const starLabelRefs = useRef<RefObject<HTMLLabelElement>[]>([]);

  const _changeStarLabelsBgColor = (compareIndex: number) => {
    for (let i = 0; i < maxRate; i++) {
      const starIndex = Number(
        (starLabelRefs.current[i].current as HTMLLabelElement).getAttribute(
          'data-index',
        ),
      );
      if (compareIndex >= starIndex) {
        // アクティブ時
        (starLabelRefs.current[i].current as HTMLLabelElement).classList.remove(
          classes.starRatingFieldStar,
        );
        (starLabelRefs.current[i].current as HTMLLabelElement).classList.add(
          classes.starRatingFieldStarActive,
        );
      } else {
        // 非アクティブ時
        (starLabelRefs.current[i].current as HTMLLabelElement).classList.add(
          classes.starRatingFieldStar,
        );
        (starLabelRefs.current[i].current as HTMLLabelElement).classList.remove(
          classes.starRatingFieldStarActive,
        );
      }
    }
  };

  const handleMouseOverStar = (event: React.MouseEvent<HTMLLabelElement>) => {
    const hoveredStarIndex = Number(
      (event.target as HTMLLabelElement).getAttribute('data-index'),
    );
    _changeStarLabelsBgColor(hoveredStarIndex);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLLabelElement>) => {
    _changeStarLabelsBgColor(selectedDataIndex);
  };

  const handleTapStar = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedStarIndex = Number(
      (event.target as HTMLInputElement).getAttribute('data-index'),
    );
    setSelectedDataIndex(selectedStarIndex);
  };

  useEffect(() => {
    _changeStarLabelsBgColor(selectedDataIndex);
  });

  const Stars = Array.from({ length: maxRate }, (_, i) => {
    starRadioRefs.current[i] =
      createRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>;
    starLabelRefs.current[i] = createRef<HTMLLabelElement>();

    return (
      <React.Fragment key={i}>
        <input
          {...rest}
          ref={(e) => {
            ref(e);
            starRadioRefs.current[i].current = e as HTMLInputElement;
          }}
          type="radio"
          value={i + 1}
          className={classes.starRatingFieldInput}
          onChange={(e) => {
            rest.onChange(e);
            handleTapStar(e);
          }}
          data-index={i}
        />
        <label
          ref={starLabelRefs.current[i]}
          className={classes.starRatingFieldStar}
          onMouseOver={handleMouseOverStar}
          onMouseLeave={handleMouseLeave}
          data-index={i}
        ></label>
      </React.Fragment>
    );
  });

  useEffect(() => {
    for (let i = 0; i < maxRate; i++) {
      const starRadioRef = starRadioRefs.current[i].current as HTMLInputElement;
      const starLabelRef = starLabelRefs.current[i].current as HTMLLabelElement;

      if (starRadioRef === null || starLabelRef === null) return;

      const starRadioId = uuidv4();
      starRadioRef.id = starRadioId;
      starLabelRef.htmlFor = starRadioId;
    }
  });

  return (
    <div className={classNames(classes.starRatingFieldContainer, className)}>
      <div className={classes.starRatingFieldStarsContainer}>{Stars}</div>
    </div>
  );
};

export default StarRatingField;
