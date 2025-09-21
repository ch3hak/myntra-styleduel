const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['clothing', 'shoes', 'accessories', 'addons'],
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  colors: [{
    type: String,
  }],
  sizes: [{
    type: String,
  }],
  tags: [{
    type: String,
  }],
  themes: [{
    type: String,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', productSchema);