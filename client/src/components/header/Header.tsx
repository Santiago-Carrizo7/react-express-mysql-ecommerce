import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore.js"; 
import { useCart } from "../../store/CartStore.js"; 
import styles from "./Header.module.css";

export function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { isAuthenticated, user, logout } = useAuthStore();
  const { cart } = useCart();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/login'); 
  };

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        Tienda Gamer 
      </Link>

      <button className={styles.menuToggle} onClick={toggleMenu} aria-label="Toggle menu">
        <span className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}></span>
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
        <Link to="/" className={styles.link} onClick={closeMenu}>Inicio</Link>

        <Link to="/products" className={styles.link} onClick={closeMenu}>Productos</Link>
        
        <Link to="/cart" className={styles.cartLink} onClick={closeMenu}>
            Carrito
            {cart.length > 0 && <span className={styles.badge}>{cart.length}</span>}
        </Link>

        {isAuthenticated ? (
            <>
              <div className={styles.userWelcome}>
                  <span>Hola, <strong>{user?.name}</strong></span>
              </div>
              
              {/* Futura implementación para el administrador */}
              {/* <Link to="/admin" className={styles.link}>Admin</Link> */}

              <button onClick={handleLogout} className={`${styles.buttonBase} ${styles.buttonSecondary}`}>
                  Cerrar Sesión
              </button>
            </>
        ) : (
            <>
              <Link to="/login" className={styles.link} onClick={closeMenu}>Ingresar</Link>
              <Link to="/register" className={`${styles.buttonBase} ${styles.buttonPrimary}`} onClick={closeMenu}>
                  Registrarse
              </Link>
            </>
        )}
      </nav>
    </header>
  );
}