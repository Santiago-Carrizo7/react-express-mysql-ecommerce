import { Router } from 'express';
import { OrderController } from '../controllers/orderController.js';
import { authMiddleware } from '../middlewares/session.js';

export const orderRouter = Router();

orderRouter.post('/', authMiddleware, OrderController.create)
orderRouter.get('/', authMiddleware, OrderController.getAllByUser)