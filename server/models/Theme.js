const mongoose = require('mongoose');

const themeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rules: [{
    type: String,
  }],
  budget: {
    type: Number,
    required: true,
  },
  requiredColors: [{
    type: String,
  }],
  rewards: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['active', 'upcoming', 'ended'],
    default: 'active',
  },
  entries: {
    type: Number,
    default: 0,
  },
  endDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Theme', themeSchema);