import { RequestHandler } from 'express';

import * as ProductService from '../service/ProductService';

export const getProducts: RequestHandler = async (req, res) => {
  try {
    const products = await ProductService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductService.getProductById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
