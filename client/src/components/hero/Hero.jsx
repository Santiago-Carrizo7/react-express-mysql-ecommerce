import styles from "./Hero.module.css";

export function Hero() {
    return (
        <section className={styles.hero}>
            <h1 className={styles.heroTitle}>Level Up Your Setup</h1>
            <p className={styles.heroSubtitle}>
            Los mejores periféricos y componentes para llevar tu experiencia de juego al siguiente nivel.
            </p>
        </section>
    );
}