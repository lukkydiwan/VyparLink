import Product from '../models/product.model.js';
import mongoose from 'mongoose';
export const listProducts = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;
    const query = q ? { title: new RegExp(q, 'i') } : {};
    const [items, total] = await Promise.all([
      Product.find(query)
        .populate('vendor', 'name')
        .skip((page - 1) * limit)
        .limit(limit),
      Product.countDocuments(query),
    ]);
    res.json({ items, total });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const data = { ...req.body, vendor: req.user.id };
    if (req.files?.length) {
      data.images = req.files.map((f) => ({
        url: `/uploads/${f.filename}`,
        thumbUrl: `/uploads/thumb_${f.filename}`,
      }));
    }
    const prod = await Product.create(data);
    res.status(201).json(prod);
  } catch (err) {
    next(err);
  }
};


export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // quick sanity check to avoid CastError
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid product id' });
    }

    const prod = await Product.findById(id)
                              .populate('vendor', 'name email');
    if (!prod) return res.status(404).json({ message: 'Product not found' });

    res.json(prod);
  } catch (err) {
    next(err);
  }
};
