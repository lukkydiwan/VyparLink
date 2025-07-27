import { Router } from 'express';
import {
  listProducts,
  createProduct,
  getProduct,
} from '../controllers/product.controller.js';
import { protect } from '../utils/jwt.js';
import upload from '../middlewares/upload.js';

const router = Router();

router.get('/', listProducts);
router.post('/', protect(['vendor']), upload.array('images', 5), createProduct);
router.get('/:id', getProduct);
export default router;
