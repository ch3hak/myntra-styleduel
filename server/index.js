const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/styleduel', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/themes', require('./routes/themes'));
app.use('/api/products', require('./routes/products'));
app.use('/api/outfits', require('./routes/outfits'));
app.use('/api/votes', require('./routes/votes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});