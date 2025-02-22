import { ProfessorObject, ProfessorObjectResponse } from '@/features/professor/types'
import { UniversityObject, UniversityObjectResponse } from "@/features/university/types";
import { FacultyObject, FacultyObjectResponse } from "@/features/faculty/types";
import { LectureObject, LectureObjectResponse } from "@/features/lecture/types";
import { UseFormRegisterReturn } from 'react-hook-form'

export type SearchReviewsFormValues = {
  lectureId: string;
}

export type UseSearchReviewsFormRegisterReturns = {
  lectureId: UseFormRegisterReturn<'lectureId'>;
}

export type PostReviewFormValues = {
  facultyId: string
  facultyName?: string | null
  lectureId: string
  lectureName?: string | null
  rate: number
  comment: string
  status: string
  images?: FileList | File[]
  difficulty: string
  assignment: string
  attendance: string
  tagIds: number[]
}

export type UsePostReviewFormRegisterReturns = {
  facultyId: UseFormRegisterReturn<'facultyId'>
  facultyName: UseFormRegisterReturn<'facultyName'>
  lectureId: UseFormRegisterReturn<'lectureId'>
  lectureName: UseFormRegisterReturn<'lectureName'>
  rate: UseFormRegisterReturn<'rate'>
  comment: UseFormRegisterReturn<'comment'>
  status: UseFormRegisterReturn<'status'>
  images: UseFormRegisterReturn<'images'>
  difficulty: UseFormRegisterReturn<'difficulty'>
  assignment: UseFormRegisterReturn<'assignment'>
  attendance: UseFormRegisterReturn<'attendance'>
  tagIds: UseFormRegisterReturn<'tagIds'>
}

/**
 * Request
 */
export type PostReviewRequest = {
  facultyId?: number
  facultyName?: string | null
  lectureId?: number
  lectureName?: string | null
  rate: number
  comment: string
  status: string
  // images?: FileList | File[]
  difficulty?: number
  assignment?: number
  attendance?: number
  tagIds: number[]
}

/**
 * Data Object
 */

export type UserDetailObject = {
  name: string;
  screenName: string;
  profileIconUrl: string;
}

export type DetailsObject = {
  attendance: number | null;
  assignment: number | null;
  difficulty: number | null;
}

export type UserDetail = UserDetailObject
export type Details = DetailsObject

export type ReviewObject = {
  uuid: string;
  rate: number;
  comment: string;
  status: string;
  details: DetailsObject;
  createdAt: string;
  updatedAt: string;
  faculty: FacultyObject;
  lecture: LectureObject;
  professor: ProfessorObject
  university: UniversityObject
  userDetail: UserDetailObject
  reviewTags: any[]
}

export type Review = ReviewObject

export type Reviews = {
  objects: ReviewObject[];
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

export type UserDetailObjectResponse = {
  name: string;
  screen_name: string;
  profile_ico_url: string;
}

export type DetailsObjectResponse = {
  attendance: number | null;
  assignment: number | null;
  difficulty: number | null;
}

export type UserDetailResponse = UserDetailObjectResponse
export type DetailsResponse = DetailsObjectResponse

export type ReviewObjectResponse = {
  uuid: string;
  rate: number;
  comment: string;
  status: string;
  details: DetailsObjectResponse;
  created_at: string;
  updated_at: string;
  faculty: FacultyObjectResponse;
  lecture: LectureObjectResponse;
  professor: ProfessorObjectResponse
  university: UniversityObjectResponse
  user_detail: UserDetailObjectResponse
  review_tags: any[]
}

export type ReviewResponse = ReviewObjectResponse

export type ReviewsResponse = {
  objects: ReviewObjectResponse[];
  pagination: {
    current_page: number;
    is_last_page: boolean;
    next_page: number | null;
    object_size: number;
    prev_page: number | null;
    total_pages: number;
  }
}
