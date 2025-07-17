const Vehicle = require('../models/Vehicle');
const { calculateRideDuration } = require('../utils/rideDuration');

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public
exports.getVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json({ success: true, count: vehicles.length, data: vehicles });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single vehicle
// @route   GET /api/vehicles/:id
// @access  Public
exports.getVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ success: false, message: 'Vehicle not found' });
    }

    res.status(200).json({ success: true, data: vehicle });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create new vehicle
// @route   POST /api/vehicles
// @access  Public
exports.createVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(201).json({ success: true, data: vehicle });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get available vehicles
// @route   GET /api/vehicles/available
// @access  Public
exports.getAvailableVehicles = async (req, res, next) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    // Validate required parameters
    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide capacityRequired, fromPincode, toPincode, and startTime' 
      });
    }

    const parsedStartTime = new Date(startTime);
    if (isNaN(parsedStartTime.getTime())) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid startTime format. Please use ISO format (e.g., 2023-10-27T10:00:00Z)' 
      });
    }

    const estimatedRideDurationHours = calculateRideDuration(fromPincode, toPincode);
    const endTime = new Date(parsedStartTime.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

    // Step 1: Find vehicles with sufficient capacity
    const capacityFilter = { capacityKg: { $gte: parseInt(capacityRequired) } };
    const vehicles = await Vehicle.find(capacityFilter);

    // Step 2: Filter out vehicles with overlapping bookings
    const availableVehicles = [];
    const Booking = require('../models/Booking');

    for (const vehicle of vehicles) {
      const overlappingBooking = await Booking.findOne({
        vehicle: vehicle._id,
        $or: [
          { startTime: { $lt: endTime }, endTime: { $gt: parsedStartTime } }
        ]
      });

      if (!overlappingBooking) {
        availableVehicles.push({
          ...vehicle.toObject(),
          estimatedRideDurationHours
        });
      }
    }

    res.status(200).json({ success: true, data: availableVehicles });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};