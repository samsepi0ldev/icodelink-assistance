import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

import type { Box } from './types'

async function getBoxes() {
  const response = await api.get<{ boxes: Box[] }>('/boxes')
  return response.data
}

export function useGetBoxes() {
  return useQuery({
    queryKey: ['boxes'],
    queryFn: getBoxes,
  })
}
