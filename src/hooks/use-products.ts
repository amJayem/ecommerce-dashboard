import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { Product } from '@/types/product'

const PRODUCTS_KEY = ['products']

export function useProducts() {
  return useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: async () => (await api.get('/products')).data
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Product) =>
      (await api.post('/products', data)).data,
    onSuccess: () => {
      // Invalidate and refetch product list
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY })
    }
  })
}
