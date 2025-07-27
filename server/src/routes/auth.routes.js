import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { protect } from '../utils/jwt.js';
const router = Router();

router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('email').isEmail(),
    body('role').isIn(['buyer', 'vendor']),
    body('password').isLength({ min: 6 })
  ],
  register
);
router.post('/login', login);
router.post('/logout', logout);
export default router;
