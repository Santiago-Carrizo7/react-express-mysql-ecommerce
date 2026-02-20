export const PORT = process.env.PORT || 1234;
export const SALT_ROUNDS = process.env.SALT_ROUNDS || 4;
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || 'default_secret_key';

export const DEFAULT_CONFIG = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port: Number(process.env.DB_PORT) || 3306,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ecommercedb'
};