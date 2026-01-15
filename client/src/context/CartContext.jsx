import { createContext, use, useState } from "react";

export const CartContext = createContext();

export function CartProvider ({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        if ( !cart.some(item => item.id === product.id) ){
            setCart(() => { return [...cart, product]})
        }
    }

    const removeFromCart = (id) => {
        const newCart = cart.filter((product) => { return product.id !== id})
        setCart(newCart);
    }

    const clearCart = () => {
        setCart([]);
    }

    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart
    }

    return <CartContext value={value}> {children} </CartContext>
}

export function useCart(){
    const context = use(CartContext);

    if (context === undefined) {
        throw new Error("useCart debe usarse dentro de un CartProvider")
    }

    return context;
}