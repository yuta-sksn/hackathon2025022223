import SearchField from '@/components/elements/SearchField/SearchField';
import SpotsContainer from '@/features/spot/components/SpotsContainer/SpotsContainer';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';

export type SearchSpotsValues = {
  keyword: string;
};

export type UseSearchSpotsRegisterReturns = {
  keyword: UseFormRegisterReturn<'keyword'>;
};

export default function Home() {
  // const searchParams = useSearchParams();
  // const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');

  // const { register, handleSubmit, formState } = useForm<SearchSpotsValues>({
  //   mode: 'onSubmit',
  //   reValidateMode: 'onChange',
  //   defaultValues: {
  //     keyword,
  //   },
  // });

  // const searchSpotsRegisterReturns: UseSearchSpotsRegisterReturns = {
  //   keyword: register('keyword'),
  // };

  return (
    <main className="w-full">
      <SpotsContainer />
      {/* <SearchField label="" register={register} /> */}
    </main>
  );
}
