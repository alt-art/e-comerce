import { RequestHandler } from 'express';

import * as OrderService from '../service/OrderService';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.body, res.locals.user);
    res.status(201).json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteOrderProduct: RequestHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await OrderService.deleteOrderProduct(id, res.locals.user);
    res.status(200).end();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
