import { Router } from 'express';

import * as ProductController from '../controller/ProductController';
import * as UserMiddleware from '../middleware/UserMiddleware';

const router = Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
router.post(
  '/',
  UserMiddleware.authenticateUser,
  ProductController.createProduct,
);
router.put(
  '/:id',
  UserMiddleware.authenticateUser,
  ProductController.updateProduct,
);

export default router;
