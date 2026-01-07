import { ColumnDef } from '@tanstack/react-table'
import { PencilLine } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Container } from '../data/schema'

export const columns: ColumnDef<Container>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: 'containerType',
    header: 'Loại container',
  },
  {
    id: 'action',
    header: 'Cập nhật',
    cell: () => (
      <PencilLine className='h-4 w-4 cursor-pointer text-orange-500' />
    ),
  },
]
