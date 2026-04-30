'use client'
import { DashboardStats } from '@/widgets/DashboardStats'
import { DashboardChart } from '@/widgets/DashboardChart'
import { CategoryStats } from '@/widgets/CategoryStats'
import { useTranslation } from 'react-i18next'

export default function DashboardPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('dashboard.title')}</h1>
      <DashboardStats />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardChart />
        </div>
        <div>
          <CategoryStats />
        </div>
      </div>
    </div>
  )
}
