import { Router } from 'express';

import * as OrderController from '../controller/OrderController';
import * as UserMiddleware from '../middleware/UserMiddleware';
import orderValidation from '../middleware/OrderMiddleware';

const router = Router();

router.post(
  '/',
  UserMiddleware.authenticateUser,
  orderValidation,
  OrderController.createUser,
);

router.delete(
  '/:id',
  UserMiddleware.authenticateUser,
  OrderController.deleteOrderProduct,
);

export default router;
