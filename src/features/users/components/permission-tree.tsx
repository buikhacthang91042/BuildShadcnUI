import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

export type PermissionTreeNode = {
  id: string
  label: string
  children?: PermissionTreeNode[]
}
type PermissionTreeProps = {
  data: PermissionTreeNode[]
  checked: Record<string, boolean>
  indeterminate?: Record<string, boolean>
  onCheck: (id: string, checked: boolean) => void
  onToggle?: (id: string, checked: boolean) => void
}

export function PermissionTree({
  data,
  checked,
  onCheck,
}: PermissionTreeProps) {
  return (
    <div>
      {data.map((node, index) => {
        const rootPath = node.id ?? `root-${crypto.randomUUID()}`

        return (
          <TreeNode
            key={rootPath}
            node={node}
            checked={checked}
            onCheck={onCheck}
            level={0}
            path={rootPath}
          />
        )
      })}
    </div>
  )
}

function TreeNode({
  node,
  checked,
  indeterminate = {},
  onCheck,
  level,
  path,
}: {
  node: PermissionTreeNode
  checked: Record<string, boolean>
  indeterminate?: Record<string, boolean>
  onCheck: (id: string, checked: boolean) => void
  level: number
  path: string
}) {
  const [open, setOpen] = useState(true)
  const hasChildren = node.children && node.children.length > 0
  const isChecked = !!checked[node.id]
  const isIndeterminate = !!indeterminate[node.id] && !isChecked
  const handleSingleCheck = (checked: boolean) => {
    onCheck(node.id, checked)
  }
  const handleCheckWithCascade = (checked: boolean) => {
    onCheck(node.id, checked)
    const cascadeChildren = (n: PermissionTreeNode) => {
      n.children?.forEach((child) => {
        onCheck(child.id, checked)
        if (child.children?.length) {
          cascadeChildren(child)
        }
      })
    }

    if (hasChildren) {
      cascadeChildren(node)
    }
  }
  return (
    <div>
      <div
        className='flex items-center gap-2 py-1'
        style={{ paddingLeft: level * 16 }}
      >
        {hasChildren ? (
          <Button
            variant='outline'
            size='icon'
            className='h-6 w-6'
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </Button>
        ) : (
          <span className='w-6' />
        )}

        <Checkbox
          checked={isIndeterminate ? 'indeterminate' : isChecked}
          onCheckedChange={(v) => {
            handleCheckWithCascade(!!v)
          }}
        />
        <span className='text-sm'>{node.label}</span>
      </div>

      {hasChildren && open && (
        <div>
          {node.children!.map((child, idx) => (
            <TreeNode
              key={child.id || `${path}/child-${idx}-${child.label}`}
              node={child}
              checked={checked}
              indeterminate={indeterminate}
              onCheck={onCheck}
              level={level + 1}
              path={`${path}/${child.id || idx}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
