import * as z from 'zod';

const orderSchema = z.object({
    products: z.array(
        z.object({
            id: z.string().uuid(),
            quantity: z.number().int().positive()
        })
    )
})

export function validateOrder ( obj ){
    return orderSchema.safeParse(obj);
}