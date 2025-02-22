'use client';

import { UserByResource } from '@/features/auth/types';
import React from 'react';

import classes from './PatchUserFormPresentational.module.scss';
import {
  PatchUserFormValues,
  UsePatchUserFormRegisterReturns,
} from '@/features/user/types';
import {
  Control,
  FormState,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormSetValue,
} from 'react-hook-form';
import InputField from '@/components/elements/InputField/InputField';
import { classNames } from '@/helpers/classNames';
import SubmitField from '@/components/elements/SubmitField/SubmitField';
import SelectDateField from '@/components/elements/SelectDateField/SelectDateField';

type PatchUserFormPresentationalProps = {
  control: Control<PatchUserFormValues>;
  patchUserFormRegisterReturns: UsePatchUserFormRegisterReturns;
  setValue: UseFormSetValue<PatchUserFormValues>;
  handleSubmit: UseFormHandleSubmit<PatchUserFormValues, undefined>;
  formState: FormState<PatchUserFormValues>;
  handleOnSubmit: SubmitHandler<PatchUserFormValues>;
  handleOnError: SubmitErrorHandler<PatchUserFormValues>;
};

export default function PatchUserFormPresentational({
  control,
  patchUserFormRegisterReturns,
  setValue,
  handleSubmit,
  formState,
  handleOnSubmit,
  handleOnError,
}: PatchUserFormPresentationalProps) {
  return (
    <section className={classes.presentationalSection}>
      <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
        {/* 所属大学 */}
        <div className={classes.presentationalFormGroupBox}>
          <label className={classes.presentationalFormLabel}>所属大学</label>
          <InputField
            label="大学名"
            register={patchUserFormRegisterReturns.lastEducationUniversityName}
            setValue={setValue}
            className="!max-w-lg"
          />
          <p className={classes.presentationalErrorMessage}>
            {formState.errors.lastEducationUniversityName?.message}
          </p>
        </div>

        {/* 学部 */}
        <div className={classes.presentationalFormGroupBox}>
          <label className={classes.presentationalFormLabel}>学部</label>
          <InputField
            label="学部"
            register={patchUserFormRegisterReturns.lastEducationFacultyName}
            setValue={setValue}
            className="!max-w-lg"
          />
          <p className={classes.presentationalErrorMessage}>
            {formState.errors.lastEducationFacultyName?.message}
          </p>
        </div>

        {/* 在籍期間 */}
        <div className={classes.presentationalFormGroupBox}>
          <label className={classes.presentationalFormLabel}>在籍期間</label>
          <div className="flex items-center">
            {/* 開始 */}
            <SelectDateField
              label="開始"
              placeholder="年月"
              // @ts-ignore
              control={control}
              controlName="lastEducationStartAt"
              register={patchUserFormRegisterReturns.lastEducationStartAt}
              setValue={setValue}
            />

            <span className={classes.presentationalFormPeriodTilde}>〜</span>

            {/* 終了 */}
            <SelectDateField
              label="終了"
              placeholder="年月"
              // @ts-ignore
              control={control}
              controlName="lastEducationEndAt"
              register={patchUserFormRegisterReturns.lastEducationEndAt}
              setValue={setValue}
            />
          </div>
        </div>

        {/* 保存 */}
        <SubmitField
          label="保存する"
          className={classNames(
            classes.presentationalSubmit,
            'mx-auto mb-9 mt-7 block',
          )}
          disabled={!formState.isDirty || formState.isSubmitting}
        />
      </form>
    </section>
  );
}
