import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'

import type { Box } from './types'

async function createBox(data: Omit<Box, 'id'>) {
  const response = await api.post<{ box: Box }>('/boxes', data)
  return response.data
}

export function useCreateBox() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createBox,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boxes'] })
    },
  })
}

async function deleteBox(id: number) {
  const response = await api.delete<{ box: Box }>(`/boxes/${id}`)
  return response.data
}

export function useDeleteBox() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteBox,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boxes'] })
    },
  })
}
