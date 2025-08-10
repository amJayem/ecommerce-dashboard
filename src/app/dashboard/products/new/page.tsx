'use client';

import { AddProductForm } from "@/components/forms/add-product-form";
import { useSearchParams } from "next/navigation";

export default function AddProductPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* <h1 className="text-2xl font-bold">{id ? "Edit Product" : "Add New Product"}</h1> */}
      <AddProductForm productId={id} />
    </div>
  );
}
