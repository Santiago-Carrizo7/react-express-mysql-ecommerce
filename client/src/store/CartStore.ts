import { create } from "zustand";
import type { Product } from "../types/index.js";

interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

export const useCart = create<CartState>((set, get) => ({
    cart: [],


    addToCart: (product) => {
        const { cart } = get();
        if ( !cart.some(item => item.id === product.id) ){
            set((state) => ({
                cart: [...state.cart, product]
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
    }

})); 