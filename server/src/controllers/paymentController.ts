
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

import { OrderModel } from "../models/mysql/orderModel.js";
import { PaymentModel } from "../models/mysql/paymentModel.js";
import { pool } from '../config/database.js';

import type { Request, Response } from "express";
import type { OrderFromDB, OrderStatus, PaymentStatus } from "../types/index.js";

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });
const preference = new Preference(client);
const payment = new Payment(client);

export class PaymentController {
    static async createPaymentIntent(req: Request, res: Response): Promise<void> {
        const { orderId } = req.body;

        const products = await OrderModel.getAllByOrderId({ order_id: orderId });
        
        if (!products || products.length === 0 ) {
            res.status(404).json({ error: 'Orden no encontrada' });
            return;
        }
        
        const result = await preference.create({
            body: {
                items: products.map((item: OrderFromDB) => ({
                    id: item.product_id,
                    title: item.name,
                    quantity: item.quantity,
                    unit_price: Number(item.price)
                })),
                external_reference: products[0]!.order_id
            }
        });
        
        res.json(result.init_point);
    }

    static async handleWebhook(req: Request, res: Response): Promise<void> {
        const type = req.body?.type || req.query?.type; 
        const dataId = req.body?.data?.id;

        if (type !== 'payment' || !dataId) {
            res.status(200).send('Ignored');
            return;
        }

        res.status(200).send('OK');

        PaymentController.processPayment(dataId).catch(error => {
            console.error(`[CRÍTICO] Fallo al procesar el pago asíncrono ${dataId}:`, error);
        });
    }

    private static async processPayment(paymentId: string): Promise<void> {
        try {
            const result = await payment.get({ id: paymentId });
            
            if (!result.external_reference || !result.status || !result.transaction_amount || !result.id) {
                throw new Error('Faltan datos críticos en la respuesta del SDK de Mercado Pago');
            }

            const orderId = result.external_reference;
            const statusMP = result.status;
            
            let statusDB: PaymentStatus;
            let orderStatusDB: OrderStatus;

            if (statusMP === 'approved') {
                statusDB = 'APPROVED';
                orderStatusDB = 'PAID';
            } else if (statusMP === 'rejected' || statusMP === 'cancelled') {
                statusDB = 'REJECTED';
                orderStatusDB = 'CANCELLED';
            } else {
                statusDB = 'IN_PROGRESS';
                orderStatusDB = 'PENDING';
            }

            const connection = await pool.getConnection(); 
            
            try {
                await connection.beginTransaction(); 
                
                await PaymentModel.createPayment(connection, { 
                    orderId: orderId, 
                    provider: 'mercadopago', 
                    provider_payment_id: result.id.toString(), 
                    amount: result.transaction_amount,
                    status: statusDB
                });

                await OrderModel.updateStatus(connection, { 
                    orderId: orderId, 
                    status: orderStatusDB 
                });

                await connection.commit(); 
            } catch (error) {
                await connection.rollback(); 
                throw error;
            } finally {
                connection.release(); 
            }
            
            console.log(`[EXITO] Pago ${paymentId} procesado. Orden ${orderId} actualizada a ${orderStatusDB}.`);

        } catch (error) {
            console.error(`[ERROR] Fallo al procesar el pago ${paymentId}:`, error);
            throw error; 
        }
    }
}