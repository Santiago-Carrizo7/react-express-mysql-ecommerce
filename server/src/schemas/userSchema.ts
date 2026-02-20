import z from 'zod';

export const userSchema = z.object({
    name: z.string({
        required_error: 'Name is required.',
        invalid_type_error: 'Name must be a string'
    }),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().optional(), 
})

export type User = z.infer<typeof userSchema>;

export function validateUser ( object: unknown ) {
    return userSchema.safeParse(object);
}

export function validatePartialUser ( object: unknown ) {
    return userSchema.partial().safeParse(object);
}