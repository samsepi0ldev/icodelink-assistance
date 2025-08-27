import { Link as TanstackLink } from '@tanstack/react-router'
import type { ComponentProps } from 'react'
import colors from 'tailwindcss/colors'
import { cn } from '@/lib/utils'

interface LinkProps extends ComponentProps<typeof TanstackLink> {}

export function Link({ className, ...props }: LinkProps) {
  return (
    <TanstackLink
      activeOptions={{ exact: true }}
      className={cn(
        'border-zinc-900 border-b-2 px-2 py-3 font-medium text-sm text-zinc-400 hover:border-lime-300 hover:text-foreground [&.active]:border-lime-300 [&.active]:font-bold [&.active]:text-white',
        className
      )}
      {...props}
    />
  )
}
