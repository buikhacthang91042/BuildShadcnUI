import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type ContainerAlertDeleteDialogProp = {
  open: boolean
  onOpenChange: (open: boolean) => void
  confirm: () => void
}
export function ContainerAlertDeleteDialog({
  open,
  onOpenChange,
  confirm,
}: ContainerAlertDeleteDialogProp) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có muốn xóa loại Container này không ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Lưu ý: không thể khôi phục sau khi xóa !
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              await confirm()
              onOpenChange(false)
            }}
          >
            Xác nhận xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
