import { RequestHandler } from 'express';
import { schemaProduct } from '../utils/validations';

const productValidation: RequestHandler = async (req, res, next) => {
  try {
    await schemaProduct.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default productValidation;
