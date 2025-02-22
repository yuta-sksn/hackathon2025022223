import { UseFormRegisterReturn } from "react-hook-form"

/**
 * Search Universities Form
 */

export type SearchUniversitiesValues = {
  keyword: string
}

export type UseSearchUniversitiesRegisterReturns = {
  keyword: UseFormRegisterReturn<'keyword'>
}

/**
 * Data Object
 */

export type UniversityObject = {
  address: string;
  bannerImageUrl: string | null;
  description: string;
  name: string;
  nameEn: string;
  nameKana: string;
  thumbnailImageUrl: string | null;
  url: string;
  uuid: string;
}

export type University = UniversityObject

export type Universities = {
  objects: UniversityObject[];
  pagination: {
    currentPage: number;
    isLastPage: boolean;
    nextPage: number | null;
    objectSize: number;
    prevPage: number | null;
    totalPages: number;
  }
}

/**
 * Response
 */

export type UniversityObjectResponse = {
  address: string;
  banner_image_url: string | null;
  description: string;
  name: string;
  name_en: string;
  name_kana: string;
  thumbnail_image_url: string | null;
  url: string;
  uuid: string;
}

export type UniversityResponse = UniversityObjectResponse

export type UniversitiesResponse = {
  objects: UniversityObjectResponse[];
  pagination: {
    current_page: number;
    is_last_page: boolean;
    next_page: number | null;
    object_size: number;
    prev_page: number | null;
    total_pages: number;
  }
}