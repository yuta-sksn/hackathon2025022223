'use client';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  SearchSpotsValues,
  spot,
  UseSearchSpotsRegisterReturns,
} from '@/features/spot/types';
import SearchField from '@/components/elements/SearchField/SearchField';
import dynamic from 'next/dynamic';
// import NicheMap from '@/components/elements/NicheMap/NicheMap';

export default function SearchSpotsContainer() {
  const NicheMap = useMemo(
    () =>
      dynamic(() => import('@/components/elements/NicheMap/NicheMap'), {
        loading: () => <p>map loading...</p>,
        ssr: false,
      }),
    [],
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // const [isSearched, setIsSearched] = useState(false);
  // const [isSubmit, setIsSubmit] = useState(false);

  // const [currentSpotsPage, setCurrentSpotsPage] = useState(1);
  // const [currentProfessorsPage, setCurrentProfessorsPage] = useState(1);
  // const [SpotsArray, setSpotsArray] = useState<Array<spot[]>>([]);
  // const [professorsArray, setProfessorsArray] = useState<Array<TopProfessor[]>>(
  //   [],
  // );
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  // useEffect(() => {
  //   // 初めからスポット一覧全てを表示する場合は以下のガード節をコメントアウト
  //   if (keyword === '') return;
  //   setIsSearched(true);
  // }, [keyword]);

  // // スポット一覧を API から購読
  // const {
  //   data: Spots,
  //   error: useSyncSpotsError,
  //   isLoading: useSyncSpotsIsLoading,
  // } = useSyncSpots(3, currentSpotsPage, keyword);

  const { register, handleSubmit, formState } = useForm<SearchSpotsValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      keyword,
    },
  });

  const searchSpotsRegisterReturns: UseSearchSpotsRegisterReturns = {
    keyword: register('keyword'),
  };

  // const handleOnSubmit: SubmitHandler<SearchSpotsValues> = async (values) => {
  //   setCurrentSpotsPage(1);
  //   setSpotsArray([]);

  //   setKeyword(values.keyword);
  //   setIsSubmit(true);

  //   if (isRouterPush) {
  //     router.push(
  //       values.keyword === '' ? '/Spots' : `/Spots?keyword=${values.keyword}`,
  //     );
  //   } else {
  //     router.replace(
  //       values.keyword === '' ? '/Spots' : `/Spots?keyword=${values.keyword}`,
  //     );
  //   }
  // };

  // const handleOnError: SubmitErrorHandler<SearchSpotsValues> = (errors) => {
  //   console.log(errors);
  // };

  // const handleTapShowMoreSpots = () => {
  //   setCurrentSpotsPage(currentSpotsPage + 1);
  // };

  // const handleTapShowMoreProfessors = () => {
  //   setCurrentProfessorsPage(currentProfessorsPage + 1);
  // };

  return (
    <div className="mx-auto flex w-[calc(100%-24px*2)] max-w-3xl flex-col gap-y-4 pb-16 pt-8">
      {/* 検索バー */}
      <SearchField
        label="ニッチスポットを検索"
        register={searchSpotsRegisterReturns.keyword}
      />
      {/* マップ */}
      <div className="mb-4 w-full">
        <NicheMap />
      </div>
      {/* ニッチスポット一覧 */}
      <div className="w-full">
        <h3 className="mb-2 text-xl">ニッチスポット一覧</h3>
        <table className="w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-center text-gray-700">
                スポット名
              </th>
              <th className="px-4 py-2 text-center text-gray-700">訪問人数</th>
              <th className="px-4 py-2 text-center text-gray-700">足跡</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2">hogefugapiyo</td>
              <td className="px-4 py-2 text-center">2</td>
              <td className="px-4 py-2 text-center text-xl">👣</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">hogefugapiyo</td>
              <td className="px-4 py-2 text-center">2</td>
              <td className="px-4 py-2 text-center text-xl">👣</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">hogefugapiyo</td>
              <td className="px-4 py-2 text-center">2</td>
              <td className="px-4 py-2 text-center text-xl">👣</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">hogefugapiyo</td>
              <td className="px-4 py-2 text-center">2</td>
              <td className="px-4 py-2 text-center text-xl">👣</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2">hogefugapiyo</td>
              <td className="px-4 py-2 text-center">2</td>
              <td className="px-4 py-2 text-center text-xl">👣</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
