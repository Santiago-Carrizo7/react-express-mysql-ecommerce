import { create } from "zustand";
import type { Product } from "../types/index.js";
import api from "../config/api.js";

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
    decreaseQuantity: (id: string) => void;
    increaseQuantity: (id: string) => void;
    checkout: () => Promise<boolean>;
}

export const useCart = create<CartState>((set, get) => ({
    cart: [],

    addToCart: (product) => {
        const { cart } = get();
        if ( !cart.find(item => item.id === product.id) ){
            set((state) => ({
                cart: [...state.cart, { ...product, quantity: 1 }]
            }))
        } else {
            set((state) => ({
                cart: state.cart.map(item => {
                    if (item.id === product.id) {
                        return { ...item, quantity: item.quantity + 1 }
                    }
                    return item;
                })
            }))
        }
    },
    
    removeFromCart: (id) => {
        set((state) => ({
            cart: state.cart.filter((product) => { return product.id !== id})
        })) 
    },

    clearCart: () => {
        set({ cart: []})
    },

    increaseQuantity: (id) => {
        set((state) => ({
            cart: state.cart.map( item => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 }
                }
                return item;
            })
        }))
    },

    decreaseQuantity: (id) => {
        const { cart, removeFromCart } = get();
        const item = cart.find(i => i.id === id);
        
        if (item && item.quantity <= 1) {
            removeFromCart(id);
        } else {
            set((state) => ({
                cart: state.cart.map(item => 
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
            }));
        }
    },

    checkout: async () => {
        const { cart, clearCart } = get();
        
        const orderProducts = cart.map(item => ({
            id: item.id,
            quantity: item.quantity
        }));

        try {
            const res = await api.post('/orders', { products: orderProducts });
            
            if (res.status === 201) {
                clearCart(); 
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error procesando la compra", error);
            return false;
        }
    }

})); 