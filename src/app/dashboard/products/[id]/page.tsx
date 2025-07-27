import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const dummyProducts = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    stock: 25,
    image: "https://via.placeholder.com/160x160?text=Headphones",
    category: "Electronics",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life.",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 149.99,
    stock: 10,
    image: "https://via.placeholder.com/160x160?text=Watch",
    category: "Wearables",
    description:
      "Track your fitness and notifications with this stylish smart watch.",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 59.99,
    stock: 40,
    image: "https://via.placeholder.com/160x160?text=Speaker",
    category: "Audio",
    description:
      "Portable Bluetooth speaker with deep bass and 12-hour playtime.",
  },
  {
    id: "4",
    name: "Running Shoes",
    price: 79.99,
    stock: 15,
    image: "https://via.placeholder.com/160x160?text=Shoes",
    category: "Footwear",
    description:
      "Lightweight running shoes designed for comfort and performance.",
  },
];

// Updated for Next.js 15: params is now a Promise that needs to be awaited
export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Await the params Promise
  const product = dummyProducts.find((p) => p.id === id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-8 mb-8">
        <Image
          src={product.image}
          alt={product.name}
          width={48}
          height={48}
          className="object-cover rounded border"
        />
        {/* <img
          src={product.image}
          alt={product.name}
          className="w-40 h-40 object-cover rounded-lg border"
        /> */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-gray-600 mb-2">Category: {product.category}</div>
          <div className="text-lg font-semibold text-blue-700 mb-2">
            ${product.price.toFixed(2)}
          </div>
          <div className="text-gray-700 mb-2">Stock: {product.stock}</div>
          <div className="text-gray-500 text-sm mb-4">
            {product.description}
          </div>
          <Link
            href="/dashboard/products"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium transition"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Update Product (Coming Soon)
        </h2>
        <div className="text-gray-500">
          Product update functionality will be available here.
        </div>
      </div>
    </div>
  );
}
