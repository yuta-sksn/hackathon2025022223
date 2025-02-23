'use client';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  SearchSpotsValues,
  Spot,
  UseSearchSpotsRegisterReturns,
} from '@/features/spot/types';
import SearchField from '@/components/elements/SearchField/SearchField';
import dynamic from 'next/dynamic';
import useSyncSpots from '../../api/useSyncSpots';
import Link from 'next/link';
import { useAuthContext } from '@/features/auth/components/AuthProvider/AuthProvider';
// import NicheMap from '@/components/elements/NicheMap/NicheMap';

export default function SearchSpotsContainer() {
  const { user } = useAuthContext();

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

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setPosition);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const setPosition = (position: GeolocationPosition) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser.');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setPosition(position);
      },
      (err) => {
        console.error(err.message);
      },
      {
        enableHighAccuracy: true, // 高精度な位置情報を取得
        timeout: 10000, // タイムアウト
        maximumAge: 0, // キャッシュを使わず毎回取得
      },
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const [isSearched, setIsSearched] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [currentSpotsPage, setCurrentSpotsPage] = useState(1);
  const [spotsArray, setSpotsArray] = useState<Array<Spot[]>>([]);
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  // useEffect(() => {
  //   // 初めからスポット一覧全てを表示する場合は以下のガード節をコメントアウト
  //   if (keyword === '') return;
  //   setIsSearched(true);
  // }, [keyword]);

  // スポット一覧を API から購読
  const {
    data: spots,
    error: useSyncSpotsError,
    isLoading: useSyncSpotsIsLoading,
  } = useSyncSpots(
    // @ts-ignore
    user ? user.accessToken : null,
    3,
    currentSpotsPage,
    keyword,
  );

  // ニッチスポットの Object に関する useEffect
  useEffect(() => {
    if (!spots) return;
    const temp = spotsArray.concat();
    temp[currentSpotsPage - 1] = spots.nicheSpots.concat();
    setSpotsArray(temp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spots]);

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

  const handleOnSubmit: SubmitHandler<SearchSpotsValues> = async (values) => {
    setCurrentSpotsPage(1);
    setSpotsArray([]);

    setKeyword(values.keyword);
    setIsSubmit(true);

    router.push(values.keyword === '' ? '/' : `/?keyword=${values.keyword}`);
  };

  const handleOnError: SubmitErrorHandler<SearchSpotsValues> = (errors) => {
    console.log(errors);
  };

  // const handleTapShowMoreSpots = () => {
  //   setCurrentSpotsPage(currentSpotsPage + 1);
  // };

  // const handleTapShowMoreProfessors = () => {
  //   setCurrentProfessorsPage(currentProfessorsPage + 1);
  // };

  return (
    <div className="mx-auto flex w-[calc(100%-24px*2)] max-w-3xl flex-col gap-y-4 pb-16 pt-8">
      {/* 検索バー */}
      <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)}>
        <SearchField
          label="ニッチスポットを検索"
          register={searchSpotsRegisterReturns.keyword}
        />
      </form>

      {/* マップ */}
      <div className="mb-4 w-full">
        <NicheMap
          centerPosition={
            !latitude || !longitude
              ? undefined
              : { lat: latitude, lng: longitude }
          }
          nicheSpots={spots?.nicheSpots}
        />
      </div>
      {/* ニッチスポット一覧 */}
      <div className="w-full">
        <h3 className="mb-2 text-xl">みんなのニッチスポット</h3>
        <table className="w-full bg-white">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-center text-gray-700">
                スポット名
              </th>
              <th className="w-16 px-4 py-2 text-center text-gray-700">
                訪問人数
              </th>
              <th className="w-32 px-4 py-2 text-center text-gray-700">
                行った！
              </th>
            </tr>
          </thead>
          <tbody>
            {spots?.nicheSpots.length === 0 ? (
              <p className={''}>該当なし</p>
            ) : (
              spotsArray.map((spots, i) => {
                return spots.map((spot) => (
                  <tr className="border-b">
                    <td className="px-4 py-2">
                      <Link
                        href={`/spots/${spot.id}`}
                        className="text-blue-500 underline"
                      >
                        {spot.name}
                      </Link>
                    </td>
                    <td className="px-4 py-2 text-center">
                      {spot.numberOfVisits}
                    </td>
                    <td className="px-4 py-2 text-center text-xl">
                      {spot.isVisited ? '👣' : ''}
                    </td>
                  </tr>
                ));
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
