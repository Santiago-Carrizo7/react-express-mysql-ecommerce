
export type UserFromDB = {
    id: string;
    email: string;
    password: string; 
    name: string;
    phone?: string;
}

export type ProductFromDB = {
    id: string; 
    name: string;
    price: string; 
    description: string | null;
    image_url: string | null;
    category_id: string;
}

export type GetAllParams = {
    categories?: string[], 
    minPrice?: string, 
    maxPrice?: string, 
    search?: string 
}

export type RefreshToken = {
    token: string;
    user_id: string;
    expiresAt: Date;
}

export type OrderFromInput = {
    user_id: string;
}

export type OrderFromDB = {
    order_id: string, 
    date: Date, 
    quantity: number, 
    price: number, 
    name: string, 
    image_url: string
}
