const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: { type: String },
  price: { type: Number },
  inStock: { type: Boolean },
  description: { type: String },
  image: { type: String },
  imageArray: { type: [String] }
});

module.exports = model('Product', productSchema);
