const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  points: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    default: 'Style Novice',
  },
  outfitsCreated: {
    type: Number,
    default: 0,
  },
  votesGiven: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);