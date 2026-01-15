# E-Commerce React + Express + MySQL

Un proyecto fullstack de e-commerce con React (Vite) en el frontend y Express + MySQL en el backend.

## 📸 Características

- 🛒 Carrito de compras funcional con Zustand
- 📱 Interfaz responsiva con React + Vite
- 🔄 API REST con Express
- 💾 Base de datos MySQL
- 🔒 Validación de datos con esquemas
- 🌐 CORS configurado
- ⚡ Hot Module Replacement (HMR)
- 📝 ESLint configurado

## 🛠️ Tecnologías

### Frontend

- **React 19** - Librería UI
- **Vite** - Build tool
- **React Router DOM** - Enrutamiento
- **Zustand** - Gestión de estado
- **ESLint** - Linter

### Backend

- **Express** - Framework web
- **MySQL2/Promise** - Driver MySQL
- **Dotenv** - Gestión de variables de entorno
- **Zod** - Validación de esquemas

## 📦 Instalación

### Requisitos

- Node.js >= 18
- MySQL >= 5.7

### 1. Clonar el repositorio

```bash
git clone https://github.com/Santiago-Carrizo7/react-express-mysql-ecommerce.git
cd react-express-mysql-ecommerce
```

### 2. Configurar Backend

```bash
cd server
npm install
cp src/.env.example src/.env
# Edita src/.env con tus credenciales de MySQL
npm run dev
```

### 3. Configurar Frontend

```bash
cd ../client
npm install
npm run dev
```

## 📖 Documentación

- [📚 Frontend](./client/README.md) - Guía del cliente
- [🚀 Backend](./server/README.md) - Guía del servidor

## 🎯 Endpoints de la API

### Productos

- `GET /products` - Obtener todos los productos
- `GET /products?category=Computación` - Filtrar por categoría
- `POST /products` - Crear producto
- `PATCH /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

## 📂 Estructura del Proyecto

```
e-commerce/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes reutilizables
│   │   ├── pages/         # Páginas (Home, Cart)
│   │   ├── context/       # Context API
│   │   ├── services/      # Datos de productos
│   │   └── store/         # Zustand stores
│   └── vite.config.js
├── server/                 # Backend Express
│   ├── src/
│   │   ├── controllers/   # Lógica de rutas
│   │   ├── models/        # Modelos de datos
│   │   ├── routes/        # Definición de rutas
│   │   ├── schemas/       # Validaciones
│   │   └── middlewares/   # CORS, etc
│   ├── app.js             # Servidor principal
│   └── package.json
└── README.md              # Este archivo
```

## 🚀 Desarrollo

### Cliente

```bash
cd client
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run lint     # Ejecutar ESLint
```

### Servidor

```bash
cd server
npm run dev      # Servidor con watch mode
npm start        # Servidor en producción
```

## 🔐 Variables de Entorno

Ver archivos `.env.example` en cada carpeta:

- [`server/src/.env.example`](./server/src/.env.example)

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## 👤 Autor

Santiago Carrizo - [GitHub](https://github.com/Santiago-Carrizo7)
