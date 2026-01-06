import { createFileRoute } from '@tanstack/react-router'
import { TypeOfContainer } from '@/features/cos/type-of-container'

export const Route = createFileRoute(
  '/_authenticated/main/settings/cos/container'
)({
  component: TypeOfContainer,
})
