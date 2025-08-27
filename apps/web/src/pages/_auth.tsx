import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'

export const Route = createFileRoute('/_auth')({
  component: RootAppLayout,
})

function RootAppLayout() {
  return (
    <>
      <Toaster position="top-center" />
      <Outlet />
    </>
  )
}
