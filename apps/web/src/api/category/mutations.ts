import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '@/lib/api'
import type { Category } from './types'

interface CreateCategoryResponse {
  category: Category
}

async function createCategory({ name }: Partial<Category>) {
  const response = await api.post<CreateCategoryResponse>('/categories', {
    name,
  })
  return response.data
}

export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['categories'] }),
  })
}
