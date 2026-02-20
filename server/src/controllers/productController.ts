
import { ProductModel } from '../models/mysql/productModel.js';
import { validateProduct, validatePartialProduct } from '../schemas/productSchema.js';

import type { Request, Response } from 'express';
import type { GetAllParams } from '../types/index.js';

export class ProductController {
  static async getAll (req: Request, res: Response): Promise<void> {
    const { minPrice, maxPrice, search } = req.query;
    const rawCategories = req.query.categories ?? req.query.category ?? [];
    const categories = Array.isArray(rawCategories)
      ? rawCategories
      : rawCategories
        ? [rawCategories]
        : [];

    const products = await ProductModel.getAll({ categories, minPrice, maxPrice, search } as GetAllParams);
    res.json(products);
  }

  static async getCategoriesWithCount (req: Request, res: Response): Promise<void> {
    const categories = await ProductModel.getCategoriesWithCount();
    res.json(categories);
  }

  static async create (req: Request, res: Response): Promise<Response> {
    const result = validateProduct(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ error: JSON.parse(result.error.message) });
    }

    const newProduct = await ProductModel.create({ input: result.data });
    return res.status(201).json(newProduct);
  }

  static async update (req: Request, res: Response): Promise<Response> {
    const result = validatePartialProduct(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'El ID de producto es inválido o no fue enviado' });
    }

    const updatedProduct = await ProductModel.update({ id, input: result.data });

    if (updatedProduct === false) {
      return res.status(400).json({ error: 'Id de producto no encontrado' });
    }

    return res.json(updatedProduct);
  }

  static async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'El ID de producto es inválido o no fue enviado' });
    }

    const wasDeleted = await ProductModel.delete({ id });

    if (!wasDeleted) {
      return res.status(400).json({ error: 'Id de producto no encontrado' });
    }

    return res.status(200).json({ message: 'se elimino correctamente' });
  }
}
