import { useSearchParams, Link } from "react-router-dom";
import styles from "./Pending.module.css";

export function Pending() {
    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('external_reference');

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            </div>
            <h1 className={styles.title}>Pago Pendiente</h1>
            <p className={styles.message}>
                Tu orden está siendo procesada. Puede tardar unos minutos en confirmarse.
                {orderId && <><br/>Número de orden: <strong>{orderId}</strong></>}
            </p>
            <div className={styles.actions}>
                <Link to="/" className={styles.buttonPrimary}>
                    Volver a la tienda
                </Link>
            </div>
        </div>
    );
}
