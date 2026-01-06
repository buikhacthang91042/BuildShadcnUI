import { useEffect, useState } from 'react'
import { Container, getContainer } from '@/stores/container-store'
import { Button } from '@/components/ui/button'
import { ContainerAddDialog } from './components/container-add-dialog'
import { ContainerTable } from './components/container-table'

export function TypeOfContainer() {
  const [containers, setContainers] = useState<Container[]>([])
  const [openAddContainer, setOpenAddContainer] = useState(false)
  const reloadContainers = () => {
    getContainer()
      .then(setContainers)
      .catch((err) => console.log('Lỗi tải dữ liệu', err))
  }
  useEffect(() => {
    reloadContainers()
  }, [])

  return (
    <div className='h-svh'>
      <div className='flex flex-col p-6'>
        <div className='flex justify-between'>
          <h1 className='font-bold'>Container</h1>
          <Button
            className='bg-orange-600 hover:bg-orange-400 hover:text-white'
            onClick={() => setOpenAddContainer(true)}
          >
            Thêm mới
          </Button>
        </div>
        <ContainerTable data={containers} />
      </div>
      {openAddContainer && (
        <ContainerAddDialog
          open={openAddContainer}
          onOpenChange={setOpenAddContainer}
          onSuccess={reloadContainers}
        />
      )}
    </div>
  )
}
