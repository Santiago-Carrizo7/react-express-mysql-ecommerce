
export interface User {
    id?: string;
    name: string;
    password: string,
    email: string;
    phone?: string;
}

export interface Product {
    id: string;
    name: string;
    price: string; 
    category: string;
    description?: string | null;
    image_url?: string | null;
}

export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface Category {
    name: string;
    count: number;
}

export interface Filter {
  search: string;
  categories: string[];
  minPrice: string;
  maxPrice: string;
};