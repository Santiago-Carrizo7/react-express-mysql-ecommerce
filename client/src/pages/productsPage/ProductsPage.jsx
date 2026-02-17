import { useEffect, useState } from "react";
import api from "../../config/api.js";
import { Spinner } from "../../components/spinner/Spinner.jsx";
import { useCart } from "../../store/CartStore.jsx";
import styles from "./ProductsPage.module.css";

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    categories: [],
    minPrice: "",
    maxPrice: "",
  });
  const [categoriesList, setCategoriesList] = useState([]);

  const { addToCart } = useCart();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products", { params: filters });
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
    fetchProducts();
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFilters({ search: "", categories: [], minPrice: "", maxPrice: "" });
  };

  const handleCategoryChange = (e) => {
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

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Catálogo de Productos</h1>

      <div className={styles.contentWrapper}>
        <aside className={styles.filtersSidebar}>
          <form>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Buscar</label>
              <input
                type="text"
                name="search"
                placeholder="Buscar producto..."
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
                    <span className={styles.countBadge}>({cat.count})</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Precio</label>
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

            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
            >
              Limpiar
            </button>
          </form>
        </aside>

        <main style={{ flex: 1 }}>
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner />
            </div>
          ) : products.length > 0 ? (
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <div key={product.id} className={styles.card}>
                  <img
                    src={
                      product.image_url ||
                      "https://placehold.co/400?text=No+Image"
                    }
                    alt={product.name}
                    className={styles.cardImage}
                  />
                  <div className={styles.cardInfo}>
                    <h3 className={styles.cardTitle}>{product.name}</h3>
                    <p className={styles.cardPrice}>
                      $ {Number(product.price).toLocaleString()}
                    </p>
                    <button
                      className={styles.filterButton}
                      style={{ marginTop: "auto", fontSize: "0.9rem" }}
                      onClick={() => addToCart(product)}
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <h3>No encontramos nada </h3>
              <p>Probá cambiando los términos de búsqueda o los filtros.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
