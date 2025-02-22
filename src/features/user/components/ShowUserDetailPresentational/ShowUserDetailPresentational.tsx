"use client";

import { UserByResource } from '@/features/auth/types';
import { User } from 'firebase/auth';
import React from 'react';

import classes from './ShowUserDetailPresentational.module.scss'
import Link from 'next/link';
import { convertPeriodSeparateDate } from '@/utils/date';

type ShowUserDetailPresentationalProps = {
  userByFirebase: User;
  userByRecoil: UserByResource;
}

export default function ShowUserDetailPresentational({
  userByFirebase,
  userByRecoil,
}: ShowUserDetailPresentationalProps) {
  return (
    <dl className={classes.presentationalDl}>
      {/* ユーザー ID */}
      <div className={classes.presentationalDlGroup}>
        <dt>ユーザーID</dt>
        <dd>{ userByRecoil.screenName }</dd>
      </div>

      {/* 所属大学 */}
      <Link className={classes.presentationalDlGroupLink} href="/account/edit">
        <dt><span>所属大学</span></dt>
        <dd>{ userByRecoil.lastEducationUniversityName || '編集' }<br /><span className={classes.presentationalEducationAt}>{
          `${userByRecoil.lastEducationUniversityName === '' ||
            userByRecoil.lastEducationUniversityName === null ||
            userByRecoil.lastEducationStartAt === '' ||
            userByRecoil.lastEducationStartAt === null ?
              // 所属大学が登録されていない場合, または在籍期間開始が登録されていない場合は非表示
              // 在籍期間開始が登録されているが, 在籍期間終了が登録されていない場合は (YYYY.MM~現在)
              // それ以外の場合は (YYYY.MM~YYYY.MM)
              '' : `(${convertPeriodSeparateDate(userByRecoil.lastEducationStartAt as string).slice(0, -3)}~${userByRecoil.lastEducationEndAt === '' || userByRecoil.lastEducationEndAt === null ?
                '現在' : convertPeriodSeparateDate(userByRecoil.lastEducationEndAt as string).slice(0, -3)})`}`
        }</span></dd>
      </Link>

      {/* メール */}
      <div className={classes.presentationalDlGroup}>
        <dt>メール</dt>
        <dd>
          {/* @ts-ignore */}
          { userByFirebase.email }
        </dd>
      </div>

      {/* パスワード */}
      <div className={classes.presentationalDlGroup}>
        <dt>パスワード</dt>
        <dd>****************</dd>
      </div>
    </dl>
  )
}
