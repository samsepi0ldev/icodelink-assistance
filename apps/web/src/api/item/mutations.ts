import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'
import type { Item } from './types'

async function createItem(data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) {
  const response = await api.post('/items', data)
  return response.data
}
async function updateItem({
  id,
  ...data
}: Omit<Item, 'createdAt' | 'updatedAt'>) {
  const response = await api.put(`/items/${id}`, data)
  return response.data
}

type MoveToBoxParams = {
  boxId: number
  itemsId: number[]
}

async function moveItemToBox({ boxId, itemsId }: MoveToBoxParams) {
  const response = await api.patch('/item/box/move', {
    boxId,
    itemsId,
  })

  return response
}

async function deleteItems(ids: number[]) {
  await api.delete('/items', {
    data: { ids },
  })
}

export function useCreateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items-to-sell'] })
    },
  })
}

export function useMoveItemsToBox() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: moveItemToBox,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items-to-sell'] })
    },
  })
}

export function useDeleteItems() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteItems,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items-to-sell'] })
    },
  })
}

export function useUpdateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items-to-sell'] })
    },
  })
}
