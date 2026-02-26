import { useCart } from "../../store/CartStore.js";
import styles from "./Cart.module.css";

export function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.cartHeader}>
        <button className={styles.clearButton} onClick={clearCart}>
          Limpiar Carrito
        </button>
      </div>

      <div className={styles.productGrid}>
        {cart.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <h3 className={styles.productTitle}>
              Producto: {product.name} - Precio: ${Number(product.price).toLocaleString()}
            </h3>
            <img
              src={product.image_url || "https://placehold.co/600x400?text=Sin+Imagen"}
              alt={product.name}
              className={styles.productImage}
            />
            <p className={styles.productDescription}>
              {product.description ? `Descripcion: ${product.description}` : "Sin descripción"}
            </p>
            <button
              className={styles.removeButton}
              onClick={() => removeFromCart(product.id)}
            >
              Eliminar del Carrito
            </button>
          </div>
        ))}
      </div>

      <div className={styles.totalContainer}>
        <p className={styles.totalText}>
          Total a pagar: <span className={styles.totalAmount}>${total.toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
}
