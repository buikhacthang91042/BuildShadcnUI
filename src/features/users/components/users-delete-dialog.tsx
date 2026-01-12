'use client'

import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import { deleteRoleById } from '@/stores/user-store'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { type Role } from '../data/schema'

type UserDeleteDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Role
  reloadRoleName: () => void
}

export function UsersDeleteDialog({
  open,
  onOpenChange,
  currentRow,
  reloadRoleName,
}: UserDeleteDialogProps) {
  const [value, setValue] = useState('')

  const handleDelete = async () => {
    if (value.trim() !== currentRow.name) return
    onOpenChange(false)
    await deleteRoleById(currentRow.id)
    showSubmittedData(currentRow, 'The following user has been deleted:')
    reloadRoleName()
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.name}
      title={
        <span className='text-destructive'>
          <AlertTriangle
            className='me-1 inline-block stroke-destructive'
            size={18}
          />{' '}
          Xóa vai trò
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Bạn có chắc chắn xóa{' '}
            <span className='font-bold'>{currentRow.name}</span>?
            <br />
            Hành động này sẽ xóa vai trò{' '}
            <span className='font-bold'>
              {currentRow.name.toUpperCase()}
            </span>{' '}
            khỏi hệ thống.
          </p>

          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='Nhập lại tên vai trò để xác nhận xóa'
          />
          <Alert variant='destructive'>
            <AlertTitle>Cảnh báo!</AlertTitle>
            <AlertDescription>
              Cẩn thận! Hành động này không thể hoàn tác.
            </AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Xóa'
      cancelBtnText='Hủy'
      destructive
    />
  )
}
