import Link from "next/link";

const dummyProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    stock: 25,
    image: "https://via.placeholder.com/80x80?text=Headphones",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 149.99,
    stock: 10,
    image: "https://via.placeholder.com/80x80?text=Watch",
    category: "Wearables",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 59.99,
    stock: 40,
    image: "https://via.placeholder.com/80x80?text=Speaker",
    category: "Audio",
  },
  {
    id: "4",
    name: "Running Shoes",
    price: 79.99,
    stock: 15,
    image: "https://via.placeholder.com/80x80?text=Shoes",
    category: "Footwear",
  },
];

export default function AllProductsPage() {
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
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Stock</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dummyProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  <Link href={`/dashboard/products/${product.id}`} className="hover:underline text-blue-600">
                    {product.name}
                  </Link>
                </td>
                <td className="px-6 py-4 text-gray-700">{product.category}</td>
                <td className="px-6 py-4 text-gray-700">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-gray-700">{product.stock}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/products/${product.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 