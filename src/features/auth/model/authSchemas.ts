import * as z from 'zod'

export const loginSchema = z.object({
  username: z.string().min(3, 'Kamida 3 ta belgi'),
  password: z.string().min(6, 'Kamida 6 ta belgi'),
})

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Ism kiriting'),
    email: z.string().email("Noto'g'ri email"),
    username: z
      .string()
      .min(3)
      .max(20)
      .regex(/^[a-zA-Z0-9_]+$/, 'Faqat harf, raqam, _'),
    password: z
      .string()
      .min(8, 'Kamida 8 ta belgi')
      .regex(/[A-Z]/, 'Kamida 1 ta katta harf')
      .regex(/[0-9]/, 'Kamida 1 ta raqam'),
    repeatPassword: z.string(),
  })
  .refine((d) => d.password === d.repeatPassword, {
    message: 'Parollar mos kelmadi',
    path: ['repeatPassword'],
  })

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
