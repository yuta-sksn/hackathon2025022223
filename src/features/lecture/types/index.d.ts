/**
 * Data Object
 */

export type LectureObject = {
  id: number;
  name: string;
  nameEn: string;
}

export type Lecture = LectureObject

export type Lectures = {
  objects: LectureObject[];
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

export type LectureObjectResponse = {
  id: number;
  name: string;
  name_en: string;
}

export type LectureResponse = LectureObjectResponse

export type LecturesResponse = {
  objects: LectureObjectResponse[];
  pagination: {
    current_page: number;
    is_last_page: boolean;
    next_page: number | null;
    object_size: number;
    prev_page: number | null;
    total_pages: number;
  }
}