import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AuthContextProps } from '@/contexts/auth'

interface RouteAuthContext {
  authentication: AuthContextProps
}

export const Route = createRootRouteWithContext<RouteAuthContext>()({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
