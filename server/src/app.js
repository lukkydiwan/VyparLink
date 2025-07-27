import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middlewares/error.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';
import orderRoutes from './routes/order.routes.js';
import vendorRoutes from './routes/vendor.routes.js';

dotenv.config();

const app = express();

// ── middlewares ─────────────────────────────
app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/uploads', express.static('uploads')); // serve product images

// ── routes ──────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/vendor', vendorRoutes);

// ── error handling ──────────────────────────
app.use(notFound);
app.use(errorHandler);


export default app;
