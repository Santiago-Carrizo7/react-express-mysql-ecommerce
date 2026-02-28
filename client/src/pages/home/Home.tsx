import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../store/CartStore.js";
import { Hero } from "../../components/hero/Hero.js";
import styles from "./Home.module.css";
import api from "../../config/api.js";
import { Spinner } from "../../components/spinner/Spinner.js";
import type { Product } from "../../types/index.js";

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
      const scrollAmount = 320;
      if (direction === "left") {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  const isInCart = (product: Product) => cart.some((item) => item.id === product.id);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className={styles.pageContainer}>
      <Hero />

      <main className={styles.mainContent}>
        
        <section className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚀</div>
            <h3 className={styles.featureTitle}>Envío Flash</h3>
            <p className={styles.featureDesc}>Recibe tu setup en menos de 24hs a todo el país.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🛡️</div>
            <h3 className={styles.featureTitle}>Garantía Oficial</h3>
            <p className={styles.featureDesc}>12 meses de cobertura directa con las marcas.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💳</div>
            <h3 className={styles.featureTitle}>Cuotas Fijas</h3>
            <p className={styles.featureDesc}>Abona con cualquier tarjeta de crédito.</p>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Armá tu Setup</h2>
          <div className={styles.categoriesGrid}>
            <Link to="/products?category=perifericos" className={styles.categoryCard} style={{background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80") center/cover'}}>
              <h3 className={styles.categoryTitle}>Periféricos</h3>
            </Link>
            <Link to="/products?category=componentes" className={styles.categoryCard} style={{background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&q=80") center/cover'}}>
              <h3 className={styles.categoryTitle}>Componentes PC</h3>
            </Link>
            <Link to="/products?category=monitores" className={styles.categoryCard} style={{background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80") center/cover'}}>
              <h3 className={styles.categoryTitle}>Monitores</h3>
            </Link>
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Últimos Ingresos 🔥</h2>
          
          <div className={styles.carouselContainer}>
            {products.length > 0 && (
                <button
                className={`${styles.scrollButton} ${styles.leftBtn}`}
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                >
                ‹
                </button>
            )}

            <div className={styles.productCarousel} ref={carouselRef}>
              {products.slice(0, 10).map((product) => (
                <article key={product.id} className={styles.productCard}>
                  <div className={styles.imageContainer}>
                    <img
                      src={product.image_url || "https://placehold.co/400x400/2A2A40/FFFFFF?text=Sin+Imagen"}
                      alt={product.name}
                      className={styles.productImage}
                      loading="lazy"
                    />
                  </div>

                  <div className={styles.infoContainer}>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <p className={styles.productDescription}>
                      {product.description || "Sin descripción disponible."}
                    </p>
                    <span className={styles.productPrice}>
                      $ {Number(product.price).toLocaleString('es-AR')}
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
                </article>
              ))}
            </div>

            {products.length > 0 && (
                <button
                className={`${styles.scrollButton} ${styles.rightBtn}`}
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                >
                ›
                </button>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}
