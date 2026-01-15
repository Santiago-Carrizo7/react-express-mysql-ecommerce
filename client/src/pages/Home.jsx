import { products } from "../services/products.js"
import { useCart } from "./CartStore.jsx"


export function Home () {
    const { cart, addToCart } = useCart();

    const isInCart = (product) => {
        return cart.some((item) => item.id === product.id);
    }

    return (
        <div className="home-container">
            {
                products.map((product) => (
                    <div key={product.id} className="productContainer">
                        <h3 className="productTitle">Producto: {product.title} - Precio: {product.price}</h3>
                        <img src={product.image} alt={product.title} className="productImage"/>
                        <p className="productDescription">Descripcion: {product.description}</p>
                        {
                            isInCart(product) && <button className="isInCartButton">En carrito</button>
                        }
                        {
                            !isInCart(product) && <button className="addToCartButton" onClick={() => addToCart(product)}>Añadir al carrito</button>
                        }
                    </div>
                ))  
            }
        </div>
    )
}