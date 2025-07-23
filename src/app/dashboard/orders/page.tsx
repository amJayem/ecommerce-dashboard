'use client';
import { useOrders } from '@/hooks/use-orders';
import Link from 'next/link';

// Minimal Order type for listing
interface Order {
  id: number;
  status: string;
  total: number;
  createdAt: string;
}

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) return <div className="p-4">Loading orders...</div>;
  if (error) return <div className="p-4 text-red-500">{(error as Error).message || 'Failed to fetch orders'}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Total</th>
            <th className="border px-2 py-1">Created At</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order: Order) => (
            <tr key={order.id}>
              <td className="border px-2 py-1">{order.id}</td>
              <td className="border px-2 py-1">{order.status}</td>
              <td className="border px-2 py-1">${order.total.toFixed(2)}</td>
              <td className="border px-2 py-1">{new Date(order.createdAt).toLocaleString()}</td>
              <td className="border px-2 py-1">
                <Link href={`/dashboard/orders/${order.id}`} className="text-blue-600 underline">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 