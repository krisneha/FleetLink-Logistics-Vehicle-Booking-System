const express = require('express');
const { 
  getVehicles,
  getVehicle,
  createVehicle,
  getAvailableVehicles
} = require('../controllers/vehicleController');

const router = express.Router();

router.route('/')
  .get(getVehicles)
  .post(createVehicle);

router.route('/available')
  .get(getAvailableVehicles);

router.route('/:id')
  .get(getVehicle);

module.exports = router;