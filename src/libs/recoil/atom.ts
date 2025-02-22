import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { LoginModalStateProps, LogoutModalStateProps, UserStateProps } from './types'

// 永続化設定 (Local Storage)
const { persistAtom } = recoilPersist({
	key: 'recoil-persist',
	storage: typeof window === 'undefined' ? undefined : localStorage
})

export const LoginModalState = atom<LoginModalStateProps>({
  key: 'LoginModalState',
  default: {
    isOpen: false,
  },
})

export const LogoutModalState = atom<LogoutModalStateProps>({
  key: 'LogoutModalState',
  default: {
    isOpen: false,
  },
})

export const UserState = atom<UserStateProps>({
  key: 'UserState',
  default: {
    name: '',
    screenName: '',
    profileIconUrl: null,
    lastEducationUniversityName: null,
    lastEducationFacultyName: null,
    lastEducationStartAt: null,
    lastEducationEndAt: null,
  },
  // 永続化
  effects_UNSTABLE: [persistAtom],
})