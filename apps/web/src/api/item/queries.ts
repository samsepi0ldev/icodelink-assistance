import { useQuery } from '@tanstack/react-query'

import { api } from '@/lib/api'
import type { Item } from './types'

interface ItemsResponse {
  items: Item[]
  total: number
  totalPages: number
}

async function getItems(boxId: number, page: number) {
  const response = await api.get<ItemsResponse>(
    `/box/${boxId}/items?page=${page}`
  )
  return response.data
}

export function useGetItems(boxId: number, page: number) {
  return useQuery({
    queryKey: ['items-to-sell', boxId, page],
    queryFn: () => getItems(boxId, page),
  })
}
