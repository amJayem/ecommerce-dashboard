'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '@/lib/order';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from '@/components/ui/table';

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product?: { name?: string };
}

interface Order {
  id: number;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: order, isLoading, error } = useQuery<Order, Error>({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <div className="p-4">Loading order...</div>;
  if (error || !order) return <div className="p-4 text-red-500">Order not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order #{order.id}</h1>
      <div className="mb-4 space-y-1">
        <div>
          Status: <span className="font-semibold">{order.status}</span>
        </div>
        <div>
          Total: <span className="font-semibold">${order.total.toFixed(2)}</span>
        </div>
        <div>
          Created At: <span className="font-semibold">{new Date(order.createdAt).toLocaleString()}</span>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Items</h2>
      <Table>
        <TableCaption>Order items</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Subtotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {order.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.product?.name || 'N/A'}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>${item.price.toFixed(2)}</TableCell>
              <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
