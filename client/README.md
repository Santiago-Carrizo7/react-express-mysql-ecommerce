# E-Commerce Frontend - React + Vite + TypeScript

Frontend moderno y responsivo para un e-commerce completo. Desarrollado con React 19, Vite, TypeScript y Zustand para gestión de estado global.

## 🚀 Inicio Rápido

### Requisitos

- Node.js >= 18
- npm

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Accede a `http://localhost:5173` (o el puerto que Vite indique)

### Build para Producción

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## 🛠️ Tecnologías

| Tecnología       | Versión | Descripción                      |
| ---------------- | ------- | -------------------------------- |
| React            | 19.2.1  | Librería UI moderna              |
| Vite             | 7.2.4   | Build tool ultrarrápido          |
| TypeScript       | 5.9.3   | Tipado estático                  |
| React Router DOM | 7.12.0  | Enrutamiento client-side         |
| Zustand          | 5.0.9   | Gestión de estado global         |
| React Hook Form  | 7.71.1  | Gestión de formularios eficiente |
| Axios            | 1.13.2  | Cliente HTTP                     |
| ESLint           | 9.39.1  | Linting                          |

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── ProtectedRoute.tsx        # Rutas protegidas (requieren auth)
│   ├── header/
│   │   ├── Header.tsx            # Encabezado y navegación
│   │   └── Header.module.css     # Estilos del header
│   ├── footer/
│   │   ├── Footer.tsx            # Pie de página
│   │   └── Footer.module.css     # Estilos del footer
│   ├── hero/
│   │   ├── Hero.tsx              # Sección hero (inicio)
│   │   └── Hero.module.css       # Estilos del hero
│   └── spinner/
│       ├── Spinner.tsx           # Componente de carga
│       └── Spinner.module.css    # Estilos del spinner
├── config/
│   └── api.ts                    # Configuración de Axios
├── hooks/
│   └── useDebounce.ts            # Hook personalizado para debounce
├── pages/
│   ├── home/
│   │   ├── Home.tsx              # Página principal
│   │   └── Home.module.css
│   ├── login/
│   │   ├── Login.tsx             # Página de login
│   │   └── Login.module.css
│   ├── register/
│   │   ├── Register.tsx          # Página de registro
│   │   └── Register.module.css
│   ├── cart/
│   │   ├── Cart.tsx              # Página del carrito (protegida)
│   │   └── Cart.module.css
│   └── productsPage/
│       ├── ProductsPage.tsx      # Catálogo de productos
│       └── ProductsPage.module.css
├── store/
│   ├── AuthStore.ts              # Store de autenticación (Zustand)
│   └── CartStore.ts              # Store del carrito (Zustand)
├── types/
│   └── index.ts                  # Tipos compartidos
├── App.tsx                       # Componente raíz
├── main.tsx                      # Punto de entrada
├── index.css                     # Estilos globales
└── vite-env.d.ts                # Tipos de Vite
```

## 🎯 Características Implementadas

- ✅ **Autenticación completa** - Registro, login, logout con JWT
- ✅ **Carrito de compras** - Gestión con Zustand
- ✅ **Catálogo de productos** - Filtraje por categorías
- ✅ **Rutas protegidas** - Solo usuarios autenticados acceden al carrito
- ✅ **Gestión de estado global** - Zustand para Auth y Cart
- ✅ **Formularios validados** - React Hook Form
- ✅ **Responsive Design** - Adaptado a todos los dispositivos
- ✅ **Hot Module Replacement (HMR)** - Actualizaciones en tiempo real
- ✅ **TypeScript** - Code type-safe
- ✅ **ESLint configurado** - Código limpio y consistente

## 📍 Rutas de la Aplicación

| Ruta        | Descripción             | Autenticado |
| ----------- | ----------------------- | ----------- |
| `/`         | Página principal (Hero) | ❌          |
| `/products` | Catálogo de productos   | ❌          |
| `/login`    | Iniciar sesión          | ❌          |
| `/register` | Crear nueva cuenta      | ❌          |
| `/cart`     | Carrito de compras      | ✅          |

## 🔐 Autenticación

El flujo de autenticación se maneja con **JWT** y se persiste en `localStorage`:

1. **Registro** - El usuario crea una cuenta con email y contraseña
2. **Login** - Obtiene token JWT y lo almacena localmente
3. **Verificación automática** - Cada vez que se carga la app, se verifica si existe token válido
4. **Logout** - Limpia tokens y redirige al inicio

**AuthStore.ts** maneja todo el estado de autenticación de forma centralizada.

## 🛒 Carrito de Compras

El carrito se gestiona con **Zustand** ofreciendo:

- Agregar/eliminar productos
- Calcular totales automáticamente
- Persistencia de datos (opcional)
- Estado compartido entre componentes

## 🎨 Estilos

Se utilizan **CSS Modules** para encapsulación de estilos:

```tsx
import styles from "./Header.module.css";

