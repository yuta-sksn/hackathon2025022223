import { UseFormRegisterReturn } from 'react-hook-form';

export type PatchUserFormValues = {
  lastEducationspotName: string;
  lastEducationFacultyName: string;
  lastEducationStartAt: string;
  lastEducationEndAt: string;
};

export type UsePatchUserFormRegisterReturns = {
  lastEducationspotName: UseFormRegisterReturn<'lastEducationspotName'>;
  lastEducationFacultyName: UseFormRegisterReturn<'lastEducationFacultyName'>;
  lastEducationStartAt: UseFormRegisterReturn<'lastEducationStartAt'>;
  lastEducationEndAt: UseFormRegisterReturn<'lastEducationEndAt'>;
};

export type PatchUserRequest = {
  lastEducationspotName: string;
  lastEducationFacultyName: string;
  lastEducationStartAt: string;
  lastEducationEndAt: string;
};
