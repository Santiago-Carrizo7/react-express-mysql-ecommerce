# 🛒 E-Commerce Fullstack

Un proyecto de e-commerce completo y profesional con arquitectura moderna. Incluye autenticación segura, gestión de productos y órdenes, carrito de compras y panel de administración.


## 🎯 Descripción General

Este es un proyecto fullstack que demuestra:

- **Backend profesional**: API REST con autenticación JWT, validación de datos y gestión de bases de datos
- **Frontend moderno**: Interfaz responsiva con React, gestión de estado y formularios dinamicos
- **Arquitectura escalable**: Separación clara de responsabilidades, TypeScript completo
- **Mejores prácticas**: CORS configurado, cookies HttpOnly, hash de contraseñas, validación con Zod

## ✨ Características Principales

### 🔐 Autenticación

- Registro de usuarios con contraseñas hasheadas (Bcrypt)
- Login con JWT tokens
- Refresh tokens automáticos
- Rutas protegidas
- Logout seguro

### 🛍️ Gestión de Productos

- Listado completo de productos
- Filtrado por categorías
- CRUD de productos (crear, leer, actualizar, eliminar)
- Stock disponible

### 🛒 Carrito de Compras

- Agregar/eliminar productos
- Cálculo automático de totales
- Gestión con Zustand (state management)
- Sincronización con backend

### 📦 Órdenes

- Sistema de órdenes
- Historial de compras por usuario
- Validación de inventario

### 🎨 Interfaz

- Responsive Design (móvil, tablet, desktop)
- Componentes reutilizables
- Formularios con validación
- Indicadores de carga

## 🏗️ Stack Tecnológico

### Backend

```
Express 4.22.1 → API REST
TypeScript 5.9.3 → Type-safe
MySQL 5.7+ → Base de datos relacional
JWT → Autenticación segura
Bcrypt → Hash de contraseñas
Zod → Validación de esquemas
```

### Frontend

```
React 19.2.1 → UI library
Vite 7.2.4 → Build tool
TypeScript 5.9.3 → Type-safe
Zustand 5.0.9 → State management
React Router 7.12.0 → Routing
React Hook Form 7.71.1 → Forms
Axios 1.13.2 → HTTP client
```

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Santiago-Carrizo7/react-express-mysql-ecommerce.git
cd react-express-mysql-ecommerce
```

### 2. Configurar Backend

```bash
cd server
npm install
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=ecommerce
PORT=5000
SECRET_JWT_KEY=tu_clave_secreta
```

Crea la base de datos:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE ecommerce;
USE ecommerce;
SOURCE src/models/mysql/mysql.sql;
SOURCE src/models/mysql/SeedData.sql;
EXIT;
```

Inicia el servidor:

```bash
npm run dev
```

El backend estará en: `http://localhost:5000`

### 3. Configurar Frontend

```bash
cd ../client
npm install
npm run dev
```

El frontend estará en: `http://localhost:5173`

## 📂 Estructura del Proyecto

```
e-commerce/
├── server/                          # Backend Express + MySQL
│   ├── src/
│   │   ├── config/                 # Configuración (DB, JWT, etc)
│   │   ├── controllers/            # Lógica de negocio
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   └── orderController.ts
│   │   ├── middlewares/            # CORS, autenticación
│   │   ├── models/                 # Acceso a BD
│   │   ├── routes/                 # Definición de endpoints
│   │   ├── schemas/                # Validaciones (Zod)
│   │   ├── types/                  # Tipos TypeScript
│   │   └── app.ts                  # Express app
│   ├── .env.example
│   └── package.json
│
├── client/                          # Frontend React + Vite
│   ├── src/
│   │   ├── components/             # Componentes reutilizables
│   │   ├── pages/                  # Páginas (rutas)
│   │   ├── store/                  # Zustand stores
│   │   ├── config/                 # Axios config
│   │   ├── hooks/                  # Custom hooks
│   │   ├── types/                  # Tipos compartidos
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   └── package.json
│
└── README.md                        # Este archivo
```

## 🚀 Scripts Disponibles

### Backend

```bash
cd server
npm run dev      # Desarrollo con watch mode
npm start        # Producción
```

### Frontend

```bash
cd client
npm run dev      # Desarrollo
npm run build    # Build para producción
npm run lint     # Linting
npm run preview  # Ver build localmente
```

### Root

```bash
npm run dev:client      # Iniciar solo frontend
npm run dev:backend     # Iniciar solo backend
```

## 📡 API Endpoints

### Autenticación

```
POST   /auth/register    - Registrar usuario
POST   /auth/login       - Iniciar sesión
POST   /auth/refresh     - Renovar token
POST   /auth/logout      - Cerrar sesión
GET    /auth/verify      - Verificar autenticación
```

### Productos

```
GET    /products                 - Obtener todos
GET    /products/categories      - Obtener categorías
POST   /products                 - Crear (admin)
PATCH  /products/:id             - Actualizar (admin)
DELETE /products/:id             - Eliminar (admin)
```

### Órdenes

```
POST   /orders           - Crear orden
GET    /orders           - Obtener mis órdenes
```

## 🔐 Variables de Entorno

### Backend `.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=contraseña
DB_NAME=ecommerce
PORT=5000
NODE_ENV=development
SECRET_JWT_KEY=clave_muy_secreta_y_segura
SALT_ROUNDS=10
```

## 📱 Funcionalidades por Página

### Home (`/`)

- Sección hero con presentación
- Destaque de productos

### Productos (`/products`)

- Listado completo de productos
- Filtrado por categoría
- Búsqueda de productos
- Agregar al carrito

### Carrito (`/cart`) ⚠️ Requiere autenticación

- Ver productos agregados
- Modificar cantidades
- Eliminar productos
- Calcular total
- Información de envío

### Login (`/login`)

- Formulario de inicio de sesión
- Validación de datos
- Redirección automática

### Registro (`/register`)

- Crear nueva cuenta
- Validación de contraseña fuerte
- Email único

## 🎓 Conceptos Demostrados

### Backend

- ✅ REST API profesional
- ✅ Autenticación con JWT
- ✅ Validación de datos (Zod)
- ✅ Hash seguro de contraseñas (Bcrypt)
- ✅ CORS configurado
- ✅ Middlewares personalizados
- ✅ TypeScript completo
- ✅ Estructura escalable

### Frontend

- ✅ React con Hooks
- ✅ TypeScript type-safe
- ✅ Zustand para state management
- ✅ React Router para navigation
- ✅ React Hook Form para formularios
- ✅ CSS Modules
- ✅ Componentes reutilizables
- ✅ Custom hooks

## 🧪 Testing

_En desarrollo_

## 📝 Licencia

Este proyecto está bajo licencia MIT. Ver archivo LICENSE.

## 👤 Autor

**Santiago Carrizo**

- GitHub: [Santiago-Carrizo7](https://github.com/Santiago-Carrizo7)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios grandes, abre un issue primero para discutir qué te gustaría cambiar.

## 📚 Documentación

- [📖 Backend](./server/README.md) - Documentación detallada del servidor
- [📖 Frontend](./client/README.md) - Documentación detallada del cliente

## 🐛 Reporte de Bugs

Si encuentras un bug, abre un issue con:

- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots si es posible

---

**⭐ Si te gusta este proyecto, dale una estrella en GitHub!**
