import { User } from 'firebase/auth';
import { UseFormRegisterReturn } from 'react-hook-form';

export type AuthFormValues = {
  email: string;
  password: string;
};

export type UseAuthFormRegisterReturns = {
  email: UseFormRegisterReturn<'email'>;
  password: UseFormRegisterReturn<'password'>;
};

export type PasswordForgetFormValues = {
  email: string;
};

export type UsePasswordForgetFormRegisterReturns = {
  email: UseFormRegisterReturn<'email'>;
};

export type PasswordResetFormValues = {
  password: string;
  confirmPassword: string;
};

export type UsePasswordResetFormRegisterReturns = {
  password: UseFormRegisterReturn<'password'>;
  confirmPassword: UseFormRegisterReturn<'confirmPassword'>;
};

export type FirebaseAuthResult = {
  success: boolean;
  message: string;
  user: User;
};

export type UserByResource = {
  name?: string;
  screenName?: string;
  profileIconUrl?: string | null;
  lastEducationspotName?: string | null;
  lastEducationFacultyName?: string | null;
  lastEducationStartAt?: string | null;
  lastEducationEndAt?: string | null;
};
