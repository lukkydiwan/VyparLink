// models/Product.js
import mongoose from "mongoose";

/* Keep this array in ONE place so the frontend dropdown
   and backend validation always match. */
export const ALLOWED_CATEGORIES = [
  "Spices",
  "Fresh Veggies",
  "Dairy",
  "Packaging",
  "Cleaning",
  // add more as needed
];

const productSchema = new mongoose.Schema(
  {
    vendor: {                       // who listed it
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* MAIN FIELDS --------------------------------------------------------- */
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

    category: {
      type: String,
      required: true,
      enum: ALLOWED_CATEGORIES,     // ✅ prevents typos / casing issues
    },

    price: {
      type: Number,
      required: true,
    },

    stockQty: {
      type: Number,
      default: 0,
    },

    images: [
      {
        url: String,
        thumbUrl: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
