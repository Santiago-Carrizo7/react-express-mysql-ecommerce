import { useCart } from "./CartStore.jsx";

export function Cart () {
    const { cart, removeFromCart, clearCart } = useCart();
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    
    return (
        <>
            <button className="clearCartButton" onClick={clearCart}>Limpiar Carrito</button>
            <div className="home-container">
                {
                    cart.map( (product) => (
                        <div key={product.id} className="productContainer">
                            <h3 className="productTitle">Producto: {product.title} - Precio: {product.price}</h3>
                            <img src={product.image} alt={product.title} className="productImage"/>
                            <p className="productDescription">Descripcion: {product.description}</p>
                            <button className="removeFromCartButton" onClick={() => removeFromCart(product.id)}>Eliminar del Carrito</button>
                        </div>
                    ))
                }
            </div>
            <p>Total a pagar: {total}</p>
        </>
    )
}