import { Router } from 'express';

import userRouter from './UserRouter';
import productRouter from './ProductRouter';
import orderRouter from './OrderRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);

export default router;
