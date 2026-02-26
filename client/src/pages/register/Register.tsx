import { useAuthStore } from "../../store/AuthStore.js";
import { useForm } from "react-hook-form"
import { useNavigate, Link } from "react-router-dom"
import styles from "./Register.module.css";
import type { RegisterFormInputs } from "../../types/index.js";

export function Register () {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>();

    const { signup } = useAuthStore();

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

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <label className={styles.label}>Nombre Completo
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
                    <label className={styles.label}>Correo Electrónico
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
                    <label className={styles.label}>Contraseña
                        <input 
                            type="password" 
                            className={styles.input}
                            {...register('password', { 
                                required: {
                                    value: true,
                                    message: 'La contraseña es obligatoria' 
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número'
                                }
                            })} 
                        />
                        {errors.password && (
                            <span className={styles.errorMsg}>{errors.password.message}</span>
                        )}
                    </label>
                    <label className={styles.label}>Telefono 
                        <input 
                            type="number"
                            className={styles.input} 
                            {...register('phone', {
                                pattern: {
                                    value: /^\d{1,10}$/,
                                    message: 'El teléfono debe tener solo números y menos de 10 dígitos'
                                }
                            })} 
                        />
                        {errors.phone && (
                            <span className={styles.errorMsg}>{errors.phone.message}</span>
                        )}
                    </label>
                    <button className={styles.button} type="submit">Crear Cuenta</button>
                </form>
                <div className={styles.linkText}>
                    ¿Ya tenés cuenta? <Link to="/login" className={styles.link}>Iniciá Sesión</Link>
                </div>
            </div>
        </div>
    )
}