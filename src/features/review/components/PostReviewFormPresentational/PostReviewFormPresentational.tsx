'use client';

import SelectField from '@/components/elements/SelectField/SelectField';
import ToggleField from '@/components/elements/ToggleField/ToggleField';
import TextareaField from '@/components/elements/TextareaField/TextareaField';
import SubmitField from '@/components/elements/SubmitField/SubmitField';
import StarRatingField from '@/components/elements/StarRatingField/StarRatingField';
import TagSelectorField from '@/components/elements/TagSelectorField/TagSelectorField';
import ImageSelectorField from '@/components/elements/ImageSelectorField/ImageSelectorField';
import {
  FormState,
  SubmitErrorHandler,
  SubmitHandler,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import {
  PostReviewFormValues,
  UsePostReviewFormRegisterReturns,
} from '@/features/review/types';
import { SelectOption, Tag } from '@/components/types';

import { classNames } from '@/helpers/classNames';
import classes from './PostReviewFormPresentational.module.scss';
import SelectorBoxField from '@/components/elements/SelectorBoxField/SelectorBoxField';
import { useEffect, useState } from 'react';
import InputField from '@/components/elements/InputField/InputField';

type PostReviewFormPresentationalProps = {
  professorName: string;
  facultyOptions: SelectOption[];
  lectureOptions: SelectOption[];
  courseStatusOptions: SelectOption[];
  attendanceOptions: SelectOption[];
  assignmentOptions: SelectOption[];
  difficultyOptions: SelectOption[];
  tags: Tag[];
  postReviewFormRegisterReturns: UsePostReviewFormRegisterReturns;
  watch: UseFormWatch<PostReviewFormValues>;
  setValue: UseFormSetValue<PostReviewFormValues>;
  getValues: UseFormGetValues<PostReviewFormValues>;
  handleSubmit: UseFormHandleSubmit<PostReviewFormValues, undefined>;
  formState: FormState<PostReviewFormValues>;
  handleOnSubmit: SubmitHandler<PostReviewFormValues>;
  handleOnError: SubmitErrorHandler<PostReviewFormValues>;
};

export default function PostReviewFormPresentational({
  professorName,
  facultyOptions,
  lectureOptions,
  courseStatusOptions,
  attendanceOptions,
  assignmentOptions,
  difficultyOptions,
  tags,
  postReviewFormRegisterReturns,
  watch,
  setValue,
  getValues,
  handleSubmit,
  formState,
  handleOnSubmit,
  handleOnError,
}: PostReviewFormPresentationalProps) {
  const [displayInputFacultyName, setDisplayInputFacultyName] = useState(false);
  const [displayInputLectureName, setDisplayInputLectureName] = useState(false);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (
        (type === 'change' &&
          name === postReviewFormRegisterReturns.facultyId.name) ||
        name === postReviewFormRegisterReturns.lectureId.name
      ) {
        if (name === postReviewFormRegisterReturns.facultyId.name) {
          setDisplayInputFacultyName(
            value[postReviewFormRegisterReturns.facultyId.name] === '-1',
          );
        } else if (name === postReviewFormRegisterReturns.lectureId.name) {
          setDisplayInputLectureName(
            value[postReviewFormRegisterReturns.lectureId.name] === '-1',
          );
        }
      }
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <section className={classes.presentationalSection}>
      {/* 教授名 */}
      <h2 className={classes.presentationalFormTitle}>
        <span>レビュー</span>
        <span>{professorName}</span>
      </h2>
      {/* レビュー投稿フォーム */}
      <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
        {/* 学部 & カリキュラムエリア */}
        <div className={classes.presentationalFormGroupBox}>
          {/* 学部 */}
          <div className={classes.presentationalFormGroupBoxUnity}>
            <label className={classes.presentationalFormLabel}>学部</label>
            <SelectField
              options={facultyOptions}
              placeholder="学部を選択してください"
              register={postReviewFormRegisterReturns.facultyId}
            />
            {/* その他が選択された場合 */}
            {(() => {
              if (!displayInputFacultyName) return;

              return (
                <InputField
                  label="学部名を入力してください"
                  register={postReviewFormRegisterReturns.facultyName}
                  setValue={setValue}
                  className="mt-3 !max-w-lg"
                />
              );
            })()}

            {/* エラーメッセージ */}
            <p className={classes.presentationalErrorMessage}>
              {formState.errors.facultyId?.message}
              {displayInputFacultyName
                ? formState.errors.facultyName?.message
                : ''}
            </p>
          </div>

          {/* カリキュラム */}
          <div className={classes.presentationalFormGroupBoxUnity}>
            <label className={classes.presentationalFormLabel}>
              カリキュラム
            </label>
            <SelectField
              options={lectureOptions}
              placeholder="カリキュラムを選択してください"
              register={postReviewFormRegisterReturns.lectureId}
            />
            {/* その他が選択された場合 */}
            {(() => {
              if (!displayInputLectureName) return;

              return (
                <InputField
                  label="カリキュラム名を入力してください"
                  register={postReviewFormRegisterReturns.lectureName}
                  setValue={setValue}
                  className="mt-3 !max-w-lg"
                />
              );
            })()}

            {/* エラーメッセージ */}
            <p className={classes.presentationalErrorMessage}>
              {formState.errors.lectureId?.message}
              {displayInputLectureName
                ? formState.errors.lectureName?.message
                : ''}
            </p>
          </div>
        </div>

        {/* 履修状況 & 評価エリア */}
        <div className={classes.presentationalFormGroupBox}>
          <label className={classes.presentationalFormLabel}>評価</label>

          {/* 履修状況 */}
          <div className={classes.presentationalFormGroupBoxUnity}>
            <SelectorBoxField
              options={courseStatusOptions}
              register={postReviewFormRegisterReturns.status}
            />
            <p className={classes.presentationalErrorMessage}>
              {formState.errors.status?.message}
            </p>
          </div>

          {/* カリキュラムの評価 */}
          <div
            className={classNames(
              classes.presentationalFormGroupBoxUnity,
              '!mb-1',
            )}
          >
            <StarRatingField
              maxRate={5}
              register={postReviewFormRegisterReturns.rate}
            />
            <p className={classes.presentationalErrorMessage}>
              {formState.errors.rate?.message}
            </p>
          </div>
        </div>

        {/* コメント(任意) & 画像選択エリア */}
        <div className={classes.presentationalFormGroupBox}>
          {/* コメント(任意) */}
          <div className={classes.presentationalFormGroupBoxUnity}>
            <TextareaField
              label="コメント(任意)"
              placeholder={`後輩につたえたいこと<br />履修のコツ<br />講義の評価方法<br />使用する教科書や参考書情報`}
              register={postReviewFormRegisterReturns.comment}
            />
            <p className={classes.presentationalErrorMessage}>
              {formState.errors.comment?.message}
            </p>
          </div>

          {/* 画像選択 @TODO: 一時的にコメントアウト */}
          {/* <div className={classes.presentationalFormGroupBoxUnity}>
            <ImageSelectorField
              register={postReviewFormRegisterReturns.images}
              setValue={setValue}
            />
          </div> */}
        </div>

        {/* 単位 & 課題 & 出席選択エリア */}
        <div className={classes.presentationalFormGroupBox}>
          {/* 単位 */}
          <div className={classes.presentationalFormGroupBoxUnity}>
            <label className={classes.presentationalFormLabel}>単位</label>
            <SelectorBoxField
              options={difficultyOptions}
              defaultCheckedValue={20}
              register={postReviewFormRegisterReturns.difficulty}
            />
          </div>

          {/* 課題 */}
          <div className={classes.presentationalFormGroupBoxUnity}>
            <label className={classes.presentationalFormLabel}>課題</label>
            <SelectorBoxField
              options={assignmentOptions}
              defaultCheckedValue={20}
              register={postReviewFormRegisterReturns.assignment}
            />
          </div>

          {/* 出席 */}
          <div className={classes.presentationalFormGroupBoxUnity}>
            <label className={classes.presentationalFormLabel}>出席</label>
            <SelectorBoxField
              options={attendanceOptions}
              defaultCheckedValue={20}
              register={postReviewFormRegisterReturns.attendance}
            />
          </div>
        </div>

        {/* タグ選択 */}
        <div className={classes.presentationalFormGroupBox}>
          <label className={classes.presentationalFormLabel}>
            タグ
            <span className={classes.presentationalFormLabelAnnotation}>
              （3つまで）
            </span>
          </label>
          <TagSelectorField
            maxSelectionNum={3}
            tags={tags}
            register={postReviewFormRegisterReturns.tagIds}
            getValues={getValues}
          />
        </div>

        {/* レビュー投稿 */}
        <SubmitField
          label="レビューを投稿"
          className={classes.presentationalSubmit}
          disabled={!formState.isDirty || formState.isSubmitting}
        />
      </form>
    </section>
  );
}
