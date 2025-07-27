// server/src/routes/vendor.routes.js
import { Router } from 'express';
import { protect } from '../utils/jwt.js';
import upload from '../middlewares/upload.js';
import {
  getMyProducts,
  createMyProduct,
  updateMyProduct,
  deleteMyProduct,
  getMyOrders,
  updateOrderStatus,
} from '../controllers/vendor.controller.js';

const router = Router();

// prefix: /api/vendor  (mounted in app.js)

// ── product management ─────────────────────────────
router.get('/products', protect(['vendor']), getMyProducts);
router.post(
  '/products',
  protect(['vendor']),
  upload.array('images', 5),
  createMyProduct
);
router.put('/products/:id', protect(['vendor']), updateMyProduct);
router.delete('/products/:id', protect(['vendor']), deleteMyProduct);

// ── order management ───────────────────────────────
router.get('/orders', protect(['vendor']), getMyOrders);
router.put('/orders/:id/status', protect(['vendor']), updateOrderStatus);

export default router;
