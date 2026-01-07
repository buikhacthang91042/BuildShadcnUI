import { useState } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Trash } from 'lucide-react'
import {
  ContainerReplace,
  deleteContainerTypes,
  getContainerReplace,
} from '@/stores/container-store'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Container } from '../data/schema'
import { columns } from './columnDesign'
import { ContainerAlertDeleteDialog } from './container-alert-delete-dialog'
import { ContainerEditDialog } from './container-edit-dialog'

type DataContainerProps = {
  data: Container[]
  onSuccess: () => void
}
export function ContainerTable({ data, onSuccess }: DataContainerProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [replaceContainers, setReplaceContainers] = useState<
    ContainerReplace[]
  >([])
  const [editContainerType, setEditContainerType] = useState<string | null>(
    null
  )
  const [openEdit, setOpenEdit] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
  const handleEdit = async (containerType: string) => {
    try {
      const data = await getContainerReplace(containerType)
      setEditContainerType(containerType)
      setReplaceContainers(data)
      setOpenEdit(true)
    } catch (error) {
      console.log('Lỗi tải dữ liệu thay thế:', error)
    }
  }
  const handleDelete = async () => {
    try {
      const selectedRows = table.getSelectedRowModel().rows
      const selectedIds = selectedRows.map((row) => row.original.containerType)
      await deleteContainerTypes(selectedIds)
      if (onSuccess) {
        onSuccess()
        setRowSelection({})
      }
    } catch (error) {
      console.log('Lỗi xóa loại container', error)
    }
  }
  return (
    <div>
      <div className='mt-4 flex'>
        <Label className='text-gray-400'>
          {table.getSelectedRowModel().rows.length} dòng được chọn
        </Label>
        <Button
          variant={'outline'}
          className='group ml-2 flex w-8 items-center justify-center hover:border-orange-500 hover:bg-white'
          onClick={() => setOpenAlert(true)}
        >
          <Trash className='h-4 w-4 group-hover:text-orange-500' />
        </Button>
      </div>
      <div className='mt-4 overflow-hidden rounded-md border'>
        <Table className=''>
          <TableHeader className='h-12 bg-gray-100'>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
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
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === 'action' ? (
                      <span
                        onClick={() => {
                          handleEdit(row.original.containerType)
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </span>
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className='justify-end'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => table.previousPage()}
              className={
                !table.getCanPreviousPage()
                  ? 'pointer-events-none opacity-50'
                  : ''
              }
            />
          </PaginationItem>

          {Array.from({ length: table.getPageCount() }).map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={table.getState().pagination.pageIndex == 1}
                onClick={() => table.setPageIndex(i)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => table.nextPage()}
              className={
                !table.getCanNextPage() ? 'pointer-events-none opacity-50' : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      {openEdit && (
        <ContainerEditDialog
          data={replaceContainers}
          open={openEdit}
          onOpenChange={setOpenEdit}
          typeOfContainer={editContainerType}
        />
      )}
      {openAlert && (
        <ContainerAlertDeleteDialog
          open={openAlert}
          onOpenChange={setOpenAlert}
          confirm={handleDelete}
        />
      )}
    </div>
  )
}
