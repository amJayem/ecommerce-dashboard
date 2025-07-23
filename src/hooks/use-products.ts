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

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...data }: Partial<Product> & { id: number }) =>
      (await api.put(`/products/${id}`, data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY })
    }
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => (await api.delete(`/products/${id}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY })
    }
  })
}

export function useProduct(id: number | string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      return (await api.get(`/products/${id}`)).data;
    },
    enabled: !!id,
  });
}
