"use client";

import { useProduct } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  // Get the product id from the route params
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Skeleton className="w-full h-64 mb-6" />
        <Skeleton className="w-1/2 h-8 mb-2" />
        <Skeleton className="w-1/3 h-6 mb-2" />
        <Skeleton className="w-1/4 h-6 mb-2" />
        <Skeleton className="w-full h-20 mb-4" />
        <Skeleton className="w-32 h-10" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
        <Link href="/dashboard/products">
          <Button variant="outline">← Back to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center gap-6 pb-0">
          <div className="shrink-0">
            <Image
              src={product.imageUrl || "/img/placeholder_image.png"}
              alt={product.name}
              width={160}
              height={160}
              className="rounded-lg border object-cover w-40 h-40 bg-muted"
            />
          </div>
          <div className="flex-1">
            <CardTitle className="text-3xl font-bold mb-2">
              {product.name}
            </CardTitle>
            <div className="text-gray-600 mb-2">
              Category: {product.categoryName || "-"}
            </div>
            <div className="text-lg font-semibold text-blue-700 mb-2">
              ${product.price?.toFixed(2)}
            </div>
            <div className="text-gray-700 mb-2">Stock: {product.stock}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 text-gray-500 text-base">
            {product.description || (
              <span className="italic text-gray-400">
                No description provided.
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/products">
              <Button variant="outline">← Back to Products</Button>
            </Link>
            {/* Future: Add Edit button here */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
// Added comments for clarity and maintainability
// - Uses useProduct hook for fetching
// - Uses shadcn Card, Button, Skeleton for modern UI
// - Handles loading, error, and not found states
