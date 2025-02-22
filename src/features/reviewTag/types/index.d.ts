/**
 * Data Object
 */
export type ReviewTagObject = {
  id: number;
  name: string;
  nameEn: string;
  weight: number;
}

export type ReviewTag = ReviewTagObject

export type ReviewTags = ReviewTag[]

/**
 * Response
 */
export type ReviewTagObjectResponse = {
  id: number;
  name: string;
  name_en: string;
  weight: number;
}

export type ReviewTagResponse = ReviewTagObjectResponse

export type ReviewTagsResponse = ReviewTagResponse[]
