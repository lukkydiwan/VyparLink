// routes/order.routes.js
import { Router } from 'express';
import { protect } from '../utils/jwt.js';
import { createOrder } from '../controllers/order.controller.js';

const router = Router();

router.post('/', protect(['buyer']), createOrder);

export default router;
