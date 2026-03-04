import { randomUUID } from "crypto";
import type { PaymentFromDB } from "../../types/index.js";
import type { PoolConnection } from "mysql2/promise";
import { pool } from "../../config/database.js";

export class PaymentModel {
    static async createPayment(
        connection: PoolConnection, 
        {orderId, provider, provider_payment_id, amount, status}: {orderId: string, provider: string, provider_payment_id: string, amount: number, status: 'REJECTED' | 'APPROVED' | 'IN_PROGRESS'}
    ): Promise<boolean> {
        const newPaymentId = randomUUID();
        const sql = `
            INSERT INTO payment (id, order_id, provider, provider_payment_id, amount, status)
            VALUES (UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?, ?, ?)
        `;

        await connection.query(sql, [newPaymentId, orderId, provider, provider_payment_id, amount, status]);
        return true;
    }

    static async updatePaymentStatus(
        {orderId, status}: {orderId: string, status: 'REJECTED' | 'APPROVED' | 'IN_PROGRESS'}
    ): Promise<void> {
        const sql = `
            UPDATE payment
            SET status = ?
            WHERE order_id = UUID_TO_BIN(?)
        `;
        try {
            await pool.query(sql, [status, orderId]);
        } catch (error) {
            console.error('Error updating payment status:', error);
            throw new Error('Error updating payment status');
        }
    }

    static async getPaymentStatus({orderId}: {orderId: string}): Promise<'REJECTED' | 'APPROVED' | 'IN_PROGRESS'> {
        const sql = `
            SELECT status FROM payment
            WHERE order_id = UUID_TO_BIN(?)
        `;
        try {
            const [rows] = await pool.query(sql, [orderId]) as [PaymentFromDB[], unknown];
            if (!rows || rows.length === 0) {
                throw new Error('No se encontró el pago para la orden especificada');
            }
            if(rows[0]){
                return rows[0].status;
            }
            throw new Error('No se encontró el pago para la orden especificada');
        } catch (error) {
            console.error('Error getting payment status:', error);
            throw new Error('Error getting payment status');
        }
    }

}
