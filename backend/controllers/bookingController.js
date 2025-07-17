const Booking = require('../models/Booking');
const Vehicle = require('../models/Vehicle');
const { calculateRideDuration } = require('../utils/rideDuration');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate('vehicle');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res, next) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    // Check if vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        message: `Vehicle not found with id of ${vehicleId}` 
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

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      vehicle: vehicleId,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: parsedStartTime } }
      ]
    });

    if (overlappingBooking) {
      return res.status(409).json({ 
        success: false, 
        message: 'Vehicle is already booked for the requested time slot' 
      });
    }

    // Create booking
    const booking = await Booking.create({
      vehicle: vehicleId,
      fromPincode,
      toPincode,
      startTime: parsedStartTime,
      endTime,
      customerId,
      estimatedRideDurationHours
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Public
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ 
        success: false, 
        message: `Booking not found with id of ${req.params.id}` 
      });
    }

    await booking.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};