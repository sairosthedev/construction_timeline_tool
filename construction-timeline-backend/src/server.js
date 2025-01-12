// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const predictRoutes = require('./routes/predictRoutes');

// Initialize the app
const app = express();

// Set the port, fallback to 5001 if not defined in environment variables
const PORT = process.env.PORT || 5001;

// MongoDB connection string from environment variables
const mongoURI = process.env.MONGODB_URI;

// Check if the MONGODB_URI is defined and log it for debugging
if (!mongoURI) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1);  // Exit the app if the Mongo URI is missing
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/predict', predictRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to MongoDB using mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);  // Exit the app if MongoDB connection fails
  });

// Add a basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
