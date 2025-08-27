import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_app/service-order')({
  component: ServiceOrder,
})

function ServiceOrder() {
  return <div>Hello "/service-order"!</div>
}
