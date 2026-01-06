import { useState } from 'react'
import { DialogTitle } from '@radix-ui/react-dialog'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ContainerReplace } from '../data/schema'
import { columnReplace } from './columnReplaceDesign'

type DataContainerEditDialogProps = {
  data: ContainerReplace[]
  open: boolean
  onOpenChange: (open: boolean) => void
  typeOfContainer: string | null
}
export function ContainerEditDialog({
  data,
  onOpenChange,
  open,
  typeOfContainer,
}: DataContainerEditDialogProps) {
  const [rowSelection, setRowSeclection] = useState<any>({})
  const table = useReactTable({
    data,
    columns: columnReplace,
    state: { rowSelection },
    onRowSelectionChange: setRowSeclection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='w-[90vw] max-w-none'>
        <DialogHeader>
          <DialogTitle>
            Loại Container có thể reuse cho cont {typeOfContainer}
          </DialogTitle>
        </DialogHeader>

        <div>
          <div className='flex justify-between'>
            <div className='flex'>
              <Label className='text-gray-400'>
                {table.getSelectedRowModel().rows.length} dòng được chọn
              </Label>
              <Button
                variant={'outline'}
                className='group ml-2 w-8 hover:border-orange-500 hover:bg-white'
              >
                <Trash className='h-4 w-4 group-hover:text-orange-500' />
              </Button>
            </div>
            <div>
              <Button className='bg-orange-600'>Thêm mới</Button>
            </div>
          </div>

          <div className='mt-4 rounded-md border'>
            <Table className=''>
              <TableHeader className='bg-gray-100'>
                {table.getHeaderGroups().map((hg) => (
                  <TableRow key={hg.id} className='h-14'>
                    {hg.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={header.column.columnDef.meta?.thClassName}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className='h-12'>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cell.column.columnDef.meta?.tdClassName}
                      >
                        {cell.column.id === 'action' ? (
                          <span onClick={() => console.log('Click action')}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
