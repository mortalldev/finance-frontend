'use client'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/shared/store'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/widgets/Navbar'
import { MobileNav } from '@/widgets/MobileNav'
import { useGetMeQuery } from '@/shared/api/authApi'
import { setUser, logout } from '@/entities/user/model/userSlice'

import { Loader } from '@/shared/ui/Loader'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.user)
  const router = useRouter()
  const dispatch = useDispatch()
  const { data: user, error, isLoading } = useGetMeQuery(undefined, { skip: !isAuthenticated })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (user) {
      dispatch(setUser(user))
    }
    if (error) {
      dispatch(logout())
      router.push('/login')
    }
  }, [user, error, dispatch, router])

  if (!isAuthenticated || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
        <Loader />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-indigo-50 pb-20 transition-colors duration-500 md:pb-8 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      <MobileNav />
    </div>
  )
}
