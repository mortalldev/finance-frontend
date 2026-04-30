'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog'
import { MoneyInput } from '@/shared/ui/MoneyInput'
import { xarajatSchema, XarajatValues } from '../model/xarajatSchemas'
import { useUpdateXarajatMutation } from '@/shared/api/xarajatApi'

export function XarajatEditModal({
  isOpen,
  onClose,
  item,
}: {
  isOpen: boolean
  onClose: () => void
  item: any
}) {
  const { t } = useTranslation()
  const [update, { isLoading }] = useUpdateXarajatMutation()

  const form = useForm<XarajatValues>({
    resolver: zodResolver(xarajatSchema),
    defaultValues: {
      nom: item.nom,
      manzil: item.manzil || '',
      miqdor: Number(item.miqdor),
      kategoriya: item.kategoriya,
    },
  })

  useEffect(() => {
    form.reset({
      nom: item.nom,
      manzil: item.manzil || '',
      miqdor: Number(item.miqdor),
      kategoriya: item.kategoriya,
    })
  }, [item, form])

  const onSubmit = async (values: XarajatValues) => {
    try {
      await update({ id: item.id, ...values }).unwrap()
      toast.success('Muvaffaqiyatli saqlandi')
      onClose()
    } catch {
      toast.error('Xatolik')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tahrirlash</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('xarajat.nomi')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="miqdor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('xarajat.miqdor')}</FormLabel>
                  <FormControl>
                    <MoneyInput value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kategoriya"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('xarajat.kategoriya')}</FormLabel>
                  <FormControl>
                    <Input placeholder="Oziq-ovqat, Transport..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="manzil"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('xarajat.manzil')} (Ixtiyoriy)</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Bekor qilish
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? '...' : 'Saqlash'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
