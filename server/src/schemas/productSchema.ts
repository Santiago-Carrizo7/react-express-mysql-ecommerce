
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name must be a string'
  }),
  price: z.number().positive(),
  description: z.string().optional(),
  image_url: z.string().url().optional(),
  category_id: z.string({
    required_error: 'Category ID is required.'
  }).uuid()
});


const partialProductSchema = productSchema.partial();

export type PartialProduct = z.infer<typeof partialProductSchema>;

export type Product = z.infer<typeof productSchema>;

export function validateProduct (object: unknown) {
  return productSchema.safeParse(object);
}

export function validatePartialProduct (object: unknown) {
  return partialProductSchema.safeParse(object);
}
