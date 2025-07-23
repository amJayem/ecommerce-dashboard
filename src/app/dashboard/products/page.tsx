"use client";
import Link from "next/link";
import { useProducts, useDeleteProduct } from "@/hooks/use-products";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";

export default function AllProductsPage() {
  const { data: products, isLoading, isError } = useProducts();
  const deleteProduct = useDeleteProduct();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteProduct.mutateAsync(deleteId);
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/dashboard/products/new?id=${id}`);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <Link
          href="/dashboard/products/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition"
        >
          + Add Product
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr><td colSpan={7} className="text-center py-8">Loading...</td></tr>
            ) : isError ? (
              <tr><td colSpan={7} className="text-center py-8 text-red-500">Failed to load products.</td></tr>
            ) : products && products.length > 0 ? (
              (products as Product[]).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-700">{product.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <Link href={`/dashboard/products/${product.id}`} className="hover:underline text-blue-600">
                      {product.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {product.imageUrl && (
                      <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded border" />
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{product.category ?? '-'}</td>
                  <td className="px-6 py-4 text-gray-700">${product.price?.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-700">{product.stock}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm cursor-pointer"
                      type="button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm cursor-pointer"
                      type="button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={7} className="text-center py-8">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Delete Product</h2>
            <p className="mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 