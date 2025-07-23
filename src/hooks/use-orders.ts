import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';

async function getOrders() {
  const res = await api.get('/orders');
  return res.data;
}

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });
} 