import * as z from 'zod'

export const xarajatSchema = z.object({
  nom: z.string().min(1, 'Nom kiriting').max(100),
  manzil: z.string().optional(),
  miqdor: z.number().positive('Musbat son kiriting').max(999999999),
  kategoriya: z.string().min(1, 'Kategoriya tanlang'),
  sana: z.string().optional(),
})

export type XarajatValues = z.infer<typeof xarajatSchema>
