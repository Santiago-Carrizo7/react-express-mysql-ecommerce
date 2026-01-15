
import z from 'zod';

const productSchema = z.object({
  name: z.string({
    required_error: 'Name is required.',
    invalid_type_error: 'Name must be a string'
  }),
  price: z.number().positive(),
  category_id: z.string({
    required_error: 'Category ID is required.'
  }).uuid()
});

export function validateProduct (object) {
  return productSchema.safeParse(object);
}

export function validatePartialProduct (object) {
  return productSchema.partial().safeParse(object);
}
