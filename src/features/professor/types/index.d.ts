import { FacultyObject, FacultyObjectResponse } from "@/features/faculty/types";
import { LectureObject, LectureObjectResponse } from "@/features/lecture/types";
import { University, UniversityResponse } from "@/features/university/types";
import { UseFormRegisterReturn } from "react-hook-form"

/**
 * Form
 */

export type SearchProfessorsFormValues = {
  keyword: string;
  facultyId: string;
}

export type UseSearchProfessorsFormRegisterReturns = {
  keyword: UseFormRegisterReturn<'keyword'>;
  facultyId: UseFormRegisterReturn<'facultyId'>;
}

/**
 * Data Object
 */

export type ReviewMeanScoreObject = {
  meanScore: number | null;
}

export type ReviewMeanScore = ReviewMeanScoreObject;

export type ProfessorObject = {
  id: number;
  imageUrl: string | null;
  description: string;
  name: string;
  nameEn: string;
  nameKana: string;
  uuid: string;
  reviewMeanScore: number | ReviewMeanScore | null;
  reviewQuantity: number;
  lectures: LectureObject[];
  faculties: FacultyObject[];
}

export type Professor = ProfessorObject

export type TopProfessorObject = ProfessorObject & {
  universities: University[]
}

export type TopProfessor = TopProfessorObject

export type Professors = {
  objects: ProfessorObject[];
  pagination: {
    currentPage: number;
    isLastPage: boolean;
    nextPage: number | null;
    objectSize: number;
    prevPage: number | null;
    totalPages: number;
  }
}

export type TopProfessors = {
  objects: TopProfessorObject[];
  pagination: {
    currentPage: number;
    isLastPage: boolean;
    nextPage: number | null;
    objectSize: number;
    prevPage: number | null;
    totalPages: number;
  }
}

export type ProfessorReviewSummaryObject = {
  data: {
    id: string;
    type: 'review_summary';
    attributes: {
      id: number;
      distribution: {
        rate1?: number;
        rate2?: number;
        rate3?: number;
        rate4?: number;
        rate5?: number;
      }
      mean: number;
    }
  }
}

export type ProfessorReviewSummary = ProfessorReviewSummaryObject

/**
 * Response
 */

export type ProfessorObjectResponse = {
  id: number;
  image_url: string | null;
  description: string;
  name: string;
  name_en: string;
  name_kana: string;
  uuid: string;
  review_mean_score: number | {
    mean_score: number | null;
  } | null;
  review_quantity: number;
  lectures: LectureObjectResponse[];
  faculties: FacultyObjectResponse[];
}

export type ProfessorResponse = ProfessorObjectResponse

export type TopProfessorObjectResponse = ProfessorObjectResponse & {
  universities: UniversityResponse[]
}

export type TopProfessorResponse = TopProfessorObjectResponse

export type ProfessorsResponse = {
  objects: ProfessorObjectResponse[];
  pagination: {
    current_page: number;
    is_last_page: boolean;
    next_page: number | null;
    object_size: number;
    prev_page: number | null;
    total_pages: number;
  }
}

export type TopProfessorsResponse = {
  objects: TopProfessorObjectResponse[];
  pagination: {
    current_page: number;
    is_last_page: boolean;
    next_page: number | null;
    object_size: number;
    prev_page: number | null;
    total_pages: number;
  }
}

export type ProfessorReviewSummaryObjectResponse = {
  data: {
    id: string;
    type: 'review_summary';
    attributes: {
      id: number;
      distribution: {
        rate_1?: number;
        rate_2?: number;
        rate_3?: number;
        rate_4?: number;
        rate_5?: number;
      }
      mean: number;
    }
  }
}

export type ProfessorReviewSummaryResponse = ProfessorReviewSummaryObjectResponse
