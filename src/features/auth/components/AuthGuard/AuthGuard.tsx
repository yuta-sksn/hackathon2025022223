import { useAuthContext } from '@/features/auth/components/AuthProvider/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'

import classes from './AuthGuard.module.scss'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const { user } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    // 未認証の場合
    if (user === null) {
      // TOP ページに遷移 (replace)
      router.replace('/')
    }
  })

  // 未認証もしくは認証が未完了の場合
  if (!user) {
    return <div className={classes.authGuard}>
      <div className={classes.authGuardLoading}><span /></div>
    </div>
  }

  // 認証済みなら通常レンダリング
  return <>{children}</>
}