import { AddProductForm } from "@/components/forms/add-product-form";

export default function AddProductPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add New Product</h1>
      <AddProductForm />
    </div>
  );
}
