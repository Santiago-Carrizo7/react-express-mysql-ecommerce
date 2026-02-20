import * as z from 'zod';

export const orderSchema = z.object({
    products: z.array(
        z.object({
            id: z.string().uuid(),
            quantity: z.number().int().positive()
        })
    )
})

export type Order = z.infer<typeof orderSchema>;

export function validateOrder ( obj: unknown ){
    return orderSchema.safeParse(obj);
}