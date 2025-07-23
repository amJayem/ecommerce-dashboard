'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { useCreateProduct, useProduct, useUpdateProduct } from '@/hooks/use-products';
import { productSchema } from '@/lib/validations/product-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Controller,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm
} from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormControl, FormItem, FormLabel } from '../ui/form'
import { useEffect } from 'react';

type ProductFormValues = {
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  categoryId: string;
  images: string[];
  status: string;
  isFeatured: boolean;
  brand: string;
  tags: string[];
  sku: string;
};

const categories = [
  { id: 'cat1', name: 'Fruits' },
  { id: 'cat2', name: 'Nuts' },
  { id: 'cat3', name: 'Oils' }
]

interface AddProductFormProps {
  productId?: string | null;
}

export function AddProductForm({ productId }: AddProductFormProps) {
  const { mutateAsync, isPending } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();
  const { data: product, isLoading: isProductLoading } = useProduct(productId ? Number(productId) : undefined);

  const defaultValues: ProductFormValues = {
    name: '',
    slug: '',
    description: '',
    price: 0,
    salePrice: undefined,
    stock: 0,
    categoryId: '',
    images: [''],
    status: 'draft',
    isFeatured: false,
    brand: '',
    tags: [],
    sku: ''
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = form;

  useEffect(() => {
    if (product && productId) {
      reset({
        ...product,
        images: Array.isArray(product.images)
          ? product.images
          : typeof product.images === 'string'
          ? [product.images]
          : [],
        tags: Array.isArray(product.tags)
          ? product.tags
          : typeof product.tags === 'string'
          ? [product.tags]
          : [],
      });
    }
  }, [product, productId, reset]);

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      if (productId) {
        await updateProduct({ id: Number(productId), ...data });
        toast.success('Product updated!');
      } else {
        await mutateAsync({
          ...data,
          id: 0, // dummy, backend should ignore or generate
          imageUrl: data.images[0] || '', // use first image as main image
          salePrice: data.salePrice ?? 0,
          brand: data.brand ?? '',
          sku: data.sku ?? '',
        });
        toast.success('Product created!');
        form.reset();
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      toast.error(errorMsg);
    }
  };

  if (isProductLoading) {
    return <div>Loading product...</div>;
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Responsive grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <Label htmlFor='name'>Product Name</Label>
            <Input {...register('name')} placeholder='e.g. Organic Honey' />
            {errors.name && (
              <p className='text-sm text-red-600'>{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='slug'>Slug</Label>
            <Input {...register('slug')} placeholder='e.g. organic-honey' />
            {errors.slug && (
              <p className='text-sm text-red-600'>{errors.slug.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='price'>Price</Label>
            <Input type='number' {...register('price')} />
            {errors.price && (
              <p className='text-sm text-red-600'>{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='salePrice'>Sale Price</Label>
            <Input type='number' {...register('salePrice')} />
          </div>

          <div>
            <Label htmlFor='stock'>Stock</Label>
            <Input type='number' {...register('stock')} />
            {errors.stock && (
              <p className='text-sm text-red-600'>{errors.stock.message}</p>
            )}
          </div>

          <Controller
            name='categoryId'
            control={form.control}
            rules={{ required: 'Category is required' }} // optional since Zod will also validate
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className='text-sm text-red-600'>
                    {errors.categoryId.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className='md:col-span-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea rows={4} {...register('description')} />
            {errors.description && (
              <p className='text-sm text-red-600'>
                {errors.description.message}
              </p>
            )}
          </div>

          <div className='md:col-span-2'>
            <Label htmlFor='images'>Images (comma-separated URLs)</Label>
            <Controller
              control={form.control}
              name='images'
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value.join(', ')}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(',')
                        .map((t) => t.trim())
                        .filter(Boolean)
                    )
                  }
                />
              )}
            />
            {/* <Input
            {...register("images", {
              setValueAs: (v: string) =>
                v.split(",").map((url: string) => url.trim()).filter(Boolean),
            })}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          /> */}
            {errors.images && (
              <p className='text-sm text-red-600'>{errors.images.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor='sku'>SKU</Label>
            <Input {...register('sku')} />
          </div>

          <div>
            <Label htmlFor='brand'>Brand</Label>
            <Input {...register('brand')} />
          </div>

          <div>
            <Label htmlFor='tags'>Tags (comma-separated)</Label>
            {/* <Input
            {...register("tags", {
              setValueAs: (v: string) => v.split(",").map((t) => t.trim()),
            })}
          /> */}
            <Controller
              name="tags"
              control={form.control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                  onChange={(e) => {
                    const inputValue = e.target.value;

                    const tagArray = inputValue
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean); // removes empty strings

                    field.onChange(tagArray);
                  }}
                  placeholder="e.g. organic, summer, new"
                />
              )}
            />

          </div>

          <div>
            <Label htmlFor='status'>Status</Label>
            <Select
              onValueChange={(val) =>
                setValue('status', val as 'published' | 'draft')
              }>
              <SelectTrigger>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='draft'>Draft</SelectItem>
                <SelectItem value='published'>Published</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center space-x-2'>
            <Switch
              id='isFeatured'
              checked={watch('isFeatured')}
              onCheckedChange={(val) => setValue('isFeatured', val)}
            />
            <Label htmlFor='isFeatured'>Featured Product</Label>
          </div>
        </div>

        <Button
          type='submit'
          className='bg-teal-600 hover:bg-teal-700'
          disabled={isPending}>
          {isPending ? 'Submitting...' : 'Add Product'}
        </Button>
      </form>
    </FormProvider>
  )
}
