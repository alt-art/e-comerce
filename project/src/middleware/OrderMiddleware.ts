import { RequestHandler } from 'express';
import { schemaOrder } from '../utils/validations';

const orderValidation: RequestHandler = async (req, res, next) => {
  try {
    await schemaOrder.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default orderValidation;
