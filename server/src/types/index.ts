
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
    search?: string,
    order?: string
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
    status: 'PENDING' | 'PAID' | 'CANCELLED', 
    date: Date, 
    quantity: number, 
    price: number, 
    name: string, 
    image_url: string
    product_id: string;
}

export interface PaymentFromDB {
    id: string;
    order_id: string;
    provider: string;
    provider_payment_id: string;
    amount: number;
    status: 'REJECTED' | 'APPROVED' | 'IN_PROGRESS';
}

export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export type PaymentStatus = 'REJECTED' | 'APPROVED' | 'IN_PROGRESS';
