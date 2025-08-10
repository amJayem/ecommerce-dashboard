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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useEffect, useState } from 'react';
import { 
  Package, 
  DollarSign, 
  Tag, 
  Image, 
  Save, 
  Plus,
  X
} from 'lucide-react'

type ProductFormValues = {
  name: string;
  slug: string;
  description: string;
  price: number;
  salePrice?: number;
  stock: number;
  categoryId: string;
  coverImage: string;
  images: string[];
  status: string;
  isFeatured: boolean;
  brand: string;
  tags: string[];
  sku: string;
  weight?: number;
  discount?: number;
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
  const [newTag, setNewTag] = useState('');

  const defaultValues: ProductFormValues = {
    name: '',
    slug: '',
    description: '',
    price: 0,
    salePrice: undefined,
    stock: 0,
    categoryId: '',
    coverImage: '',
    images: [],
    status: 'draft',
    isFeatured: false,
    brand: '',
    tags: [],
    sku: '',
    weight: undefined,
    discount: undefined
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

  const watchedTags = watch('tags');
  const watchedImages = watch('images');

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
        toast.success('Product updated successfully!');
      } else {
        await mutateAsync({
          ...data,
          // id: 0, // dummy, backend should ignore or generate
          salePrice: data.salePrice || undefined,
          brand: data.brand || '',
          sku: data.sku || '',
          weight: data.weight || undefined,
          discount: data.discount || undefined,
        });
        toast.success('Product created successfully!');
        form.reset();
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      toast.error(errorMsg);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      setValue('tags', [...watchedTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  };

  const addImageField = () => {
    setValue('images', [...watchedImages, '']);
  };

  const removeImageField = (index: number) => {
    const newImages = watchedImages.filter((_, i) => i !== index);
    setValue('images', newImages);
  };

  if (isProductLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 max-w-4xl mx-auto'>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {productId ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="text-muted-foreground">
              {productId ? 'Update your product information' : 'Create a new product for your store'}
            </p>
          </div>
          <Button
            type='submit'
            size="lg"
            className='bg-primary hover:bg-primary/90'
            disabled={isPending}>
            <Save className="mr-2 h-4 w-4" />
            {isPending ? 'Saving...' : (productId ? 'Update Product' : 'Create Product')}
          </Button>
        </div>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Essential product details like name, description, and category
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className="space-y-2">
                <Label htmlFor='name' className="text-sm font-medium">Product Name *</Label>
                <Input 
                  {...register('name')} 
                  placeholder='e.g. Organic Raw Honey' 
                  className="h-10"
                />
                {errors.name && (
                  <FormMessage>{errors.name.message}</FormMessage>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor='slug' className="text-sm font-medium">Slug *</Label>
                <Input 
                  {...register('slug')} 
                  placeholder='e.g. organic-raw-honey' 
                  className="h-10"
                />
                {errors.slug && (
                  <FormMessage>{errors.slug.message}</FormMessage>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor='brand' className="text-sm font-medium">Brand</Label>
                <Input 
                  {...register('brand')} 
                  placeholder='e.g. Nature&apos;s Best' 
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor='sku' className="text-sm font-medium">SKU</Label>
                <Input 
                  {...register('sku')} 
                  placeholder='e.g. HONEY-001' 
                  className="h-10"
                />
              </div>

              <Controller
                name='categoryId'
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium">Category *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-10">
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
                      <FormMessage>{errors.categoryId.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <Label htmlFor='status' className="text-sm font-medium">Status</Label>
                <Select
                  onValueChange={(val) => setValue('status', val as 'published' | 'draft')}
                  defaultValue={watch('status')}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='draft'>Draft</SelectItem>
                    <SelectItem value='published'>Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor='description' className="text-sm font-medium">Description *</Label>
              <Textarea 
                {...register('description')} 
                rows={4} 
                placeholder="Describe your product in detail..."
                className="resize-none"
              />
              {errors.description && (
                <FormMessage>{errors.description.message}</FormMessage>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing & Inventory
            </CardTitle>
            <CardDescription>
              Set pricing, stock levels, and promotional options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className="space-y-2">
                <Label htmlFor='price' className="text-sm font-medium">Regular Price *</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input 
                    type='number' 
                    {...register('price')} 
                    className="h-10 pl-8"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
                {errors.price && (
                  <FormMessage>{errors.price.message}</FormMessage>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor='salePrice' className="text-sm font-medium">Sale Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input 
                    type='number' 
                    {...register('salePrice')} 
                    className="h-10 pl-8"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor='stock' className="text-sm font-medium">Stock Quantity *</Label>
                <Input 
                  type='number' 
                  {...register('stock')} 
                  className="h-10"
                  placeholder="0"
                  min="0"
                />
                {errors.stock && (
                  <FormMessage>{errors.stock.message}</FormMessage>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
              <Switch
                id='isFeatured'
                checked={watch('isFeatured')}
                onCheckedChange={(val) => setValue('isFeatured', val)}
              />
              <Label htmlFor='isFeatured' className="text-sm font-medium">Featured Product</Label>
              <span className="text-xs text-muted-foreground ml-2">
                Featured products appear prominently on your store
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Cover Image */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Cover Image
            </CardTitle>
            <CardDescription>
              Main product image that will be displayed prominently
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor='coverImage' className="text-sm font-medium">Cover Image URL *</Label>
              <Input
                {...register('coverImage')}
                placeholder="https://example.com/cover-image.jpg"
                className="h-10"
              />
              {errors.coverImage && (
                <FormMessage>{errors.coverImage.message}</FormMessage>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Additional Images
            </CardTitle>
            <CardDescription>
              Additional images for product details and gallery
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {watchedImages.map((image, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  {...register(`images.${index}` as const)}
                  placeholder="https://example.com/image.jpg"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeImageField(index)}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addImageField}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Another Image
            </Button>
            {errors.images && (
              <FormMessage>{errors.images.message}</FormMessage>
            )}
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Tags
            </CardTitle>
            <CardDescription>
              Add tags to help customers find your product
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                disabled={!newTag.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {watchedTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {watchedTags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button
            type='submit'
            size="lg"
            className='bg-primary hover:bg-primary/90'
            disabled={isPending}>
            <Save className="mr-2 h-4 w-4" />
            {isPending ? 'Saving...' : (productId ? 'Update Product' : 'Create Product')}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
