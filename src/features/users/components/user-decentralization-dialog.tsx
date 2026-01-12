import { useEffect, useState } from 'react'
import { getPermissionsByRole } from '@/stores/user-store'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { mapPermissionToTree } from '../data/mapPermissionToTree'
import { PermissionNode, Role } from '../data/schema'
import { PermissionTree } from './permission-tree'

type UserDecentralizationProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Role
  reloadRoleName: () => void
}
export function UserDecentralization({
  open,
  onOpenChange,
  currentRow,
  reloadRoleName,
}: UserDecentralizationProps) {
  const [tree, setTree] = useState<PermissionNode[]>([])
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  useEffect(() => {
    if (open && currentRow) {
      getPermissionsByRole(currentRow.id).then((data) => {
        setTree(data)
        const checkedInit: Record<string, boolean> = {}
        const collect = (nodes: PermissionNode[]) => {
          nodes.forEach((n) => {
            checkedInit[n.name] = false

            n.permissions.forEach((p) => {
              checkedInit[p.name] = p.isGranted
            })

            if (n.children.length) collect(n.children)
          })
        }

        collect(data)
        setChecked(checkedInit)
      })
    }
  }, [open, currentRow])
  const handleCheck = (id: string, value: boolean) => {
    setChecked((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const treeData = mapPermissionToTree(tree)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>Phân quyền {currentRow.name}</DialogTitle>
        </DialogHeader>

        <div className='max-h-[60vh] overflow-y-auto pr-2'>
          <PermissionTree
            data={treeData}
            checked={checked}
            onCheck={handleCheck}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
