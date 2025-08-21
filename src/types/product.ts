export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  status: string; // 'draft' | 'published'
  isFeatured: boolean;
  brand?: string;
  sku?: string;
  weight?: number;
  discount?: number;
  coverImage?: string;
  imageUrl?: string;
  images: string[];
  tags: string[];
  categoryId?: string;
  createdAt?: string;
  updatedAt?: string;
}
