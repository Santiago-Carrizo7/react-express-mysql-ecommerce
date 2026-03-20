import { pool } from "../../config/database.js";
import { randomUUID } from "node:crypto";

import type { Product, PartialProduct } from "../../schemas/productSchema.js";
import type { ProductFromDB, GetAllParams } from "../../types/index.js";
import type { ResultSetHeader } from "mysql2";


export class ProductModel {
  static async getAll({
    categories = [],
    minPrice = "",
    maxPrice = "",
    search = "",
    order = "",
  }: GetAllParams = {}) {
    let sql = `
      SELECT 
        BIN_TO_UUID(p.id) id, 
        p.name, 
        p.price,
        p.description,
        p.image_url,
        c.name as category 
      FROM product p 
      JOIN category c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (categories.length > 0) {
      const placeHolders = categories.map(() => "?").join(", ");
      sql += ` AND c.name IN (${placeHolders})`;
      params.push(...categories);
    }

    if (minPrice) {
      sql += ` AND p.price >= ?`;
      params.push(minPrice);
    }

    if (maxPrice) {
      sql += ` AND p.price <= ?`;
      params.push(maxPrice);
    }

    if (search) {
      sql += ` AND p.name LIKE ?`;
      params.push(`%${search}%`);
    }

    if (order === "price_asc") {
      sql += ` ORDER BY p.price ASC`;
    } else if (order === "price_desc") {
      sql += ` ORDER BY p.price DESC`;
    }

    const [products] =
      params.length > 0
        ? await pool.query(sql, params)
        : await pool.query(sql);

    return products;
  }

  static async getCategoriesWithCount() {
    const sql = `
      SELECT c.name, COUNT(*) as count
      FROM product p
      JOIN category c ON c.id = p.category_id
      GROUP BY c.id 
    `;

    const [categories] = (await pool.query(sql)) as [
      ProductFromDB[],
      unknown,
    ];
    return categories;
  }

  static async getById({ id }: { id: string }) {
    const query = `
      SELECT 
        BIN_TO_UUID(p.id) id, 
        p.name, 
        p.price,
        p.description,
        p.image_url,  
        c.name as category 
      FROM product p 
      JOIN category c ON p.category_id = c.id
      WHERE p.id = UUID_TO_BIN(?)
    `;

    const [product] = (await pool.query(query, [id])) as [
      ProductFromDB[],
      unknown,
    ];

    if (product.length === 0) return null;
    return product[0];
  }

  static async create({ input }: { input: Product }) {
    const { name, price, description, image_url, category_id } = input;

    const uuid = randomUUID();

    try {
      (await pool.query(
        `INSERT INTO product (id, name, price, description, image_url, category_id)
        VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, UUID_TO_BIN(?))`,
        [uuid, name, price, description, image_url, category_id],
      )) as [ResultSetHeader, unknown];
    } catch (e) {
      console.error(e);
      throw new Error("Error creating product");
    }
    return { id: uuid, ...input };
  }

  static async update({ id, input }: { id: string; input: PartialProduct }) {
    const keys = Object.keys(input);
    const values = Object.values(input);
    if (keys.length === 0) return false;

    const setString = keys.map((key) => `${key} = ?`).join(", ");

    const finalValues = [...values, id];

    try {
      const [result] = (await pool.query(
        `UPDATE product SET ${setString} WHERE id = UUID_TO_BIN(?)`,
        finalValues,
      )) as [ResultSetHeader, unknown];

      return result.affectedRows > 0;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async delete({ id }: { id: string }) {
    try {
      const [result] = (await pool.query(
        "DELETE FROM product WHERE id = UUID_TO_BIN(?)",
        [id],
      )) as [ResultSetHeader, unknown];

      return result.affectedRows > 0;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
