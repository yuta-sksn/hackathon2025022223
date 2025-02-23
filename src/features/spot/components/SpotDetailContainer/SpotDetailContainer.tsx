'use client';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import { Pagination, Mousewheel, EffectCube } from 'swiper/modules';
import { useEffect, useMemo, useState } from 'react';
import useSyncSpot from '../../api/useSyncSpot';
import { useParams } from 'next/navigation';
import usePostStamp from '@/features/stamp/api/usePostStamp';
import { useAuthContext } from '@/features/auth/components/AuthProvider/AuthProvider';
import useSyncStamp from '@/features/stamp/api/useSyncStamp';
import { toast } from 'react-toastify';
import distance from '@turf/distance';
import { point } from '@turf/helpers';
import useSyncSpots from '../../api/useSyncSpots';
import { SpotObject } from '../../types';

export default function SpotDetailContainer() {
  const { spot_id: spotId } = useParams<{ spot_id: string }>();
  const { user } = useAuthContext();

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
    const id = setInterval(() => {
      getLocation();
    }, 3000);
  }, []);

  // ニッチスポット詳細を API から購読
  const {
    data: spot,
    error: useSyncSpotError,
    isLoading: useSyncSpotIsLoading,
    mutate: useSyncSpotMutate,
    // @ts-ignore
  } = useSyncSpot(user ? user.accessToken : null, Number(spotId));

  const {
    data: spots,
    error: useSyncSpotsError,
    isLoading: useSyncSpotsIsLoading,
  } = useSyncSpots(
    // @ts-ignore
    user ? user.accessToken : null,
    10,
    1,
    '',
  );

  const filteredSpot = useMemo(() => {
    if (!spot || !spots) return null;
    return spots.nicheSpots.filter((s) => spot.id === s.id)[0];
  }, [spot, spots]);

  const nowDistance = useMemo((): number => {
    if (
      !latitude ||
      !longitude ||
      !filteredSpot ||
      !(filteredSpot as unknown as SpotObject).longitude ||
      !(filteredSpot as unknown as SpotObject).latitude
    )
      return -1000;
    const filteredSpotLng = (filteredSpot as unknown as SpotObject).longitude;
    const filteredSpotLat = (filteredSpot as unknown as SpotObject).latitude;
    const myPoint = point([longitude, latitude]);
    const spotPoint = point([filteredSpotLng, filteredSpotLat]);
    return distance(myPoint, spotPoint, { units: 'meters' });
  }, [latitude, longitude, filteredSpot]);

  // 10m 以下 0m 以上でスタンプを押せるように
  const canPush = useMemo(() => {
    const nowDistanceInt = Math.round(nowDistance);
    console.log(nowDistanceInt);
    console.log(10 >= nowDistanceInt);
    return 10 >= nowDistanceInt && nowDistanceInt >= 0;
  }, [nowDistance]);

  // スタンプ情報を API から購読
  const {
    data: stamp,
    error: useSyncStampError,
    isLoading: useSyncStampIsLoading,
    mutate: useSyncStampMutate,
    // @ts-ignore
  } = useSyncStamp(user ? user.accessToken : null, Number(spotId));

  // スライダー次へボタン
  const SlideNextButton = () => {
    const swiper = useSwiper();

    return (
      <button
        onClick={() => swiper.slideNext()}
        className="absolute right-0 top-0 z-[2] h-[calc(100%-24px)] bg-[#949494] bg-opacity-75 px-2 sm:px-4"
      >
        <span className="text-xl text-white sm:text-3xl">&gt;</span>
      </button>
    );
  };

  // スライダー前へボタン
  const SlidePrevButton = () => {
    const swiper = useSwiper();

    return (
      <button
        onClick={() => swiper.slidePrev()}
        className="absolute left-0 top-0 z-[2] h-[calc(100%-24px)] bg-[#949494] bg-opacity-75 px-2 sm:px-4"
      >
        <span className="text-xl text-white sm:text-3xl">&lt;</span>
      </button>
    );
  };

  const notify = () =>
    toast.info('スタンプゲット！', {
      icon: false,
    });

  const useHandlePushStamp = async () => {
    await usePostStamp(
      {
        // @ts-ignore
        Authorization: `Bearer ${user.accessToken}`,
      },
      Number(spotId),
    );

    useSyncSpotMutate();
    useSyncStampMutate();

    notify();
  };

  return (
    <>
      {spot && (
        <article className="mx-auto flex w-[calc(100%-24px*2)] max-w-2xl flex-col gap-y-4 pb-16 pt-8">
          {/* タイトル (おとずれた数) / スタンプ */}
          <div className="flex items-center justify-start">
            {/* タイトル (おとずれた数) */}
            <div className="flex w-[calc(100%-64px)] flex-col gap-y-1">
              <h2 className="text-2xl font-bold">{spot?.name || ''}</h2>
              <p className="text-sm">{spot?.numberOfVisits || 0} Visited</p>
            </div>
            {/* スタンプ */}
            <div className="flex size-16 items-center justify-center rounded-full border">
              <img
                src={'/images/kabusan_smile.png'}
                alt={'スタンプ'}
                className={`w-auto transition-opacity duration-300 ${stamp?.isExistStamp ? 'h-full !opacity-100' : 'h-[500%] opacity-0'}`}
              ></img>
            </div>
          </div>
          {/* 住所 */}
          <div className="flex">
            <p className="text-base">住所: {spot?.address || ''}</p>
          </div>
          {/* 画像 (スライダー) */}
          {spot?.imageList && spot?.imageList.length > 0 && (
            <div className="flex w-full">
              <Swiper
                spaceBetween={50}
                centeredSlides={true}
                slidesPerView={1}
                onSlideChange={(swiper) => console.log(swiper)}
                onSwiper={(swiper) => console.log(swiper)}
                pagination={{
                  type: 'fraction',
                }}
                modules={[Pagination, Mousewheel, EffectCube]}
                // effect="cube"
              >
                {spot.imageList.map((image, i) => (
                  <SwiperSlide
                    key={i}
                    className="h-64 max-h-96 w-full sm:h-screen"
                  >
                    <div className="flex h-64 max-h-96 w-full items-center overflow-y-hidden bg-gray-400 sm:h-screen">
                      <img
                        src={
                          image.imagePath.includes('localhost')
                            ? image.imagePath.replace(
                                'http://localhost',
                                process.env.NEXT_PUBLIC_API_BASE_URL as string,
                              )
                            : image.imagePath
                        }
                        alt={'スポットの画像'}
                        className="h-auto w-full object-cover object-center align-top"
                      ></img>
                    </div>
                  </SwiperSlide>
                ))}
                <SlidePrevButton />
                <SlideNextButton />
              </Swiper>
            </div>
          )}

          {/* 投稿者のコメント */}
          <div className="mb-4">
            <h3 className="mb-2 text-xl">投稿者のコメント</h3>
            <p>{spot?.comment || ''}</p>
          </div>
          {/* スタンプ取得ボタン */}
          {user && (
            <div className="flex justify-center">
              <button
                className="flex h-10 items-center justify-center rounded-lg bg-blue-500 px-16 text-white disabled:opacity-50"
                onClick={useHandlePushStamp}
                disabled={stamp?.isExistStamp || !canPush}
              >
                {stamp?.isExistStamp ? '取得済み' : 'スタンプ取得'}
              </button>
            </div>
          )}
        </article>
      )}
    </>
  );
}
