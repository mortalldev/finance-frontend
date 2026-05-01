'use client'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/shared/store'
import { useLogoutUserMutation } from '@/shared/api/authApi'
import { logout } from '@/entities/user/model/userSlice'
import { Button } from '@/shared/ui/button'
import { LogOut, Zap } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { useState } from 'react'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'

export function Navbar() {
  const { t } = useTranslation()
  const user = useSelector((state: RootState) => state.user.user)
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation()
  const dispatch = useDispatch()
  const pathname = usePathname()
  const router = useRouter()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap()
      dispatch(logout())
      router.push('/login')
    } catch {
      // Even if API fails, logout locally
      dispatch(logout())
      router.push('/login')
    }
  }

  const navs = [
    { name: t('dashboard.title'), path: '/' },
    { name: t('xarajat.title'), path: '/xarajatlar' },
    { name: t('settings.title'), path: '/settings' },
  ]

  return (
    <nav className="glass sticky top-4 z-50 mx-4 mt-4 hidden items-center justify-between rounded-2xl border border-white/40 px-8 py-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-xl md:flex dark:border-slate-700/50 dark:bg-slate-900/60">
      <div className="flex items-center gap-12">
        <Link href="/" className="group flex items-center gap-2">
          <div className="rounded-xl bg-blue-600 p-2 transition-transform duration-300 group-hover:scale-110">
            <Zap className="fill-white text-white" size={20} />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-black tracking-tight text-transparent dark:from-blue-400 dark:to-indigo-400">
            Financy
          </span>
        </Link>
        <div className="flex gap-2 rounded-xl border border-slate-200/50 bg-slate-100/50 p-1.5 dark:border-slate-700/50 dark:bg-slate-800/50">
          {navs.map((n) => {
            const isActive = pathname === n.path
            return (
              <Link
                key={n.path}
                href={n.path}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
                }`}
              >
                {n.name}
              </Link>
            )
          })}
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            Foydalanuvchi
          </span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
            {user?.fullName}
          </span>
        </div>
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowLogoutModal(true)}
          className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30"
        >
          <LogOut size={20} />
        </Button>
      </div>

      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title={t('auth.logoutTitle')}
        description={t('auth.logoutConfirm')}
        loading={isLoggingOut}
      />
    </nav>
  )
}
