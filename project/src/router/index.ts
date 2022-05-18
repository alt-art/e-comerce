import { Router } from 'express';

import userRouter from './UserRouter';
import productRouter from './ProductRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/product', productRouter);

export default router;
