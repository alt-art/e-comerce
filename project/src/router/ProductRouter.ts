import { Router } from 'express';

import * as ProductController from '../controller/ProductController';
import productValidation from '../middleware/ProductMiddleware';
import * as UserMiddleware from '../middleware/UserMiddleware';

const router = Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);
router.post(
  '/',
  UserMiddleware.authenticateUser,
  productValidation,
  ProductController.createProduct,
);
router.put(
  '/:id',
  UserMiddleware.authenticateUser,
  productValidation,
  ProductController.updateProduct,
);
router.delete(
  '/:id',
  UserMiddleware.authenticateUser,
  ProductController.deleteProduct,
);

export default router;
