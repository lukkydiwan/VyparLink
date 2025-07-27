import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        qty: Number,
        priceAtPurchase: Number,
      },
    ],
    total: Number,
    status: {
      type: String,
      enum: ['PLACED', 'PAID', 'SHIPPED', 'DELIVERED'],
      default: 'PLACED',
    },
    address: {
      line1: String,
      city: String,
      pincode: String,
      phone: String,
    },
    payment: {
      method: { type: String, enum: ['COD', 'UPI'] },
      txnId: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);
