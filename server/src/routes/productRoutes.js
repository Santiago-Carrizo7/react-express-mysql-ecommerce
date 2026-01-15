import { Router } from 'express';

import { ProductController } from '../controllers/productController.js';

export const productsRouter = Router();

productsRouter.get('/', ProductController.getAll);

productsRouter.post('/', ProductController.create);

productsRouter.patch('/:id', ProductController.update);

productsRouter.delete('/:id', ProductController.delete);
