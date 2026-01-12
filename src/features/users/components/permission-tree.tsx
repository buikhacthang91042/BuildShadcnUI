import { findAllIds } from '@/lib/find-all-ids'
import { TreeView } from '@/components/tree-select/tree-view'

type ApiPermission = {
  name: string
  displayName: string | null
  isGranted: boolean
}

type ApiNode = {
  name: string
  displayName: string
  children: ApiNode[]
  permissions?: ApiPermission[]
}

type TreeItem = {
  value: string
  label: string
  type: 'folder' | 'file'
  children?: TreeItem[]
}

type Props = {
  data: ApiNode[]
  checked: Record<string, boolean>
  onCheck: (id: string, checked: boolean) => void
}

function mapApiToTreeViewItem(
  nodes: ApiNode[],
  parentPath: string = ''
): TreeItem[] {
  return nodes.map<TreeItem>((node) => {
    const nodeId = parentPath ? `${parentPath}/${node.name}` : node.name

    const childrenFromModules: TreeItem[] = node.children?.length
      ? mapApiToTreeViewItem(node.children, nodeId)
      : []

    const childrenFromPermissions: TreeItem[] =
      node.permissions?.map<TreeItem>((p) => {
        const permissionName =
          p.name && p.name !== 'undefined' ? p.name.trim() : ''

        // 👇 GHÉP CHUẨN
        const fullPermissionName = permissionName.includes('.')
          ? permissionName
          : `${node.name}.${permissionName}`

        return {
          id: `${nodeId}/${fullPermissionName}`,
          value: `${nodeId}/${fullPermissionName}`,
          label: fullPermissionName,
          type: 'file',
        }
      }) ?? []

    return {
      id: nodeId,
      value: nodeId,
      label: node.displayName?.trim() || node.name,
      type: 'folder',
      children: [...childrenFromModules, ...childrenFromPermissions],
    }
  })
}

export function PermissionTree({ data, checked, onCheck }: Props) {
  const treeViewData = mapApiToTreeViewItem(data)
  // Debug duplicate values
  const checkDuplicates = (items: TreeItem[], path = ''): string[] => {
    const duplicates: string[] = []
    const seen = new Set<string>()
    items.forEach((item) => {
      const fullPath = `${path}/${item.value}`
      if (seen.has(item.value)) {
        duplicates.push(item.value)
      } else {
        seen.add(item.value)
      }
      if (item.children) {
        duplicates.push(...checkDuplicates(item.children, fullPath))
      }
    })
    return duplicates
  }
  const dups = checkDuplicates(treeViewData)
  if (dups.length > 0) {
    console.error('Duplicate values found:', dups)
  }
  const allTreeIds = findAllIds(treeViewData)
  const checkedIds = Object.entries(checked)
    .filter(([id, v]) => v && allTreeIds.includes(id))
    .map(([id]) => id)

  return (
    <TreeView
      data={treeViewData}
      value={checkedIds}
      onValueChange={(values) => {
        values.forEach((id) => {
          onCheck(id, true)
        })

        checkedIds
          .filter((id) => !values.includes(id))
          .forEach((id) => {
            onCheck(id, false)
          })
      }}
    />
  )
}
