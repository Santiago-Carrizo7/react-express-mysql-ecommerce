import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useCart } from "../../store/CartStore";
import api from "../../config/api.js";
import styles from "./Success.module.css";

export function Success() {
    const { clearCart } = useCart();
    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('external_reference');

    useEffect(() => {
        if (!orderId) return;

        const fetchOrder = async () => {
            try {
                const res = await api.get(`/orders/${orderId}`);
                if (res.status === 200) {
                    const { status } = res.data;
                    if (status === 'PAID') {
                        clearCart();
                    }
                }
            } catch (error) {
                console.error("Error fetching order:", error);
            }
        };

        fetchOrder();
    }, [orderId, clearCart]);

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <h1 className={styles.title}>¡Pago Exitoso!</h1>
            <p className={styles.message}>
                Tu orden ha sido procesada correctamente. Gracias por tu compra.
                {orderId && <><br/>Número de orden: <strong>{orderId}</strong></>}
            </p>
            <Link to="/" className={styles.button}>
                Volver a la tienda
            </Link>
        </div>
    );
}