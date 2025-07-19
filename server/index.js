const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Check if we should use mock data
const useMockData = process.env.USE_MOCK_DATA === 'true';

// Skip MongoDB connection if using mock data
let dbConnected = false;
if (!useMockData) {
  console.log('Attempting to connect to MongoDB...');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB if not using mock data
if (!useMockData) {
  mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lifecare')
  .then(() => {
    console.log('MongoDB Connected');
    dbConnected = true;
  })
  .catch(err => {
    console.log('MongoDB Connection Error:', err);
    console.log('Falling back to mock data');
  });
} else {
  console.log('Using mock data (MongoDB connection skipped)');
}

// Routes
if (process.env.USE_MOCK_DATA === 'true') {
  console.log('Using mock data routes (from env setting)');
  app.use('/api', require('./routes/mockRoutes'));
} else {
  // Set a timeout to check if MongoDB connected
  setTimeout(() => {
    if (dbConnected) {
      console.log('Using MongoDB routes');
      app.use('/api/appointments', require('./routes/appointmentRoutes'));
      app.use('/api/counsellors', require('./routes/counsellorRoutes'));
    } else {
      console.log('MongoDB connection failed, using mock data routes');
      app.use('/api', require('./routes/mockRoutes'));
    }
  }, 1000); // Give MongoDB 1 second to connect
}

// Root route
app.get('/', (req, res) => {
  res.send('S S Psychologist Life Care API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
