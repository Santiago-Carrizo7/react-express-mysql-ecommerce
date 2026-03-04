import { randomUUID } from "node:crypto";
import { pool } from "../../config/database.js";

import type { PoolConnection } from "mysql2/promise";
import type { Order } from "../../schemas/orderSchema.js";
import type { OrderFromDB, OrderFromInput } from "../../types/index.js";


export class OrderModel {
  static async create({ input }: { input: OrderFromInput & Order }): Promise<string> {
    const { user_id, products } = input;

    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const newOrderId = randomUUID();

      await connection.query(
        `
                INSERT INTO purchase_order (id, status, user_id)
                VALUES (UUID_TO_BIN(?), 'PENDING', UUID_TO_BIN(?))
            `,
        [newOrderId, user_id],
      );

      const sql = `
                SELECT BIN_TO_UUID(id) as id, price
                FROM product
                WHERE BIN_TO_UUID(id) IN (?)
            `;

      const productIds = products.map((p) => p.id);
      const [dbProducts] = (await connection.query(sql, [productIds])) as [
        { id: string; price: number }[],
        unknown,
      ];

      for (const dbProduct of dbProducts) {
        const itemFromInput = products.find((p) => p.id === dbProduct.id);

        if (!itemFromInput) {
          await connection.rollback();
          throw new Error(
            `Producto con id ${dbProduct.id} no encontrado en la orden`,
          );
        }

        await connection.query(
          `
                    INSERT INTO order_item (order_id, product_id, quantity, price)
                    VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?)
                `,
          [newOrderId, dbProduct.id, itemFromInput.quantity, dbProduct.price],
        );
      }

      await connection.commit();
      return newOrderId;
    } catch (err) {
      await connection.rollback();
      console.error("Error en transacción:", err);
      throw new Error("No se pudo procesar la compra");
    } finally {
      connection.release();
    }
  }

  static async getAllByUser({ user_id }: { user_id: string }): Promise<OrderFromDB[]> {
    const sql = `
            SELECT 
              BIN_TO_UUID(po.id) as order_id,
              po.date,
              oi.quantity,
              oi.price,
              p.name,
              p.image_url
            FROM purchase_order po
            INNER JOIN order_item oi ON oi.order_id = po.id
            INNER JOIN product p ON oi.product_id = p.id
            WHERE po.user_id = UUID_TO_BIN(?)
        `;

    try {
      const [orders] = (await pool.query(sql, [user_id])) as [
        OrderFromDB[],
        unknown,
      ];
      if (orders.length == 0) return [];
      return orders;
    } catch (err) {
      console.error("Error al obtener las ordenes del usuario:", err);
      throw new Error("No se pudieron obtener las ordenes del usuario");
    }
  }

  static async getAllByOrderId({ order_id }: { order_id: string }): Promise<OrderFromDB[]> {
    const sql = `
      SELECT
        BIN_TO_UUID(po.id) as order_id,
        po.status,
        po.date,
        oi.quantity,
        oi.price,
        BIN_TO_UUID(oi.product_id) as product_id,
        p.name,
        p.image_url
      FROM purchase_order po
      INNER JOIN order_item oi ON oi.order_id = po.id
      INNER JOIN product p ON oi.product_id = p.id
      WHERE po.id = UUID_TO_BIN(?)
    `;

    try {
      const [orders] = await pool.query(sql, [order_id]) as [OrderFromDB[], unknown];
      return orders;
    } catch (err) {
      console.error("Error al obtener la orden por ID:", err);
      throw new Error("No se pudo obtener la orden por ID");
    }
  }

  static async updateStatus(
    connection: PoolConnection,
    { orderId, status }: { orderId: string; status: 'PENDING' | 'PAID' | 'CANCELLED' }
  ): Promise<void> {
    const sql = `
      UPDATE purchase_order
      SET status = ?
      WHERE id = UUID_TO_BIN(?)
    `;
    await connection.query(sql, [status, orderId]);
    
  }
}
