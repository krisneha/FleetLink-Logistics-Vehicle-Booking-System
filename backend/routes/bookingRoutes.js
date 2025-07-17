const express = require('express');
const { 
  getBookings,
  createBooking,
  deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

router.route('/')
  .get(getBookings)
  .post(createBooking);

router.route('/:id')
  .delete(deleteBooking);

module.exports = router;