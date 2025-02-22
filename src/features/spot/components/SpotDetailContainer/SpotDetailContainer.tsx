'use client';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import { Pagination, Mousewheel, EffectCube } from 'swiper/modules';
import { useEffect, useState } from 'react';
import useSyncSpot from '../../api/useSyncSpot';
import { useParams, useSearchParams } from 'next/navigation';

export default function SpotDetailContainer() {
  const searchParams = useSearchParams();
  const { spot_id: spotId } = useParams<{ spot_id: string }>();

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
  } = useSyncSpot(Number(spotId));

  useEffect(() => {
    console.log(spot);
  }, [spot]);

  // スライダーモック
  const data: string[] = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];

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

  const handlePushStamp = () => {
    alert('スタンプ押すよ！');
  };

  return (
    <article className="mx-auto flex w-[calc(100%-24px*2)] max-w-2xl flex-col gap-y-4 pb-16 pt-8">
      {/* タイトル (おとずれた数) / スタンプ */}
      <div className="flex items-center justify-start">
        {/* タイトル (おとずれた数) */}
        <div className="w-[calc(100%-64px)]">
          <h2 className="text-2xl">{spot?.name || ''}</h2>
          <p className="text-sm">{spot?.numberOfVisits || 0} Visited</p>
        </div>
        {/* スタンプ */}
        <div className="flex size-16 items-center justify-center rounded-full border">
          <img
            src={'/images/ashiato.svg'}
            alt={'スタンプ'}
            className={`h-3/4 w-auto ${spot?.isVisited ? '!opacity-100' : 'opacity-0'}`}
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
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{
              type: 'fraction',
            }}
            modules={[Pagination, Mousewheel, EffectCube]}
            // effect="cube"
          >
            {spot.imageList.map((image, i) => (
              <SwiperSlide key={i} className="h-64 max-h-96 w-full sm:h-screen">
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
      <div className="flex justify-center">
        <button
          className="flex h-10 items-center justify-center rounded-lg bg-blue-500 px-16 text-white"
          onClick={handlePushStamp}
        >
          スタンプ取得
        </button>
      </div>
    </article>
  );
}
