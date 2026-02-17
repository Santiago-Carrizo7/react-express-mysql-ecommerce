import styles from "./Footer.module.css";

export function Footer() { 
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
            <div className={styles.footerLinks}>
                <a href="#" className={styles.footerLink}>Términos y Condiciones</a>
                <a href="#" className={styles.footerLink}>Privacidad</a>
                <a href="#" className={styles.footerLink}>Contacto</a>
                <a href="#" className={styles.footerLink}>Redes Sociales</a>
            </div>
            <p>© 2026 Tienda Gamer. Todos los derechos reservados.</p>
            </div>
      </footer>
    )
}