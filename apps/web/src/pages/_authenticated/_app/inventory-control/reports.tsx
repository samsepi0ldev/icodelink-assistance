import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_app/inventory-control/reports')({
  component: Inventory,
})

function Inventory() {
  return <div>Hello "/_app/inventory-control/reports"!</div>
}
