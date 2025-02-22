import { UseFormRegisterReturn } from 'react-hook-form'

export type PatchUserFormValues = {
  lastEducationUniversityName: string;
  lastEducationFacultyName: string;
  lastEducationStartAt: string;
  lastEducationEndAt: string;
}

export type UsePatchUserFormRegisterReturns = {
  lastEducationUniversityName: UseFormRegisterReturn<'lastEducationUniversityName'>
  lastEducationFacultyName: UseFormRegisterReturn<'lastEducationFacultyName'>
  lastEducationStartAt: UseFormRegisterReturn<'lastEducationStartAt'>
  lastEducationEndAt: UseFormRegisterReturn<'lastEducationEndAt'>
}

export type PatchUserRequest = {
  lastEducationUniversityName: string;
  lastEducationFacultyName: string;
  lastEducationStartAt: string;
  lastEducationEndAt: string;
}
