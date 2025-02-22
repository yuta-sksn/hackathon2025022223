'use client';

import { InputHTMLAttributes, createRef, useEffect, useRef } from 'react';
import { classNames } from '@/helpers/classNames';
const { v4: uuidv4 } = require('uuid');

import classes from './ToggleField.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';

type ToggleFieldProps = {
  label?: string;
  register: UseFormRegisterReturn;
} & InputHTMLAttributes<HTMLInputElement>;

const ToggleField = ({
  label,
  register,
  className,
  ...props
}: ToggleFieldProps) => {
  const { ref, ...rest } = register;
  const outerLabelRef = createRef<HTMLLabelElement>();
  const toggleRef = useRef<HTMLInputElement | null>(null);
  const innerLabelRef = createRef<HTMLLabelElement>();
  const swImgRef = createRef<HTMLLabelElement>();

  useEffect(() => {
    // DOM でどれか一つでも null の場合は return
    if (
      outerLabelRef.current === null ||
      toggleRef.current === null ||
      innerLabelRef.current === null ||
      swImgRef.current === null
    )
      return;

    // id と htmlFor にパラメータを動的に追加
    const toggleId = uuidv4();
    outerLabelRef.current.htmlFor = toggleId;
    toggleRef.current.id = toggleId;
    innerLabelRef.current.htmlFor = toggleId;
    swImgRef.current.htmlFor = toggleId;
  }, [outerLabelRef, toggleRef, innerLabelRef, swImgRef]);

  return (
    <div className={classNames(classes.toggleFieldContainer, className)}>
      <label ref={outerLabelRef} className={classes.toggleFieldLabel}>
        {label}
      </label>
      <div className={classes.toggleField}>
        <input
          {...rest}
          ref={(e) => {
            ref(e);
            toggleRef.current = e;
          }}
          type="checkbox"
          {...props}
        />
        <label ref={innerLabelRef}>
          <span></span>
        </label>
        <label ref={swImgRef} className={classes.swImg}></label>
      </div>
    </div>
  );
};

export default ToggleField;
