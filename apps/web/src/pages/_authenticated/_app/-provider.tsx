import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type React from 'react'
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient()

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-center" />
    </QueryClientProvider>
  )
}
