import { RouterProvider } from '@tanstack/react-router'

import { AuthContext, useAuth } from './contexts/auth'
import { router } from './route'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider context={{ authentication: auth }} router={router} />
}

export function App() {
  return (
    <AuthContext>
      <InnerApp />
    </AuthContext>
  )
}
