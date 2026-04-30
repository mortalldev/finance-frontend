'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useGetXarajatChartQuery } from '@/shared/api/xarajatApi'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { formatMoney } from '@/shared/lib/formatMoney'
import { Loader } from '@/shared/ui/Loader'

export function DashboardChart() {
  const { t } = useTranslation()
  const [period, setPeriod] = useState('7d')
  const { data, isLoading } = useGetXarajatChartQuery(period)

  return (
    <Card className="h-full border-white/40 dark:border-slate-700/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('dashboard.statsChart')}</CardTitle>
        <Select value={period} onValueChange={(v) => v && setPeriod(v)}>
          <SelectTrigger className="h-10 w-32 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7d">7 kun</SelectItem>
            <SelectItem value="30d">30 kun</SelectItem>
            <SelectItem value="year">Yil</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-80">
        {isLoading ? (
          <Loader />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data || []}>
              <defs>
                <linearGradient id="colorSum" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
                opacity={0.5}
              />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '16px',
                  border: 'none',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(8px)',
                }}
                formatter={(value: any) => [formatMoney(Number(value)) + " so'm", 'Xarajat']}
              />
              <Area
                type="monotone"
                dataKey="summa"
                stroke="#3b82f6"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSum)"
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
