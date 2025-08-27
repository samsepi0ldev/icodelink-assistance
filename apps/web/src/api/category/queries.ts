import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

import type { Category } from './types'

async function getCategories() {
  const response = await api.get<{ categories: Category[] }>('/categories')
  return response.data
}

export function useGetCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
