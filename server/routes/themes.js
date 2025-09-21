const express = require('express');
const Theme = require('../models/Theme');
const router = express.Router();

// Get all themes
router.get('/', async (req, res) => {
  try {
    const themes = await Theme.find({ status: 'active' });
    res.json(themes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get theme by ID
router.get('/:id', async (req, res) => {
  try {
    const theme = await Theme.findOne({ id: req.params.id });
    if (!theme) {
      return res.status(404).json({ message: 'Theme not found' });
    }
    res.json(theme);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create theme (admin only)
router.post('/', async (req, res) => {
  try {
    const theme = new Theme(req.body);
    await theme.save();
    res.status(201).json(theme);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;