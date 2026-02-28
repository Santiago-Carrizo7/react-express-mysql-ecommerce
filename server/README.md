# E-Commerce Backend - Express + TypeScript + MySQL

API REST profesional para un e-commerce completo, con autenticación JWT, gestión de órdenes y productos. Desarrollada con Express, TypeScript y MySQL.

## 🚀 Inicio Rápido

### Requisitos

- Node.js >= 18
- MySQL >= 5.7
- npm

### Instalación

1. **Instalar dependencias**

```bash
npm install
```

2. **Configurar variables de entorno**

```bash
cp .env.example .env
```

3. **Editar `.env` con tus credenciales**

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=ecommerce
PORT=5000
NODE_ENV=development
SECRET_JWT_KEY=tu_clave_secreta_aqui
SALT_ROUNDS=10
```

4. **Crear base de datos**

```bash
mysql -u root -p
```

En la consola de MySQL:

```sql
CREATE DATABASE ecommerce;
USE ecommerce;
SOURCE src/models/mysql/mysql.sql;
SOURCE src/models/mysql/SeedData.sql;
```

5. **Inmediatamente después, inicia el servidor**

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5000`

## 🛠️ Tecnologías

| Tecnología     | Versión | Descripción                |
| -------------- | ------- | -------------------------- |
| Express        | 4.22.1  | Framework web robusto      |
| TypeScript     | 5.9.3   | Tipado estático            |
| MySQL2/Promise | 3.16.1  | Driver MySQL asincrónico   |
| JWT            | 9.0.3   | Autenticación por tokens   |
| Bcrypt         | 6.0.0   | Hash seguro de contraseñas |
| Zod            | 3.25.76 | Validación de esquemas     |
| CORS           | 2.8.5   | Control de origen          |
| Dotenv         | 17.2.3  | Variables de entorno       |

## 📂 Estructura del Proyecto

```
src/
├── config/
│   └── config.ts                 # Configuración centralizada
├── controllers/
│   ├── authController.ts         # Registro, login, refresh, logout
│   ├── productController.ts      # CRUD de productos y categorías
│   └── orderController.ts        # Crear y obtener órdenes
├── middlewares/
│   ├── cors.ts                   # Configuración de CORS
│   └── session.ts                # Middleware de autenticación JWT
├── models/
│   └── mysql/
│       ├── userModel.ts          # Modelo de usuarios
│       ├── productModel.ts       # Modelo de productos
│       ├── orderModel.ts         # Modelo de órdenes
│       ├── refreshTokenModel.ts  # Modelo de refresh tokens
│       ├── mysql.sql             # Esquema de la BD
│       └── SeedData.sql          # Datos iniciales
├── routes/
│   ├── authRoutes.ts             # Rutas de autenticación
│   ├── productRoutes.ts          # Rutas de productos
│   └── orderRoutes.ts            # Rutas de órdenes
├── schemas/
│   ├── userSchema.ts             # Validación de usuarios
│   ├── loginSchema.ts            # Validación de login
│   ├── productSchema.ts          # Validación de productos
│   └── orderSchema.ts            # Validación de órdenes
├── types/
│   └── index.ts                  # Tipos compartidos
└── app.ts                        # Configuración de Express
```

## 🔐 Autenticación

El proyecto usa **JWT (JSON Web Tokens)** con cookies HttpOnly para mayor seguridad:

- **Registro**: Crear cuenta con email y contraseña hasheada
- **Login**: Obtener tokens de acceso y refresh
- **Refresh**: Renovar token de acceso sin volver a loguear
- **Verify**: Validar token actual
- **Logout**: Invalidar sesión

## 🔌 Endpoints de la API

### Autenticación (`/auth`)

| Método | Ruta        | Descripción             | Autenticado |
| ------ | ----------- | ----------------------- | ----------- |
| POST   | `/register` | Registrar nuevo usuario | ❌          |
| POST   | `/login`    | Iniciar sesión          | ❌          |
| POST   | `/refresh`  | Renovar token           | ❌          |
| POST   | `/logout`   | Cerrar sesión           | ✅          |
| GET    | `/verify`   | Verificar autenticación | ✅          |

**Ejemplo - Registro:**

```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "Segura123!",
    "phone": "1234567890"
  }'
```

**Ejemplo - Login:**

```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "Segura123!"
  }'
```

### Productos (`/products`)

| Método | Ruta          | Descripción                  | Autenticado |
| ------ | ------------- | ---------------------------- | ----------- |
| GET    | `/`           | Obtener todos los productos  | ❌          |
| GET    | `/categories` | Obtener categorías con count | ❌          |
| POST   | `/`           | Crear producto               | ✅          |
| PATCH  | `/:id`        | Actualizar producto          | ✅          |
| DELETE | `/:id`        | Eliminar producto            | ✅          |

**Ejemplo - Obtener productos:**

```bash
curl http://localhost:5000/products
```

**Ejemplo - Crear producto (requiere autenticación):**

```bash
curl -X POST http://localhost:5000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "Laptop",
    "price": 1200,
    "category": "Computación",
    "stock": 10
  }'
```

### Órdenes (`/orders`)

| Método | Ruta | Descripción                 | Autenticado |
| ------ | ---- | --------------------------- | ----------- |
| POST   | `/`  | Crear nueva orden           | ✅          |
| GET    | `/`  | Obtener órdenes del usuario | ✅          |

**Ejemplo - Crear orden:**

