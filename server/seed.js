import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/user.model.js';
import Product from './src/models/product.model.js';
dotenv.config();

await mongoose.connect("mongodb+srv://diwanlukky:aiYNY3PnWiQxsjat@cluster0.ibumzds.mongodb.net/");

await User.deleteMany();
await Product.deleteMany();

const vendor = await User.create({
  name: 'Demo Vendor',
  email: 'vendor@bazaarx.com',
  password: 'password',
  role: 'vendor',
});

const sample = Array.from({ length: 20 }).map((_, idx) => ({
  vendor: vendor._id,
  title: `Sample Product ${idx + 1}`,
  description: 'Lorem ipsum dolor sit amet',
  price: Math.floor(Math.random() * 900) + 100,
  stockQty: 50,
  images: [],
}));

await Product.insertMany(sample);
console.log('Seeded!');
process.exit(0);
