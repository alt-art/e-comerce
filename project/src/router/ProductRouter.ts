import { Router } from 'express';

import * as ProductController from '../controller/ProductController';

const router = Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);

export default router;
