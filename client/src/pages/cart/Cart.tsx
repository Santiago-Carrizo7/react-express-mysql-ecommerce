import { useCart } from "../../store/CartStore.js";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";

export function Cart() {
  const { cart, removeFromCart, clearCart, decreaseQuantity, increaseQuantity, checkout } = useCart();
  const total = cart.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className={styles.pageContainer}>
        <h1 className={styles.pageTitle}>Carrito de Compras</h1>
        <div className={styles.emptyState}>
          <h2>Tu carrito está vacío 🛒</h2>
          <p>Parece que aún no has agregado ningún componente a tu setup.</p>
          <Link to="/products" className={styles.continueShoppingBtn}>
            Ir al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.pageTitle}>Carrito de Compras</h1>
      
      <div className={styles.cartLayout}>
        
        <section className={styles.itemsSection}>
          {cart.map((product) => (
            <article key={product.id} className={styles.cartItem}>
              <img
                src={product.image_url || "https://placehold.co/150x150/2A2A40/FFFFFF?text=Sin+Imagen"}
                alt={product.name}
                className={styles.itemImage}
              />
              
              <div className={styles.itemDetails}>
                <h3 className={styles.itemTitle}>{product.name}</h3>
                <span className={styles.itemPrice}>
                  $ {Number(product.price).toLocaleString('es-AR')}
                </span>
              </div>
              
              <div className={styles.itemActions}>
                <div className={styles.quantityControls}>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => decreaseQuantity(product.id)}
                    aria-label="Disminuir cantidad"
                  >
                    -
                  </button>
                  <span className={styles.quantityValue}>{product.quantity}</span>
                  <button
                    className={styles.quantityBtn}
                    onClick={() => increaseQuantity(product.id)}
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>

                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(product.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </section>

        <aside className={styles.summarySection}>
          <h2 className={styles.summaryTitle}>Resumen de la Orden</h2>
          
          <div className={styles.summaryRow}>
            <span>Cantidad de ítems:</span>
            <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
          </div>
          
          <div className={styles.summaryTotalRow}>
            <span>Total:</span>
            <span className={styles.totalAmount}>
              $ {total.toLocaleString('es-AR')}
            </span>
          </div>

          <button className={styles.checkoutBtn} onClick={checkout}>
            Finalizar Compra
          </button>

          <button className={styles.clearCartBtn} onClick={clearCart}>
            Vaciar Carrito
          </button>
        </aside>
      </div>
    </div>
  );
}
