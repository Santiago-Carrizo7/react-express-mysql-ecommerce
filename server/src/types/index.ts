
export interface UserFromDB {
    id: string;
    email: string;
    password: string; 
    name: string;
    phone?: string;
}

export interface ProductFromDB {
    id: string; 
    name: string;
    price: string; 
    description: string | null;
    image_url: string | null;
    category_id: string;
}

export interface GetAllParams {
    categories?: string[], 
    minPrice?: string, 
    maxPrice?: string, 
    search?: string 
}

export interface RefreshToken {
    token: string;
    user_id: string;
    expiresAt: Date;
}

export interface OrderFromInput {
    user_id: string;
}

export interface OrderFromDB {
    order_id: string, 
    date: Date, 
    quantity: number, 
    price: number, 
    name: string, 
    image_url: string
}
