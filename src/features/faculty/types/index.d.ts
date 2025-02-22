/**
 * Data Object
 */

export type FacultyObject = {
  id: number;
  name: string;
  nameEn: string;
}

export type Faculty = FacultyObject

export type Faculties = {
  objects: FacultyObject[];
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

export type FacultyObjectResponse = {
  id: number;
  name: string;
  name_en: string;
}

export type FacultyResponse = FacultyObjectResponse

export type FacultiesResponse = {
  objects: FacultyObjectResponse[];
  pagination: {
    current_page: number;
    is_last_page: boolean;
    next_page: number | null;
    object_size: number;
    prev_page: number | null;
    total_pages: number;
  }
}