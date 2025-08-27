import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_app/services')({
  component: Service,
})

function Service() {
  return <div>Hello "/services"!</div>
}
