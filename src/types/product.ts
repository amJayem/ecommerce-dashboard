export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  discount?: number;
  slug: string;
  description: string;
  salePrice: number;
  stock: number;
  categoryId: string;
  images: object;
  status: string; //enum
  isFeatured: boolean;
  brand: string;
  tags: object;
  sku: string;
  createdAt?: string;
  updatedAt?: string;
}
