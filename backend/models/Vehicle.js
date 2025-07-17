const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a vehicle name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  capacityKg: {
    type: Number,
    required: [true, 'Please add the capacity in kg'],
    min: [1, 'Capacity must be at least 1 kg']
  },
  tyres: {
    type: Number,
    required: [true, 'Please add the number of tyres'],
    min: [2, 'A vehicle must have at least 2 tyres']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);