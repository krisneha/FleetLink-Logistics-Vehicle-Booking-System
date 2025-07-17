const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

// Route files
const vehicles = require('./routes/vehicleRoutes');
const bookings = require('./routes/bookingRoutes');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/vehicles', vehicles);
app.use('/api/bookings', bookings);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Server Error' });
});

module.exports = app;