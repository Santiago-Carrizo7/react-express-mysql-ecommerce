import { useState } from "react";
import { useAuthStore } from "../../store/AuthStore.js";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import type { LoginFormInputs } from "../../types/index.js";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
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
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.passwordInput}
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es obligatoria",
                  },
                })}
              />
              <button 
                type="button" 
                className={styles.toggleBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" x2="22" y1="2" y2="22" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
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
