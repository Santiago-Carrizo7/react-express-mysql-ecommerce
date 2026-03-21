import { useState } from "react";
import { useAuthStore } from "../../store/AuthStore.js";
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import styles from "./Register.module.css";
import type { RegisterFormInputs } from "../../types/index.js";

export function Register () {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>();

    const { signup, loading, errors: authErrors } = useAuthStore();

    const onSubmit = async (data: RegisterFormInputs) => {
        const success = await signup(data);
        if(success) {
            navigate('/')
        }
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.card}>
                <h1 className={styles.title}>Crear Cuenta</h1>
                <p className={styles.subTitle}>Registrate para acceder a los mejores beneficios</p>

                {authErrors.length > 0 && (
                    <div className={styles.globalError}>
                        {authErrors.map((error, index) => (
                            <span key={index}>{error}</span>
                        ))}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <label className={styles.label}>
                        Nombre Completo
                        <input 
                            type="text" 
                            className={styles.input}
                            {...register('name', { 
                                required: {
                                    value: true,
                                    message: 'El nombre es obligatorio' 
                                }
                            })} 
                        />
                        {errors.name && (
                            <span className={styles.errorMsg}>{errors.name.message}</span>
                        )}
                    </label>

                    <label className={styles.label}>
                        Correo Electrónico
                        <input 
                            type="email" 
                            className={styles.input}
                            {...register('email', { 
                                required: {
                                    value: true,
                                    message: 'El correo electrónico es obligatorio' 
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'El correo electrónico no es válido'
                                }
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
                                {...register('password', { 
                                    required: {
                                        value: true,
                                        message: 'La contraseña es obligatoria' 
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                        message: 'Mínimo 8 caracteres, una mayúscula, una minúscula y un número'
                                    }
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

                    <label className={styles.label}>
                        Teléfono 
                        <input 
                            type="number"
                            className={styles.input} 
                            {...register('phone', {
                                pattern: {
                                    value: /^\d{1,10}$/,
                                    message: 'El teléfono debe tener solo números y máximo 10 dígitos'
                                }
                            })} 
                        />
                        {errors.phone && (
                            <span className={styles.errorMsg}>{errors.phone.message}</span>
                        )}
                    </label>

                    <button 
                        className={styles.button} 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? "Creando..." : "Crear Cuenta"}
                    </button>
                </form>

                <div className={styles.linkText}>
                    ¿Ya tenés cuenta? <Link to="/login" className={styles.link}>Iniciá Sesión</Link>
                </div>
            </div>
        </div>
    );
}