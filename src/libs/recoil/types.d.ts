import { UserByResource } from '@/features/auth/types'

export type ModalStateProps = {
  isOpen: boolean;
}

export type LoginModalStateProps = ModalStateProps
export type LogoutModalStateProps = ModalStateProps

export type UserStateProps = UserByResource
