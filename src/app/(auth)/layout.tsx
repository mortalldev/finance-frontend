'use client'
import { useSelector } from 'react-redux'
import { RootState } from '@/shared/store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSelector((state: RootState) => state.user)
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  if (!mounted || isAuthenticated) return null

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-purple-100 px-4 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] animate-pulse rounded-full bg-blue-400/20 blur-[120px]" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] animate-pulse rounded-full bg-purple-400/20 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="z-10 w-full max-w-lg"
      >
        <div className="glass rounded-3xl border border-white/40 p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] sm:p-12 dark:border-slate-700/50 dark:bg-slate-900/40">
          <div className="mb-10 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex items-center justify-center gap-2"
            >
              <div className="rounded-xl bg-blue-600 p-2">
                <Zap className="text-white" size={24} />
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-800 dark:text-white">
                Financy
              </h1>
            </motion.div>
            <p className="mt-2 font-medium text-slate-500 dark:text-slate-400">
              Barcha xarajatlaringiz bir joyda
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={router.toString()}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
