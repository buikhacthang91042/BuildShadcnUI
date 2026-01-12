'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { DialogClose } from '@radix-ui/react-dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { createRole, updateRoleName } from '@/stores/user-store'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { type Role } from '../data/schema'

const formSchema = z.object({
  name: z.string().min(1, 'First Name is required.'),
})
type UserForm = z.infer<typeof formSchema>

type UserActionDialogProps = {
  currentRow?: Role
  open: boolean
  onOpenChange: (open: boolean) => void
  reloadRoleName: () => void
}

export function UsersActionDialog({
  currentRow,
  open,
  onOpenChange,
  reloadRoleName,
}: UserActionDialogProps) {
  const isEdit = !!currentRow
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
        }
      : {
          name: '',
        },
  })

  const onSubmit = async (values: UserForm) => {
    if (isEdit && currentRow) {
      await updateRoleName(currentRow.id, values.name)
    } else {
      await createRole(values.name)
    }
    form.reset()
    showSubmittedData(values)
    reloadRoleName()
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-start'>
          <DialogTitle>
            {isEdit ? 'Cập nhật vai trò' : 'Thêm vai trò'}
          </DialogTitle>
        </DialogHeader>
        <hr />
        <div className='h-30 w-[calc(100%+0.75rem)] overflow-y-auto py-1 pe-3'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 px-0.5'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel className='col-span-2 text-end'>Tên</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nhập tên vai trò'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter className='gap-4'>
          <DialogClose className='w-20 rounded-lg border'>Hủy</DialogClose>
          <Button type='submit' form='user-form'>
            {isEdit ? 'Cập nhật' : 'Tạo mới '}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
