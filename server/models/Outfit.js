const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  themeId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  moodboardImages: [{
    type: String,
  }],
  votes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'voting', 'completed'],
    default: 'draft',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Outfit', outfitSchema);