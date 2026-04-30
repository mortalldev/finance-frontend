'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'
import { useGetTopCategoriesQuery } from '@/shared/api/xarajatApi'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { formatMoney } from '@/shared/lib/formatMoney'

const COLORS = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
]

import { Loader } from '@/shared/ui/Loader'

export function CategoryStats() {
  const { data, isLoading } = useGetTopCategoriesQuery({})

  return (
    <Card className="h-full border-white/40 dark:border-slate-700/50">
      <CardHeader>
        <CardTitle>Kategoriyalar</CardTitle>
      </CardHeader>
      <CardContent className="flex h-80 flex-col">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data || []}
                    dataKey="summa"
                    nameKey="kategoriya"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                  >
                    {data?.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [formatMoney(Number(value)), 'Summa']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="no-scrollbar mt-4 flex-1 space-y-3 overflow-y-auto">
              {data?.length === 0 ? (
                <div className="flex flex-1 items-center justify-center text-sm text-slate-400 italic">
                  Ma'lumotlar yo'q
                </div>
              ) : (
                data?.map((c: any, i: number) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-2.5 text-sm dark:border-slate-800 dark:bg-slate-800/30"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2.5 w-2.5 rounded-full shadow-sm"
                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                      />
                      <span className="w-32 truncate font-bold text-slate-700 dark:text-slate-300">
                        {c.kategoriya}
                      </span>
                    </div>
                    <span className="font-black text-blue-600 dark:text-blue-400">
                      {formatMoney(c.summa)}{' '}
                      <span className="text-[10px] text-slate-400">so'm</span>
                    </span>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
