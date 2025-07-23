import { api } from './axios';

export async function fetchOrders() {
  const res = await api.get('/orders');
  return res.data;
}

export async function fetchOrderById(id: number) {
  const res = await api.get(`/orders/${id}`);
  return res.data;
} 