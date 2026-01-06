import { useEffect, useState } from 'react'
import { Container, getContainer } from '@/stores/container-store'
import { Button } from '@/components/ui/button'
import { ContainerTable } from './components/container-table'

export function TypeOfContainer() {
  const [containers, setContainers] = useState<Container[]>([])

  useEffect(() => {
    getContainer()
      .then(setContainers)
      .catch((err) => console.log('Lỗi tải dữ liệu:', err))
  }, [])

  return (
    <div className='h-svh'>
      <div className='flex flex-col p-6'>
        <div className='flex justify-between'>
          <h1 className='font-bold'>Container</h1>
          <Button className='bg-orange-600'>Thêm mới</Button>
        </div>
        <ContainerTable data={containers} />
      </div>
    </div>
  )
}
