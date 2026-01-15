
import { ProductModel } from '../models/mysql/productModel.js';
import { validateProduct, validatePartialProduct } from '../schemas/productSchema.js';

export class ProductController {
  static async getAll (req, res) {
    const products = await ProductModel.getAll();
    res.json(products);
  }

  static async create (req, res) {
    const result = validateProduct(req.body);

    if (!result.success) {
      return res
        .status(400)
        .json({ error: JSON.parse(result.error.message) });
    }

    const newProduct = await ProductModel.create({ input: result.data });
    res.status(201).json(newProduct);
  }

  static async update (req, res) {
    const result = validatePartialProduct(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;
    const updatedProduct = await ProductModel.update({ id, input: result.data });

    if (updatedProduct === false) {
      return res.status(400).json({ error: 'Id de producto no encontrado' });
    }

    return res.json(updatedProduct);
  }

  static async delete (req, res) {
    const { id } = req.params;
    const productIndex = ProductModel.delete({ id });

    if (!productIndex) {
      return res.status(400).json({ error: 'Id de producto no encontrado' });
    }

    res.status(200).json({ message: 'se elimino correctamente' });
  }
}
