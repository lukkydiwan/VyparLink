import Order from '../models/order.model.js';
import Product from '../models/product.model.js';

export const createOrder = async (req, res, next) => {
  try {
    const { items, address, paymentMethod } = req.body;
    // compute totals & validate stock
    let total = 0;
    const lineItems = await Promise.all(
      items.map(async (i) => {
        const prod = await Product.findById(i.productId);
        if (!prod) throw new Error('Product not found');
        if (prod.stockQty < i.qty) throw new Error('Insufficient stock');
        total += prod.price * i.qty;
        return {
          product: prod._id,
          qty: i.qty,
          priceAtPurchase: prod.price,
        };
      })
    );
    const order = await Order.create({
      buyer: req.user.id,
      items: lineItems,
      total,
      address,
      payment: { method: paymentMethod },
    });
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};
