# E-Commerce Frontend - React + Vite

Frontend del proyecto e-commerce construido con React 19, Vite y Zustand para gestión de estado.

## 🚀 Inicio Rápido

### Requisitos

- Node.js >= 18
- npm o yarn

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

| Tecnología       | Versión | Uso                      |
| ---------------- | ------- | ------------------------ |
| React            | ^19.2.1 | Librería UI              |
| Vite             | ^7.2.4  | Build tool y dev server  |
| React Router DOM | ^7.12.0 | Enrutamiento             |
| Zustand          | ^5.0.9  | Gestión de estado global |
| ESLint           | ^9.39.1 | Linting                  |

## 📂 Estructura del Proyecto

```
src/
├── components/
│   └── Header.jsx          # Encabezado con navegación
├── pages/
│   ├── Home.jsx            # Página principal (catálogo)
│   └── Cart.jsx            # Página del carrito
├── context/
│   └── CartContext.jsx     # Context de carrito (legacy)
├── hooks/                  # Custom hooks
├── store/
│   └── CartStore.jsx       # Store de Zustand para carrito
├── services/
│   └── products.js         # Datos de productos (mock)
├── App.jsx                 # Componente raíz
├── main.jsx                # Punto de entrada
└── index.css               # Estilos globales
```

## 🎯 Características Implementadas

- ✅ Listado de productos con categorías
- ✅ Carrito de compras funcional
- ✅ Gestión de estado con Zustand
- ✅ Navegación con React Router
- ✅ Responsive Design
- ✅ Hot Module Replacement (HMR)
- ✅ ESLint configurado

## 🔄 Flujo de Estado

El carrito se maneja con **Zustand** en lugar de Context API:

```jsx
// store/CartStore.jsx
import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) => {
    /* ... */
  },
  removeFromCart: (id) => {
    /* ... */
  },
  clearCart: () => {
    /* ... */
  },
}));
```

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
