import * as React from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { useUpdateProfileMutation } from '@/shared/api/authApi'
import { useDispatch } from 'react-redux'
import { setUser } from '@/entities/user/model/userSlice'
import toast from 'react-hot-toast'

interface ProfileEditModalProps {
  isOpen: boolean
  onClose: () => void
  user: any
}

export function ProfileEditModal({ isOpen, onClose, user }: ProfileEditModalProps) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
    },
  })

  const onSubmit = async (data: any) => {
    try {
      const updatedUser = await updateProfile(data).unwrap()
      dispatch(setUser(updatedUser))
      toast.success('Profil yangilandi')
      onClose()
    } catch {
      toast.error('Xatolik yuz berdi')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profilni tahrirlash</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Ism familiya</Label>
            <Input
              id="fullName"
              {...register('fullName', { required: true })}
              placeholder="Ism familiyangizni kiriting"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email manzil</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { required: true })}
              placeholder="example@mail.com"
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Bekor qilish
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saqlanmoqda...' : 'Saqlash'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
