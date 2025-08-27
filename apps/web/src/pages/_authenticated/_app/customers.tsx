import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'

export const Route = createFileRoute('/_authenticated/_app/customers')({
  component: Customers,
})

function Customers() {
  async function getProfile() {
    const response = await api.get('/profile')
    toast('Debugger', {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">
            {JSON.stringify(response.data, null, 2)}
          </code>
        </pre>
      ),
    })
  }
  return <Button onClick={getProfile}>Hello "/customer"!</Button>
}