```bash
curl -X POST http://localhost:5000/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "items": [
      { "productId": 1, "quantity": 2 }
    ]
  }'
```

## 🔒 Variables de Entorno

Copia el contenido de `.env.example` a `.env`:

```env
DB_HOST=localhost              # Host de MySQL
DB_USER=root                   # Usuario de MySQL
DB_PASSWORD=contraseña         # Contraseña de MySQL
DB_NAME=ecommerce              # Nombre de la BD
PORT=5000                      # Puerto del servidor
NODE_ENV=development           # Ambiente (development/production)
SECRET_JWT_KEY=tu_clave_secreta  # Clave para firmar JWT
SALT_ROUNDS=10                 # Rondas de bcrypt
```

## 📝 Scripts Disponibles

```bash
npm run dev    # Iniciar servidor con watch mode (tsx)
npm start      # Iniciar servidor en producción
```

## ✨ Características Principales

- ✅ Autenticación segura con JWT + Bcrypt
- ✅ Refresh tokens automáticos
- ✅ Validación de datos con Zod
- ✅ CORS configurado
- ✅ Gestión completa de productos (CRUD)
- ✅ Sistema de órdenes
- ✅ TypeScript para código type-safe
- ✅ Middleware de sesión
- ✅ Cookies HttpOnly

## 🧑‍💻 Desarrollo

El servidor utiliza `tsx watch` para recargar automáticamente la aplicación cuando haces cambios:

```bash
npm run dev
```

Los cambios en `src/**` se recargarán automáticamente sin necesidad de reiniciar.

**Parámetros de query:**

- `category` (opcional): Filtrar por categoría

```bash
curl http://localhost:1234/products?category=Computación
```

**Respuesta:**

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Laptop Gamer",
    "price": 1200,
    "category": "Computación"
  }
]
```

---

#### POST `/products`

Crear un nuevo producto

**Request:**

```bash
curl -X POST http://localhost:1234/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Monitor 4K",
    "price": 450,
    "category_id": 1
  }'
```

**Body:**

```json
{
  "name": "string (requerido)",
  "price": "number (requerido)",
  "category_id": "number (requerido)"
}
```

**Respuesta (201):**

```json
{
  "id": "nuevo-uuid",
  "name": "Monitor 4K",
  "price": 450,
  "category_id": 1
}
```

---

#### PATCH `/products/:id`

Actualizar un producto

**Request:**

```bash
curl -X PATCH http://localhost:1234/products/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Monitor 4K UltraWide",
    "price": 500
  }'
```

**Body:**
Todos los campos son opcionales

```json
{
  "name": "string (opcional)",
  "price": "number (opcional)",
  "category_id": "number (opcional)"
}
```

---

#### DELETE `/products/:id`

Eliminar un producto

**Request:**

```bash
curl -X DELETE http://localhost:1234/products/550e8400-e29b-41d4-a716-446655440000
```

**Respuesta:**

```json
{
  "message": "Producto eliminado"
}
```

## 🔐 Configuración de Variables de Entorno

Archivo: `src/.env`

```env
# Base de datos MySQL
DB_HOST=localhost          # Host del servidor MySQL
DB_USER=root               # Usuario de MySQL
DB_PASSWORD=tu_contraseña  # Contraseña de MySQL
DB_NAME=ecommerce          # Nombre de la base de datos

# Servidor
PORT=1234                  # Puerto en el que corre el servidor
```

**Ejemplo completo:**

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin123
DB_NAME=ecommerce
PORT=1234
```

## 📊 Base de Datos

### Tablas

- `product` - Productos
- `category` - Categorías de productos

### Scripts SQL

- `src/models/mysql/mysql.sql` - Esquema de la BD
- `src/models/mysql/SeedData.sql` - Datos de prueba

Ver estructura en los archivos SQL.

## 🧪 Testing de la API

Usa Postman, Insomnia o cURL para probar los endpoints.

Hay un archivo de referencia: `api.http` (para REST Client en VS Code)

## 📦 Scripts Disponibles

| Script        | Descripción                    |
| ------------- | ------------------------------ |
| `npm run dev` | Inicia servidor con watch mode |
| `npm start`   | Inicia servidor en producción  |

## 🔄 CORS

La API está configurada para aceptar peticiones desde:

- `http://localhost:1234`
- `http://localhost:8080`

Modifica `src/middlewares/cors.js` para agregar más orígenes.

## 📝 Validación

La validación se realiza con **Zod** en `src/schemas/productSchema.js`.

Ejemplo:

```javascript
export const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  category_id: z.number().positive(),
});
```

## 🐛 Troubleshooting

### Error: "Cannot find module 'dotenv'"

```bash
npm install
```

### Error: "Access denied for user 'root'@'localhost'"

Verifica las credenciales en `src/.env`

### Puerto 1234 ya en uso

Cambia el puerto en `src/.env` o cierra la aplicación que lo usa

### Error de conexión MySQL

1. Verifica que MySQL está corriendo
2. Comprueba credenciales en `src/.env`
3. Verifica que la BD `ecommerce` existe

## 🤝 Contribuir

1. Crea una rama: `git checkout -b feature/mi-feature`
2. Haz commit: `git commit -m 'Agregar feature'`
3. Push a la rama: `git push origin feature/mi-feature`
4. Abre un Pull Request

## 📝 Licencia

MIT - Ver [`LICENSE`](../LICENSE)

## 👤 Autor

Santiago Carrizo - [GitHub](https://github.com/Santiago-Carrizo7)
