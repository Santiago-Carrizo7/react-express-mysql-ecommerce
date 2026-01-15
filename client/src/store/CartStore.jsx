import { create } from "zustand";

export const useCart = create((set, get) => ({
    //state
    cart: [],


    //Actions
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