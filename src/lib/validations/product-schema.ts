import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().min(10, 'Description is too short'),
  price: z.coerce.number().min(0, 'Price is required'),
  salePrice: z.coerce.number().optional(),
  stock: z.coerce.number().min(0, 'Stock is required'),
  categoryId: z.string().min(1, 'Category is required'),
  images: z
    .array(z.string().url('Must be valid image URLs'))
    .min(1, 'At least one image required'),
  status: z.enum(['draft', 'published']),
  isFeatured: z.boolean(),
  brand: z.string().optional(),
  tags: z.array(z.string()).default([]),
  sku: z.string().optional()
})
