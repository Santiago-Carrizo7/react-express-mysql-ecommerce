import { useSearchParams, Link } from "react-router-dom";
import styles from "./Failure.module.css";

export function Failure() {
    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('external_reference');

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
            </div>
            <h1 className={styles.title}>Pago Rechazado</h1>
            <p className={styles.message}>
                Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.
                {orderId && <><br/>Número de orden referenciada: <strong>{orderId}</strong></>}
            </p>
            <div className={styles.actions}>
                <Link to="/cart" className={styles.buttonRetry}>
                    Volver al Carrito
                </Link>
                <Link to="/" className={styles.buttonSecondary}>
                    Ir a la tienda
                </Link>
            </div>
        </div>
    );
}
