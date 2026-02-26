import mysql from "mysql2/promise";
import { randomUUID } from "node:crypto";
import { DEFAULT_CONFIG } from "../../config/config.js";

import type { Order } from "../../schemas/orderSchema.js";
import type { OrderFromDB, OrderFromInput } from "../../types/index.js";

const connection = await mysql.createConnection(DEFAULT_CONFIG);

export class OrderModel {
  static async create({ input }: { input: OrderFromInput & Order }) {
    const { user_id, products } = input;

    try {
      await connection.beginTransaction();

      const newOrderId = randomUUID();

      await connection.query(
        `
                INSERT INTO purchase_order (id, user_id)
                VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?))
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
    }
  }

  static async getAllByUser({ user_id }: { user_id: string }) {
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
      const [orders] = (await connection.query(sql, [user_id])) as [
        OrderFromDB[],
        unknown,
      ];
      if (orders.length == 0) return null;
      return orders;
    } catch (err) {
      console.error("Error al obtener las ordenes del usuario:", err);
      throw new Error("No se pudieron obtener las ordenes del usuario");
    }
  }
}
