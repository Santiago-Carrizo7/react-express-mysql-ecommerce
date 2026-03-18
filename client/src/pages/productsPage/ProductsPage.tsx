import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../config/api.js";
import { Spinner } from "../../components/spinner/Spinner.js";
import { useCart } from "../../store/CartStore.js";
import { useAuthStore } from "../../store/AuthStore.js";
import { useDebounce } from "../../hooks/useDebounce.js";
import styles from "./ProductsPage.module.css";
import type { Category, Filter, Product } from "../../types/index.js";

export function ProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [filters, setFilters] = useState<Filter>({
    search: "",
    categories: [],
    minPrice: "",
    maxPrice: "",
  });
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);

  const debouncedFilters = useDebounce(filters, 500);

  const { cart, addToCart } = useCart();
  const { isAuthenticated } = useAuthStore();

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    addToCart(product);
  };

  const fetchProducts = async (filtersToUse: Filter) => {
    setLoading(true);
    try {
      const res = await api.get("/products", { params: filtersToUse });
      setProducts(res.data);
    } catch (error) {
      console.error("Error cargando productos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/products/categories");
        setCategoriesList(res.data);
      } catch (error) {
        console.error("Error cargando categorías: ", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(debouncedFilters);
  }, [debouncedFilters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFilters({ search: "", categories: [], minPrice: "", maxPrice: "" });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categorySelected = e.target.value;
    setFilters((prev) => {
      let updatedCategories = [...prev.categories];

      if (updatedCategories.includes(categorySelected)) {
        updatedCategories = updatedCategories.filter(
          (cat) => cat !== categorySelected,
        );
      } else {
        updatedCategories.push(categorySelected);
      }

      return { ...prev, categories: updatedCategories };
    });
  };

  const isInCart = (product: Product) =>
    cart.some((item) => item.id === product.id);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Catálogo de Productos</h1>

      <div className={styles.contentWrapper}>
        <aside className={styles.filtersSidebar}>
          <div className={styles.sidebarHeader}>
            <h2 className={styles.sidebarTitle}>Filtros</h2>
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButtonLink}
            >
              Limpiar
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Buscar</label>
              <input
                type="text"
                name="search"
                placeholder="Ej. Teclado..."
                className={styles.searchInput}
                value={filters.search}
                onChange={handleChange}
              />
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Categorías</label>
              <div className={styles.checkboxGroup}>
                {categoriesList.map((cat) => (
                  <label key={cat.name} className={styles.checkboxLabel}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        type="checkbox"
                        value={cat.name}
                        checked={filters.categories.includes(cat.name)}
                        onChange={handleCategoryChange}
                        className={styles.checkboxInput}
                      />
                      {cat.name}
                    </div>
                    <span className={styles.countBadge}>{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Rango de Precio</label>
              <div className={styles.priceRow}>
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Mín"
                  className={styles.priceInput}
                  value={filters.minPrice}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Máx"
                  className={styles.priceInput}
                  value={filters.maxPrice}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </aside>

        <main className={styles.mainContent}>
          {loading ? (
            <Spinner />
          ) : products.length > 0 ? (
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <article key={product.id} className={styles.card}>
                  <img
                    src={
                      product.image_url ||
                      "https://placehold.co/400x400/2A2A40/FFFFFF?text=Sin+Imagen"
                    }
                    alt={product.name}
                    className={styles.cardImage}
                    loading="lazy"
                  />
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{product.name}</h3>
                    <p className={styles.cardPrice}>
                      $ {Number(product.price).toLocaleString("es-AR")}
                    </p>

                    {isInCart(product) ? (
                      <button className={styles.inCartBtn} disabled>
                        ✓ En el carrito
                      </button>
                    ) : (
                      <button
                        className={styles.addToCartBtn}
                        onClick={() => handleAddToCart(product)}
                      >
                        Añadir al Carrito
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <h3>No encontramos resultados</h3>
              <p>
                Probá cambiando los términos de búsqueda o limpiando los
                filtros.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
