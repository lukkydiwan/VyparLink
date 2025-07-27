// server/src/controllers/vendor.controller.js
import Product from '../models/product.model.js';
import Order from '../models/order.model.js';

/* ─── PRODUCTS ───────────────────────────────────────────── */

export const getMyProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ vendor: req.user.id }).sort('-createdAt');
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const createMyProduct = async (req, res, next) => {
  try {
    const data = { ...req.body, vendor: req.user.id };
    if (req.files?.length) {
      data.images = req.files.map((f) => ({
        url: `/uploads/${f.filename}`,
      }));
    }
    const prod = await Product.create(data);
    res.status(201).json(prod);
  } catch (err) {
    next(err);
  }
};

export const updateMyProduct = async (req, res, next) => {
  try {
    const prod = await Product.findOneAndUpdate(
      { _id: req.params.id, vendor: req.user.id },
      req.body,
      { new: true }
    );
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    res.json(prod);
  } catch (err) {
    next(err);
  }
};

export const deleteMyProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: req.user.id,
    });
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Removed' });
  } catch (err) {
    next(err);
  }
};

/* ─── ORDERS ─────────────────────────────────────────────── */

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ 'items.product.vendor': req.user.id })
      .populate('buyer', 'name email')
      .sort('-createdAt');
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      'items.product.vendor': req.user.id,
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status || order.status; // SHIPPED / DELIVERED
    await order.save();
    res.json(order);
  } catch (err) {
    next(err);
  }
};
