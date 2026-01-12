import { PermissionNode } from './schema'

export function mapPermissionToTree(nodes: PermissionNode[]): any {
  return nodes.map((node) => ({
    name: node.name,
    label: node.displayName,
    type: 'folder',
    children: [
      ...mapPermissionToTree(node.children),
      ...node.permissions.map((p) => ({
        id: p.name,
        label: p.name,
        type: 'file',
      })),
    ],
  }))
}
