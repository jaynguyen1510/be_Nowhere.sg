const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: Array, required: true },
  size: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  bestSeller: { type: Boolean },
  date: { type: Number, required: true },
});

const Product =
  mongoose.models.product || mongoose.model("product", productSchema);
module.exports = Product;
