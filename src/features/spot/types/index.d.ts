import { UseFormRegisterReturn } from 'react-hook-form';

/**
 * Search Spots Form
 */

export type SearchSpotsValues = {
  keyword: string;
};

export type UseSearchSpotsRegisterReturns = {
  keyword: UseFormRegisterReturn<'keyword'>;
};

/**
 * Data Object
 */

export type spotObject = {
  address: string;
  bannerImageUrl: string | null;
  description: string;
  name: string;
  nameEn: string;
  nameKana: string;
  thumbnailImageUrl: string | null;
  url: string;
  uuid: string;
};

export type spot = spotObject;

export type Spots = {
  objects: spotObject[];
  pagination: {
    currentPage: number;
    isLastPage: boolean;
    nextPage: number | null;
    objectSize: number;
    prevPage: number | null;
    totalPages: number;
  };
};

/**
 * Response
 */

export type spotObjectResponse = {
  address: string;
  banner_image_url: string | null;
  description: string;
  name: string;
  name_en: string;
  name_kana: string;
  thumbnail_image_url: string | null;
  url: string;
  uuid: string;
};

export type spotResponse = spotObjectResponse;

export type SpotsResponse = {
  objects: spotObjectResponse[];
  pagination: {
    current_page: number;
    is_last_page: boolean;
    next_page: number | null;
    object_size: number;
    prev_page: number | null;
    total_pages: number;
  };
};