export function Header() {
  return <header className={styles.header}>...</header>;
}
```

## 🔄 Flujo de Datos

```
Componentes
    ↓
React Hook Form (formularios)
    ↓
Zustand Stores (AuthStore, CartStore)
    ↓
Axios API Client (config/api.ts)
    ↓
Backend Express API
```

## 📝 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo con HMR
npm run build    # Build optimizado para producción
npm run lint     # Ejecutar ESLint
npm run preview  # Ver build de producción localmente
```

## 🚀 Optimizaciones

- **Vite** - Build ultrarrápido y HMR instantáneo
- **React 19** - Última versión con mejoras de rendimiento
- **CSS Modules** - Evita conflictos de CSS
- **Zustand** - Store ligero y performante
- **React Hook Form** - Gestión de formularios sin re-renders innecesarios
- **Debounce Hook** - Optimización de búsquedas y filtros

## 🧑‍💻 Desarrollo

Para desarrollar sobre este proyecto:

1. Hace cambios en los archivos de `src/`
2. Vite detecta cambios automáticamente y actualiza el navegador (HMR)
3. ESLint puede ejecutarse con `npm run lint` para verificar código

Los cambios en componentes, páginas y stores se reflejan instantáneamente.

## 📱 Responsive Design

El proyecto está completamente optimizado para:

- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 🖥️ Desktops (1024px+)

Utiliza CSS Grid y Flexbox para un layout flexible y moderno.

## 📱 Componentes Principales

### Header.jsx

- Navegación principal
- Enlace al carrito con contador
- Logo del proyecto

### Home.jsx

- Catálogo de productos
- Filtros por categoría
- Botón para agregar al carrito

### Cart.jsx

- Listado de productos en el carrito
- Cantidad y precio total
- Opciones de eliminar productos

## 🔗 Conexión con Backend

El proyecto está configurado para conectarse al API en `http://localhost:1234`.

Ver datos mock en [`src/services/products.js`](./src/services/products.js)

## 📦 Scripts Disponibles

| Script            | Descripción                   |
| ----------------- | ----------------------------- |
| `npm run dev`     | Inicia servidor de desarrollo |
| `npm run build`   | Build para producción         |
| `npm run preview` | Preview del build             |
| `npm run lint`    | Ejecuta ESLint                |

## 🎨 Estilos

Los estilos globales se encuentran en [`src/index.css`](./src/index.css).

Puedes modificar y añadir tus propios estilos allí o crear módulos CSS para componentes específicos.

## 🤝 Contribuir

1. Crea una rama: `git checkout -b feature/mi-feature`
2. Haz commit: `git commit -m 'Agregar feature'`
3. Push a la rama: `git push origin feature/mi-feature`
4. Abre un Pull Request

## 📝 Licencia

MIT - Ver [`LICENSE`](../LICENSE)
