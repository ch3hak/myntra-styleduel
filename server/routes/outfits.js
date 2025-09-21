const express = require('express');
const Outfit = require('../models/Outfit');
const router = express.Router();

// Get all outfits
router.get('/', async (req, res) => {
  try {
    const { userId, status } = req.query;
    let query = {};
    
    if (userId) query.userId = userId;
    if (status) query.status = status;
    
    const outfits = await Outfit.find(query)
      .populate('userId', 'name avatar')
      .populate('products')
      .sort({ createdAt: -1 });
    
    res.json(outfits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get outfit by ID
router.get('/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findById(req.params.id)
      .populate('userId', 'name avatar')
      .populate('products');
    
    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    
    res.json(outfit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create outfit
router.post('/', async (req, res) => {
  try {
    const outfit = new Outfit(req.body);
    await outfit.save();
    res.status(201).json(outfit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update outfit
router.put('/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('products');
    
    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    
    res.json(outfit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete outfit
router.delete('/:id', async (req, res) => {
  try {
    const outfit = await Outfit.findByIdAndDelete(req.params.id);
    
    if (!outfit) {
      return res.status(404).json({ message: 'Outfit not found' });
    }
    
    res.json({ message: 'Outfit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;