const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  vehicle: {
    type: mongoose.Schema.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  fromPincode: {
    type: String,
    required: [true, 'Please add the starting pincode'],
    match: [/^\d{6}$/, 'Please add a valid 6-digit pincode']
  },
  toPincode: {
    type: String,
    required: [true, 'Please add the destination pincode'],
    match: [/^\d{6}$/, 'Please add a valid 6-digit pincode']
  },
  startTime: {
    type: Date,
    required: [true, 'Please add the start time']
  },
  endTime: {
    type: Date,
    required: [true, 'Please add the end time']
  },
  customerId: {
    type: String,
    required: [true, 'Please add the customer ID']
  },
  estimatedRideDurationHours: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent double bookings for the same vehicle at the same time
BookingSchema.index({ vehicle: 1, startTime: 1, endTime: 1 }, { unique: true });

module.exports = mongoose.model('Booking', BookingSchema);