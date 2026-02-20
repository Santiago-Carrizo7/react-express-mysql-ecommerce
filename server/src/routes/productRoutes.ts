import { Router } from 'express';
import { ProductController } from '../controllers/productController.js';
import { authMiddleware } from '../middlewares/session.js';

export const productsRouter = Router();

productsRouter.get('/', ProductController.getAll);

productsRouter.get('/categories', ProductController.getCategoriesWithCount);

productsRouter.post('/', authMiddleware, ProductController.create);

productsRouter.patch('/:id', authMiddleware, ProductController.update);

productsRouter.delete('/:id', authMiddleware, ProductController.delete);
