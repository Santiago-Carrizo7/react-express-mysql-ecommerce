import { OrderModel } from "../models/mysql/orderModel.js";
import { validateOrder } from "../schemas/orderSchema.js";

import type { Request, Response } from "express";
import type { Order } from "../schemas/orderSchema.js";
import type { OrderFromInput } from "../types/index.js";

export class OrderController {
    static async create (req: Request, res: Response): Promise<Response> {
        const { id: userId } = req.session.user;
        const result = validateOrder(req.body);

        if(!result.success){
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const orderId = await OrderModel.create({ input: { user_id: userId, ...result.data } });
        return res.status(201).json({ message: `Su orden se realizo correctamente. Su numero de orden es ${orderId}` })
    }

    static async getAllByUser (req: Request, res: Response): Promise<Response> {
        const { id: userId } = req.session.user;

        const orders = await OrderModel.getAllByUser({ user_id: userId });

        if (!orders || orders.length === 0){
            return res.status(200).json([]);
        }

        return res.status(200).json(orders);
    }
}