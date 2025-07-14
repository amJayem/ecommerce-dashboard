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
import { useCreateProduct } from '@/hooks/use-products'
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
import { z } from 'zod'
import { FormControl, FormItem, FormLabel } from '../ui/form'

type ProductFormValues = z.infer<typeof productSchema>

const categories = [
  { id: 'cat1', name: 'Fruits' },
  { id: 'cat2', name: 'Nuts' },
  { id: 'cat3', name: 'Oils' }
]

export function AddProductForm() {

  const { mutateAsync, isPending } = useCreateProduct();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: {
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
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = form

  const onSubmit: SubmitHandler<ProductFormValues> = async (
    data: ProductFormValues
  ) => {
    try {
      await mutateAsync({
        name: data?.name,
        price: data?.price,
        description: data?.description,
      });
      toast.success("Product created!");
      form.reset();               // clear the form
    } catch (err: any) {
      toast.error(err.message);
    }

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
