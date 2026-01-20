import z from 'zod';

const userSchema = z.object({
    name: z.string({
        required_error: 'Name is required.',
        invalid_type_error: 'Name must be a string'
    }),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().optional(), 
})

export function validateUser ( object ) {
    return userSchema.safeParse(object);
}

export function validatePartialUser ( object ) {
    return userSchema.partial().safeParse(object);
}