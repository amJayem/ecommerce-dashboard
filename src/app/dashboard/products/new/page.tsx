import { AddProductForm } from "@/components/forms/add-product-form";

export const metadata = {
  title: "Add Product | Dashboard",
  description: "Add a new product to your inventory",
  openGraph: {
    title: "Add Product | Dashboard",
    description: "Add a new product to your inventory",
    url: "https://yourdomain.com/products/new",
    type: "website",
    images: [
      {
        url: "/og-image.png", // put this image in public/ folder
        width: 1200,
        height: 630,
        alt: "Add Product Page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Add Product | Dashboard",
    description: "Add a new product to your inventory",
    images: ["/og-image.png"],
  },
}

export default function AddProductPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add New Product</h1>
      <AddProductForm />
    </div>
  );
}
