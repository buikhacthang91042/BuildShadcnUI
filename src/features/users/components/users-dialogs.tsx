import { UserDecentralization } from './user-decentralization-dialog'
import { UsersActionDialog } from './users-action-dialog'
import { UsersDeleteDialog } from './users-delete-dialog'
import { useUsers } from './users-provider'

export function UsersDialogs({
  reloadRoleName,
}: {
  reloadRoleName: () => void
}) {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  console.log('open', open, 'currentRow', currentRow)

  return (
    <>
      <UsersActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
        reloadRoleName={reloadRoleName}
      />

      {currentRow && (
        <>
          <UsersActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            reloadRoleName={reloadRoleName}
          />
          <UserDecentralization
            key={`user-decentralization-${currentRow.id}`}
            open={open === 'decentralization'}
            onOpenChange={(isOpen) => {
              setOpen(isOpen ? 'decentralization' : null)
            }}
            currentRow={currentRow}
            reloadRoleName={reloadRoleName}
          />
          <UsersDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            reloadRoleName={reloadRoleName}
          />
        </>
      )}
    </>
  )
}
