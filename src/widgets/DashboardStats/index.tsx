'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useTranslation } from 'react-i18next'
import { useGetXarajatStatsQuery } from '@/shared/api/xarajatApi'
import { formatMoney } from '@/shared/lib/formatMoney'
import { Wallet, TrendingUp, CalendarDays, Award } from 'lucide-react'
import { motion } from 'framer-motion'

export function DashboardStats() {
  const { t } = useTranslation()
  const { data, isLoading } = useGetXarajatStatsQuery({})

  const stats = [
    {
      title: t('dashboard.todayExpenses'),
      value: data?.today ? `${formatMoney(data.today)} so'm` : '0',
      icon: <Wallet className="text-blue-500" />,
    },
    {
      title: t('dashboard.thisWeek'),
      value: data?.thisWeek ? `${formatMoney(data.thisWeek)} so'm` : '0',
      icon: <TrendingUp className="text-green-500" />,
    },
    {
      title: t('dashboard.thisMonth'),
      value: data?.thisMonth ? `${formatMoney(data.thisMonth)} so'm` : '0',
      icon: <CalendarDays className="text-purple-500" />,
    },
    {
      title: t('dashboard.topCategory'),
      value: data?.topKategoriya || '-',
      icon: <Award className="text-orange-500" />,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((s, i) => (
        <motion.div variants={item} key={i}>
          <Card className="transition-transform duration-300 hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-bold tracking-wider text-slate-500 uppercase">
                {s.title}
              </CardTitle>
              <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">{s.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                {isLoading ? (
                  <div className="h-8 w-32 animate-pulse rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700" />
                ) : (
                  s.value
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
