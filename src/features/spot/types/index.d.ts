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

export type SpotObject = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  numberOfVisits: number;
  isVisited: boolean;
};

export type Spot = SpotObject;

export type Spots = {
  nicheSpots: SpotObject[];
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

export type SpotObjectResponse = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  number_of_visits: number;
  is_visited?: boolean;
};

export type SpotResponse = SpotObjectResponse;

export type SpotsResponse = {
  niche_spots: SpotObjectResponse[];
  pagination: {
    current_page: number;
    is_last_page: boolean;
    next_page: number | null;
    object_size: number;
    prev_page: number | null;
    total_pages: number;
  };
};
