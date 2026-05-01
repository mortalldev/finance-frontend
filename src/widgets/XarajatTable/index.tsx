'use client'
import { useState } from 'react'
import { formatMoney } from '@/shared/lib/formatMoney'
import { formatDate } from '@/shared/lib/formatDate'
import { useTranslation } from 'react-i18next'
import { Card, CardContent } from '@/shared/ui/card'
import { Edit2, Trash2, MapPin, Tag, Calendar, MoreHorizontal } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { ConfirmModal } from '@/shared/ui/ConfirmModal'
import { useDeleteXarajatMutation } from '@/shared/api/xarajatApi'
import toast from 'react-hot-toast'
import { XarajatEditModal } from '@/features/xarajat-crud/ui/XarajatEditModal'
import { motion, AnimatePresence } from 'framer-motion'

interface XarajatTableProps {
  data: any[]
  view: 'table' | 'card'
}

export function XarajatTable({ data, view }: XarajatTableProps) {
  const { t } = useTranslation()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [editItem, setEditItem] = useState<any | null>(null)
  const [deleteXarajat, { isLoading: isDeleting }] = useDeleteXarajatMutation()

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await deleteXarajat(deleteId).unwrap()
      toast.success("Muvaffaqiyatli o'chirildi")
      setDeleteId(null)
    } catch {
      toast.error('Xatolik yuz berdi')
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  if (view === 'card') {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence>
          {data.map((item) => (
            <motion.div key={item.id} variants={itemAnim} layout>
              <Card className="group flex h-full flex-col overflow-hidden border-white/40 dark:border-slate-700/50">
                <CardContent className="flex flex-1 flex-col p-0">
                  <div className="flex-1 p-6">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="rounded-2xl bg-blue-50 p-2.5 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                        <Tag size={20} />
                      </div>
                      <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                        {formatMoney(item.miqdor)}{' '}
                        <span className="text-sm font-bold text-slate-400">so'm</span>
                      </span>
                    </div>

                    <h3 className="mb-1 line-clamp-1 text-lg font-bold text-slate-800 dark:text-slate-200">
                      {item.nom}
                    </h3>
                    <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase dark:bg-slate-800">
                        {item.kategoriya}
                      </span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(item.sana)}
                      </div>
                    </div>

                    {item.manzil && (
                      <div className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-800/30 dark:text-slate-500">
                        <MapPin size={14} className="mt-0.5 shrink-0" />
                        <span className="line-clamp-2 italic">{item.manzil}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 border-t border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditItem(item)}
                      className="h-9 rounded-lg"
                    >
                      <Edit2 size={14} className="mr-2" /> Tahrirlash
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(item.id)}
                      className="h-9 w-9 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
        <ConfirmModal
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
          loading={isDeleting}
        />
        {editItem && (
          <XarajatEditModal isOpen={!!editItem} onClose={() => setEditItem(null)} item={editItem} />
        )}
      </motion.div>
    )
  }

  return (
    <div className="glass overflow-hidden rounded-[2rem] border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] dark:border-slate-700/50 dark:bg-slate-900/40">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/30 dark:border-slate-800 dark:bg-slate-900/30">
              <th className="px-4 py-5 text-[10px] font-bold tracking-widest text-slate-500 uppercase sm:px-8 dark:text-slate-400">
                {t('xarajat.nomi')}
              </th>
              <th className="hidden px-4 py-5 text-[10px] font-bold tracking-widest text-slate-500 uppercase sm:table-cell sm:px-8 dark:text-slate-400">
                {t('xarajat.kategoriya')}
              </th>
              <th className="px-4 py-5 text-[10px] font-bold tracking-widest text-slate-500 uppercase sm:px-8 dark:text-slate-400">
                {t('xarajat.miqdor')}
              </th>
              <th className="hidden px-4 py-5 text-[10px] font-bold tracking-widest text-slate-500 uppercase sm:table-cell sm:px-8 dark:text-slate-400">
                {t('xarajat.sana')}
              </th>
              <th className="px-4 py-5 text-right text-[10px] font-bold tracking-widest text-slate-500 uppercase sm:px-8 dark:text-slate-400">
                Amallar
              </th>
            </tr>
          </thead>
          <motion.tbody variants={container} initial="hidden" animate="show">
            {data.map((item) => (
              <motion.tr
                key={item.id}
                variants={itemAnim}
                className="group border-b border-slate-50 transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800/50 dark:hover:bg-blue-900/10"
              >
                <td className="min-w-[140px] px-4 py-4 sm:px-8">
                  <div className="flex flex-col">
                    <span
                      className="line-clamp-1 font-bold text-slate-800 dark:text-slate-200"
                      title={item.nom}
                    >
                      {item.nom}
                    </span>
                    <div className="flex flex-col sm:hidden">
                      <span className="text-[10px] font-medium text-slate-500 uppercase">
                        {item.kategoriya}
                      </span>
                      <span className="text-[10px] text-slate-400">{formatDate(item.sana)}</span>
                    </div>
                    {item.manzil && (
                      <span
                        className="line-clamp-1 text-[11px] text-slate-400 italic"
                        title={item.manzil}
                      >
                        {item.manzil}
                      </span>
                    )}
                  </div>
                </td>
                <td className="hidden px-4 py-4 sm:table-cell sm:px-8">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-wider text-slate-600 uppercase dark:bg-slate-800 dark:text-slate-400">
                    {item.kategoriya}
                  </span>
                </td>
                <td className="px-4 py-4 font-black whitespace-nowrap text-slate-900 sm:px-8 dark:text-slate-100">
                  {formatMoney(item.miqdor)}{' '}
                  <span className="ml-0.5 text-[10px] text-slate-400">so'm</span>
                </td>
                <td className="hidden px-4 py-4 sm:table-cell sm:px-8">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                    <Calendar size={14} className="text-slate-300 dark:text-slate-600" />
                    {formatDate(item.sana)}
                  </div>
                </td>
                <td className="px-4 py-4 text-right sm:px-8">
                  <div className="flex justify-end gap-1 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditItem(item)}
                      className="h-8 w-8 rounded-lg border border-slate-200/50 bg-white/50 shadow-sm hover:border-slate-300 hover:bg-white sm:border-transparent sm:bg-transparent sm:shadow-none dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:bg-slate-800"
                    >
                      <Edit2 size={14} className="text-slate-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(item.id)}
                      className="h-8 w-8 rounded-lg border border-slate-200/50 bg-white/50 text-red-500 shadow-sm hover:border-slate-300 hover:bg-white sm:border-transparent sm:bg-transparent sm:shadow-none dark:border-slate-700/50 dark:bg-slate-800/50 dark:hover:bg-slate-800"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        loading={isDeleting}
      />
      {editItem && (
        <XarajatEditModal isOpen={!!editItem} onClose={() => setEditItem(null)} item={editItem} />
      )}
    </div>
  )
}
