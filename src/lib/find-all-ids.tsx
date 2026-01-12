import { TreeViewItem } from '@/components/tree-view'

export function findAllIds(nodes): string[] {
  const result: string[] = []

  const walk = (items) => {
    items.forEach((item) => {
      if (typeof item.id === 'string') {
        result.push(item.value)
      }

      if (item.children?.length) {
        walk(item.children)
      }
    })
  }

  walk(nodes)
  return result
}
