DROP DATABASE IF EXISTS ecommercedb;
CREATE DATABASE ecommercedb;

USE ecommercedb;

DROP TABLE IF EXISTS category;
CREATE TABLE category (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(64) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS product;
CREATE TABLE product (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(128) NOT NULL,
    price DECIMAL(10,2)  NOT NULL CHECK (price > 0),
    description TEXT,
    image_url VARCHAR(255),
    category_id BINARY(16) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES category (id)
);

DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    name VARCHAR(128) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(255) DEFAULT NULL
);

DROP TABLE IF EXISTS refresh_token;
CREATE TABLE refresh_token (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    token TEXT NOT NULL,
    user_id BINARY(16) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS purchase_order;
CREATE TABLE purchase_order (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,  
    user_id BINARY(16) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

DROP TABLE IF EXISTS order_item;
CREATE TABLE order_item (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    order_id BINARY(16) NOT NULL,
    product_id BINARY(16) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    FOREIGN KEY (order_id) REFERENCES purchase_order (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);