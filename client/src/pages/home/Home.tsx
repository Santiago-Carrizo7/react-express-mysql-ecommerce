import { useEffect, useState, useRef } from "react";
import { useCart } from "../../store/CartStore.js";
import { Hero } from "../../components/hero/Hero.js";
import styles from "./Home.module.css";
import api from "../../config/api.js";
import { Spinner } from "../../components/spinner/Spinner.js";
import { Product } from "../../types/index.js";

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { cart, addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/products");

        if (res.data) {
          setProducts(res.data);
        }
      } catch (e) {
        console.error("Fallo la peticion de los productos: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const scroll = (direction: string) => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = 300;
      if (direction === "left") {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  const isInCart = (product: Product) => cart.some((item) => item.id === product.id);

  if (loading)
    return (
      <div className={styles.loadingContainer}>
        <Spinner />
      </div>
    );

  return (
    <>
      <div className={styles.pageContainer}>
        <Hero />

        <main className={styles.mainContent}>
          <h2 className={styles.sectionTitle}>Últimos Ingresos 🔥</h2>

          <div className={styles.carouselContainer}>
            <button
              className={`${styles.scrollButton} ${styles.leftBtn}`}
              onClick={() => scroll("left")}
            >
              ‹
            </button>

            <div className={styles.productCarousel} ref={carouselRef}>
              {products.slice(0, 10).map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <div className={styles.imageContainer}>
                    <img
                      src={
                        product.image_url ||
                        "https://placehold.co/400?text=Sin+Imagen"
                      }
                      alt={product.name}
                      className={styles.productImage}
                    />
                  </div>

                  <div className={styles.infoContainer}>
                    <h3 className={styles.productTitle}>{product.name}</h3>

                    <p className={styles.productDescription}>
                      {product.description || "Sin descripción disponible."}
                    </p>

                    <span className={styles.productPrice}>
                      $ {Number(product.price).toLocaleString()}
                    </span>

                    {isInCart(product) ? (
                      <button className={styles.inCartButton} disabled>
                        ✓ En el carrito
                      </button>
                    ) : (
                      <button
                        className={styles.addButton}
                        onClick={() => addToCart(product)}
                      >
                        Añadir al Carrito
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              className={`${styles.scrollButton} ${styles.rightBtn}`}
              onClick={() => scroll("right")}
            >
              ›
            </button>
          </div>
        </main>
      </div>
    </>
  );
}
