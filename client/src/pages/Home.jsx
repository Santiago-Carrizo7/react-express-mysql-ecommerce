import { products } from "../services/products.js";
import { useCart } from "../store/CartStore.jsx";
import styles from "./Home.module.css";

export function Home() {
  const { cart, addToCart } = useCart();

  const isInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <h3 className={styles.productTitle}>
              Producto: {product.title} - Precio: {product.price}
            </h3>
            <img
              src={product.image}
              alt={product.title}
              className={styles.productImage}
            />
            <p className={styles.productDescription}>
              Descripcion: {product.description}
            </p>
            {isInCart(product) && (
              <button className={styles.inCartButton}>En carrito</button>
            )}
            {!isInCart(product) && (
              <button
                className={styles.addButton}
                onClick={() => addToCart(product)}
              >
                Añadir al carrito
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
