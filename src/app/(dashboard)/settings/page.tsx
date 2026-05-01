'use client'

import { useTranslation } from 'react-i18next'
import { useTheme } from 'next-themes'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Label } from '@/shared/ui/label'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/shared/store'
import { motion } from 'framer-motion'
import { User, Palette, Languages, ShieldCheck, Mail, UserCircle, LogOut } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { ProfileEditModal } from '@/features/user/ui/ProfileEditModal'
import { useLogoutUserMutation } from '@/shared/api/authApi'
import { logout } from '@/entities/user/model/userSlice'
import { useRouter } from 'next/navigation'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'

export default function SettingsPage() {
  const { t, i18n } = useTranslation()
  const { theme, setTheme } = useTheme()
  const user = useSelector((state: RootState) => state.user.user)
  const [mounted, setMounted] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation()
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await logoutUser({}).unwrap()
      dispatch(logout())
      router.push('/login')
    } catch {
      dispatch(logout())
      router.push('/login')
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-4xl space-y-8 pb-12"
    >
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {t('settings.title')}
          </h1>
          <p className="mt-1 text-slate-500">Shaxsiy profil va ilova sozlamalari</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Info */}
        <motion.div variants={item} className="lg:col-span-1">
          <Card className="group relative h-full overflow-hidden border-white/40 dark:border-slate-700/50">
            <div className="absolute top-0 left-0 h-24 w-full bg-gradient-to-br from-blue-600 to-indigo-600" />
            <CardContent className="relative z-10 flex flex-col items-center pt-12">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white text-3xl font-black text-blue-600 shadow-xl dark:border-slate-900 dark:bg-slate-800 dark:text-blue-400">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <h2 className="mt-4 text-center text-xl font-bold text-slate-900 dark:text-white">
                {user?.fullName}
              </h2>
              <p className="text-sm font-medium text-slate-500 italic">@{user?.username}</p>

              <div className="mt-8 w-full space-y-4">
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <Mail className="text-slate-400" size={18} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      Email
                    </span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {user?.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                  <ShieldCheck className="text-green-500" size={18} />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                      Status
                    </span>
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      Tasdiqlangan
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="mt-8 w-full rounded-xl"
                variant="outline"
                onClick={() => setIsEditModalOpen(true)}
              >
                Profilni tahrirlash
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings */}
        <motion.div variants={item} className="space-y-6 lg:col-span-2">
          {/* Appearance */}
          <Card className="border-white/40 dark:border-slate-700/50">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400">
                <Palette size={20} />
              </div>
              <div>
                <CardTitle>{t('settings.theme')}</CardTitle>
                <CardDescription>Ilovaning tashqi ko'rinishini sozlang</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
                <Label className="font-bold text-slate-700 dark:text-slate-300">
                  {t('settings.theme')}
                </Label>
                <Select value={theme} onValueChange={(val) => val && setTheme(val)}>
                  <SelectTrigger className="h-11 w-40 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="light">{t('settings.light')}</SelectItem>
                    <SelectItem value="dark">{t('settings.dark')}</SelectItem>
                    <SelectItem value="system">{t('settings.system')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Localization */}
          <Card className="border-white/40 dark:border-slate-700/50">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400">
                <Languages size={20} />
              </div>
              <div>
                <CardTitle>{t('settings.language')}</CardTitle>
                <CardDescription>O'zingizga qulay tilni tanlang</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/30">
                <Label className="font-bold text-slate-700 dark:text-slate-300">
                  {t('settings.language')}
                </Label>
                <Select
                  value={i18n.language}
                  onValueChange={(val) => val && i18n.changeLanguage(val)}
                >
                  <SelectTrigger className="h-11 w-40 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="uz">O'zbekcha</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security (Placeholder) */}
          <Card className="border-white/40 opacity-60 dark:border-slate-700/50">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-xl bg-slate-50 p-2.5 text-slate-600 dark:bg-slate-950/30 dark:text-slate-400">
                <UserCircle size={20} />
              </div>
              <div>
                <CardTitle>Xavfsizlik</CardTitle>
                <CardDescription>Parolni o'zgartirish va 2FA (Tez kunda)</CardDescription>
              </div>
            </CardHeader>
          </Card>

          {/* Logout (Mobile Only) */}
          <Card className="border-red-100 bg-red-50/30 md:hidden dark:border-red-900/30 dark:bg-red-950/10">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-xl bg-red-100 p-2.5 text-red-600 dark:bg-red-950/50 dark:text-red-400">
                <LogOut size={20} />
              </div>
              <div className="flex-1">
                <CardTitle className="text-red-600 dark:text-red-400">{t('auth.logout')}</CardTitle>
                <CardDescription>Tizimdan xavfsiz chiqish</CardDescription>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="rounded-xl"
                onClick={() => setShowLogoutModal(true)}
              >
                {t('auth.logout')}
              </Button>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
      <ConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        title={t('auth.logoutTitle')}
        description={t('auth.logoutConfirm')}
        loading={isLoggingOut}
      />
    </motion.div>
  )
}
