import { ColumnDef } from '@tanstack/react-table'
import { PencilLine } from 'lucide-react'
import { ContainerReplace } from '@/stores/container-store'
import { Checkbox } from '@/components/ui/checkbox'

export const columnReplace: ColumnDef<ContainerReplace>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'shippingLineName',
    header: 'Hãng tàu',
  },
  {
    accessorKey: 'containerTypeReplace',
    header: 'Loại container thay thế',
  },
  {
    id: 'action',
    header: 'Cập nhật',
    cell: () => (
      <PencilLine className='h-4 w-4 cursor-pointer text-orange-500' />
    ),
  },
]
