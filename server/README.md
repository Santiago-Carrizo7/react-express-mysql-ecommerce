# E-Commerce Backend - Express + MySQL

API REST del proyecto e-commerce construida con Express y MySQL.

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
cp src/.env.example src/.env
```

3. **Editar `.env` con tus credenciales MySQL**

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=ecommerce
PORT=1234
```

4. **Crear base de datos**

```bash
# Inicia MySQL
mysql -u root -p

# En la consola de MySQL
CREATE DATABASE ecommerce;
USE ecommerce;
SOURCE src/models/mysql/mysql.sql;
SOURCE src/models/mysql/SeedData.sql;
```

5. **Iniciar el servidor**

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:1234`

## 🛠️ Tecnologías

| Tecnología     | Versión | Uso                       |
| -------------- | ------- | ------------------------- |
| Express        | ^4.x    | Framework web             |
| MySQL2/Promise | ^3.x    | Driver MySQL con Promises |
| Dotenv         | 17.2.3  | Variables de entorno      |
| CORS           | ^2.x    | Control de origen         |
| Zod            | ^3.x    | Validación de esquemas    |

## 📂 Estructura del Proyecto

```
src/
├── config/                 # Configuraciones (vacío, para futuro)
├── controllers/
│   └── productController.js  # Lógica de productos
├── middlewares/
│   └── cors.js            # Configuración de CORS
├── models/
│   └── mysql/
│       ├── productModel.js    # Modelo de datos de productos
│       ├── mysql.sql          # Esquema de la BD
│       └── SeedData.sql       # Datos de prueba
├── routes/
│   └── productRoutes.js    # Rutas de productos
├── schemas/
│   └── productSchema.js    # Validaciones con Zod
└── .env.example            # Variables de entorno template
```

## 🔌 Endpoints de la API

### Productos

#### GET `/products`

Obtiene todos los productos

```bash
curl http://localhost:1234/products
```

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
