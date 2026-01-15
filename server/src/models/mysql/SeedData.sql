USE ecommercedb;

-- 1. DESACTIVAMOS EL SAFE MODE TEMPORALMENTE
SET SQL_SAFE_UPDATES = 0;

-- 2. Limpiamos las tablas (Ahora sí te va a dejar)
DELETE FROM order_item;
DELETE FROM purchase_order;
DELETE FROM product;
DELETE FROM category;
DELETE FROM user;

-- 3. VOLVEMOS A ACTIVAR EL SAFE MODE (Por seguridad)
SET SQL_SAFE_UPDATES = 1;

-- 4. Insertamos CATEGORIAS (Guardamos los IDs en variables para usarlos despues)
SET @cat_perifericos = UUID();
SET @cat_monitores = UUID();
SET @cat_audio = UUID();

INSERT INTO category (id, name) VALUES 
(UUID_TO_BIN(@cat_perifericos), 'Perifericos'),
(UUID_TO_BIN(@cat_monitores), 'Monitores'),
(UUID_TO_BIN(@cat_audio), 'Audio');

-- 5. Insertamos USUARIOS
SET @user_pepito = UUID();
SET @user_juan = UUID();

INSERT INTO user (id, name, email, phone, age) VALUES
(UUID_TO_BIN(@user_pepito), 'Pepito Gamer', 'pepito@gmail.com', '11223344', 24),
(UUID_TO_BIN(@user_juan), 'Juan Pro', 'juan@gmail.com', '55667788', 30);

-- 6. Insertamos PRODUCTOS (Usando las variables de Categoria)
-- Notá que en category_id ponemos UUID_TO_BIN(@cat_perifericos)
INSERT INTO product (id, name, price, category_id) VALUES
(UUID_TO_BIN(UUID()), 'Mouse Logitech G203', 35000.00, UUID_TO_BIN(@cat_perifericos)),
(UUID_TO_BIN(UUID()), 'Teclado Redragon', 45000.00, UUID_TO_BIN(@cat_perifericos)),
(UUID_TO_BIN(UUID()), 'Monitor Samsung 24', 180000.00, UUID_TO_BIN(@cat_monitores)),
(UUID_TO_BIN(UUID()), 'Monitor LG UltraGear', 250000.00, UUID_TO_BIN(@cat_monitores)),
(UUID_TO_BIN(UUID()), 'Auriculares HyperX', 60000.00, UUID_TO_BIN(@cat_audio));

-- 7. Verificamos que cargó bien (y mostramos los IDs legibles)
SELECT BIN_TO_UUID(id) as id, name FROM category;
SELECT BIN_TO_UUID(id) as id, name, price, BIN_TO_UUID(category_id) as cat_id FROM product;