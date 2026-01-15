import mysql from 'mysql2/promise';
import { randomUUID } from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

export const pool = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};


const connection = await mysql.createConnection(pool);

export class ProductModel {
  static async getAll ({ category }) {
    let sql = `
      SELECT 
        BIN_TO_UUID(p.id) id, 
        p.name, 
        p.price, 
        c.name as category 
      FROM product p 
      JOIN category c ON p.category_id = c.id
    `;
    const params = [];

    if (category) {
      sql += ` WHERE c.name = ?`;
      params.push(category);
    }

    const [products] = params.length > 0 
      ? await connection.query(sql, params) 
      : await connection.query(sql);

    return products;
  } 

  static async getById ({ id }) {
    const query = `
      SELECT 
        BIN_TO_UUID(p.id) id, 
        p.name, 
        p.price, 
        c.name as category 
      FROM product p 
      JOIN category c ON p.category_id = c.id
      WHERE p.id = UUID_TO_BIN(?)
    `;

    const [product] = await connection.query(query, [id]);

    if (product.length === 0) return null;
    return product[0];
  }

  static async create ({ input }) {
    const {
      name,
      price,
      category_id
    } = input;

    const uuid = randomUUID();

    try {
      await connection.query(
        `INSERT INTO product (id, name, price, category_id)
        VALUES (UUID_TO_BIN(?), ?, ?, UUID_TO_BIN(?))`,
        [uuid, name, price, category_id]
      );
    } catch (e) {
      console.error(e);
      throw new Error('Error creating product');
    }
    return { id: uuid, ...input };
  }

  static async update ({ id, input }) {
    const keys = Object.keys(input);   
    const values = Object.values(input); 
    // Si no hay keys para actualizar, salimos
    if (keys.length === 0) return false;

    // Armamos la parte del SET dinámicamente
    const setString = keys.map(key => `${key} = ?`).join(', ');

    // Agregamos el ID al final de los valores para el WHERE
    const finalValues = [...values, id];

    try {
      const [result] = await connection.query(`UPDATE product SET ${setString} WHERE id = UUID_TO_BIN(?)`, finalValues);
      
      return result.affectedRows > 0;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async delete ({ id }) {
    try {
      const [result] = await connection.query('DELETE FROM product WHERE id = UUID_TO_BIN(?)', [id]);

      // affectedRows si borró algo (1) o no encontró nada (0)
      return result.affectedRows > 0;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
