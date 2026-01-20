import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore.jsx"; 
import { useCart } from "../store/CartStore.jsx"; 
import styles from "./Header.module.css";

export function Header() {
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuthStore();
  const { cart } = useCart();

  const handleLogout = async () => {
    await logout();
    navigate('/login'); 
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Tienda Gamer 
      </Link>

      <nav className={styles.nav}>
        <Link to="/" className={styles.link}>Inicio</Link>
        
        <Link to="/cart" className={styles.cartLink}>
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

              <button onClick={handleLogout} className={styles.button}>
                  Cerrar Sesión
              </button>
            </>
        ) : (
            <>
              <Link to="/login" className={styles.link}>Ingresar</Link>
              <Link to="/register" className={styles.button} style={{backgroundColor: '#8b5cf6'}}>
                  Registrarse
              </Link>
            </>
        )}
      </nav>
    </header>
  );
}