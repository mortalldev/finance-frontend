'use client'

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
import { useCreateXarajatMutation } from '@/shared/api/xarajatApi'

export function XarajatCreateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useTranslation()
  const [create, { isLoading }] = useCreateXarajatMutation()

  const form = useForm<XarajatValues>({
    resolver: zodResolver(xarajatSchema),
    defaultValues: { nom: '', manzil: '', miqdor: 0, kategoriya: '' },
  })

  const onSubmit = async (values: XarajatValues) => {
    try {
      await create(values).unwrap()
      toast.success("Muvaffaqiyatli qo'shildi")
      form.reset()
      onClose()
    } catch {
      toast.error('Xatolik')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('xarajat.add')}</DialogTitle>
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
