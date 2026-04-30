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
import { loginSchema, LoginValues } from '../model/authSchemas'
import { useLoginMutation } from '@/shared/api/authApi'
import { useDispatch } from 'react-redux'
import { setUser } from '@/entities/user/model/userSlice'

export function LoginForm() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  const onSubmit = async (values: LoginValues) => {
    try {
      const result = await login(values).unwrap()
      dispatch(setUser({ user: result.user }))
      toast.success('Muvaffaqiyatli kirdingiz')
      router.push('/')
    } catch (error: any) {
      toast.error(error.data?.message || 'Xatolik yuz berdi')
    }
  }

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
        className="space-y-6"
      >
        <motion.div variants={item}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="ml-1 text-slate-600 dark:text-slate-300">
                  {t('auth.username')}
                </FormLabel>
                <FormControl>
                  <Input placeholder="demo" {...field} />
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
                <FormLabel className="ml-1 text-slate-600 dark:text-slate-300">
                  {t('auth.password')}
                </FormLabel>
                <FormControl>
                  <PasswordInput placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

        <motion.div variants={item} className="pt-2">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Kirilmoqda...
              </div>
            ) : (
              t('auth.login')
            )}
          </Button>
        </motion.div>

        <motion.div variants={item} className="pt-2 text-center text-sm">
          <span className="text-slate-500">{t('auth.noAccount')} </span>
          <Link
            href="/register"
            className="font-bold text-blue-600 hover:underline dark:text-blue-400"
          >
            {t('auth.register')}
          </Link>
        </motion.div>
      </motion.form>
    </Form>
  )
}
