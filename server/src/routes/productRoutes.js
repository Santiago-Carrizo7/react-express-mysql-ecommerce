import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';
import { authMiddleware } from '../middlewares/session.js';

export const productsRouter = Router();

productsRouter.get('/', ProductController.getAll);

productsRouter.post('/', authMiddleware, ProductController.create);

productsRouter.patch('/:id', authMiddleware, ProductController.update);

productsRouter.delete('/:id', authMiddleware, ProductController.delete);
