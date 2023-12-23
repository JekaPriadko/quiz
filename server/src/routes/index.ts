import express from 'express';

import userRoutes from './content.routes';
import authRoutes from './auth.routes';

const router = express.Router();

router.use('/content', userRoutes);
router.use('/auth', authRoutes);

export default router;
