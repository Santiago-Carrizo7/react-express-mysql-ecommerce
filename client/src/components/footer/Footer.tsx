import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

export function Footer() { 
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerLinks}>
                    <Link to="/terminos" className={styles.footerLink}>Términos y Condiciones</Link>
                    <Link to="/privacidad" className={styles.footerLink}>Privacidad</Link>
                    <Link to="/contacto" className={styles.footerLink}>Contacto</Link>
                    
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
                        Redes Sociales
                    </a>
                </div>
                <p className={styles.copyright}>© 2026 Tienda Gamer. Todos los derechos reservados.</p>
            </div>
      </footer>
    );
}