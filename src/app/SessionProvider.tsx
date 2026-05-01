'use client'

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGetMeQuery } from '@/shared/api/authApi'
import { setUser, logout } from '@/entities/user/model/userSlice'
import { Loader } from '@/shared/ui/Loader'

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const [isInitializing, setIsInitializing] = useState(true)
  const {
    data: user,
    error,
    isSuccess,
    isError,
    isLoading,
  } = useGetMeQuery(undefined, {
    // Har doim birinchi yuklanganda tekshiramiz
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (isSuccess && user) {
      dispatch(setUser({ user }))
      setIsInitializing(false)
    } else if (isError) {
      dispatch(logout())
      setIsInitializing(false)
    } else if (!isLoading && !user) {
      // Agarda yuklash tugasa va ma'lumot bo'lmasa
      setIsInitializing(false)
    }
  }, [user, isSuccess, isError, isLoading, dispatch])

  if (isInitializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
