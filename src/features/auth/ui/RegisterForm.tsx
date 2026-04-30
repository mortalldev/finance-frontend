'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { PasswordInput } from '@/shared/ui/PasswordInput'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form'
import { registerSchema, RegisterValues } from '../model/authSchemas'
import { useRegisterMutation } from '@/shared/api/authApi'

export function RegisterForm() {
  const { t } = useTranslation()
  const router = useRouter()
  const [register, { isLoading }] = useRegisterMutation()

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: '', email: '', username: '', password: '', repeatPassword: '' },
  })

  const onSubmit = async (values: RegisterValues) => {
    try {
      const { repeatPassword, ...data } = values
      await register(data).unwrap()
      toast.success("Ro'yxatdan o'tdingiz. Endi tizimga kiring.")
      router.push('/login')
    } catch (error: any) {
      toast.error(error.data?.message || 'Xatolik yuz berdi')
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  }

  return (
    <Form {...form}>
      <motion.form
        variants={container}
        initial="hidden"
        animate="show"
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="ml-1">{t('auth.fullName')}</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="ml-1">{t('auth.email')}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="ml-1">{t('auth.username')}</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="ml-1">{t('auth.password')}</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={item} className="md:col-span-2">
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="ml-1">Parolni takrorlang</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={item} className="pt-2 md:col-span-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '...' : t('auth.register')}
          </Button>
        </motion.div>

        <motion.div variants={item} className="pt-2 text-center text-sm md:col-span-2">
          <span className="text-slate-500">{t('auth.haveAccount')} </span>
          <Link
            href="/login"
            className="font-bold text-blue-600 hover:underline dark:text-blue-400"
          >
            {t('auth.login')}
          </Link>
        </motion.div>
      </motion.form>
    </Form>
  )
}
