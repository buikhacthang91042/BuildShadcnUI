import { useState } from 'react'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Minus, Plus } from 'lucide-react'
import { addNewContainerType } from '@/stores/container-store'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type ContainerAddDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}
export function ContainerAddDialog({
  open,
  onOpenChange,
  onSuccess,
}: ContainerAddDialogProps) {
  const [inputs, setInputs] = useState([''])
  const handleInputChange = (idx: number, value: string) => {
    setInputs((prev) => prev.map((item, i) => (i === idx ? value : item)))
  }
  const handleAddInput = () => setInputs((prev) => [...prev, ''])
  const handleRemoveInput = (idx: number) => {
    if (inputs.length > 1) setInputs((prev) => prev.filter((_, i) => i != idx))
  }
  const handleSave = async () => {
    try {
      await addNewContainerType(inputs)
      onOpenChange(false)
      if (onSuccess) onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='flex justify-center font-bold text-orange-600'>
            Thêm loại Container mới
          </DialogTitle>
        </DialogHeader>
        <div className='mt-4 flex flex-col gap-4'>
          {inputs.map((value, idx) => (
            <div key={idx} className='flex flex-col gap-2'>
              <div>
                <Label>
                  <span className='text-red-500'>*</span>
                  Loại Container:
                </Label>
              </div>
              <div className='flex'>
                <Input
                  type='text'
                  value={value}
                  onChange={(e) => handleInputChange(idx, e.target.value)}
                  className='flex-1'
                />
                <Button
                  variant={'outline'}
                  type='button'
                  size='icon'
                  className='ml-2'
                  onClick={() => handleAddInput()}
                >
                  <Plus />
                </Button>
                {inputs.length > 1 && (
                  <Button
                    className='ml-1'
                    size='icon'
                    variant={'outline'}
                    onClick={() => handleRemoveInput(idx)}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className='mt-6'>
          <DialogClose asChild>
            <Button variant={'outline'}>Hủy bỏ</Button>
          </DialogClose>

          <Button
            variant={'outline'}
            className='w-20 bg-orange-500 text-white hover:bg-orange-400 hover:text-white'
            onClick={() => handleSave()}
          >
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
