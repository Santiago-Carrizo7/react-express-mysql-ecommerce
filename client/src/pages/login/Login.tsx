import { useAuthStore } from "../../store/AuthStore.js";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import type { LoginFormInputs } from "../../types/index.js";

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const { signin, loading, errors: authErrors } = useAuthStore();

  const onSubmit = async (data: LoginFormInputs) => {
    const success = await signin(data);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>Iniciar Sesion</h1>
        <p className={styles.subTitle}>
          Inicia sesión para acceder a los mejores beneficios
        </p>

        {authErrors.length > 0 && (
          <div className={styles.globalError}>
            {authErrors.map((error, index) => (
              <span key={index}>{error}</span>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <label className={styles.label}>
            Correo Electrónico
            <input
              type="email"
              className={styles.input}
              {...register("email", {
                required: {
                  value: true,
                  message: "El correo electrónico es obligatorio",
                },
              })}
            />
            {errors.email && (
              <span className={styles.errorMsg}>{errors.email.message}</span>
            )}
          </label>
          <label className={styles.label}>
            Contraseña
            <input
              type="password"
              className={styles.input}
              {...register("password", {
                required: {
                  value: true,
                  message: "La contraseña es obligatoria",
                },
              })}
            />
            {errors.password && (
              <span className={styles.errorMsg}>{errors.password.message}</span>
            )}
          </label>

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Verificando..." : "Iniciar Sesión"}
          </button>
        </form>
        
        <div className={styles.linkText}>
          ¿No tenés cuenta?{" "}
          <Link to="/register" className={styles.link}>
            Registrate
          </Link>
        </div>
      </div>
    </div>
  );
}
