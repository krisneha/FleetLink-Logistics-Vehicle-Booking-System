const request = require('supertest');
const app = require('../app');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

describe('Vehicle API', () => {
  beforeEach(async () => {
    await Vehicle.deleteMany({});
    await Booking.deleteMany({});
  });

  describe('POST /api/vehicles', () => {
    it('should create a new vehicle', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .send({
          name: 'Truck 1',
          capacityKg: 1000,
          tyres: 6
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('name', 'Truck 1');
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/vehicles')
        .send({
          name: 'Truck 1'
        });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/vehicles/available', () => {
    it('should return available vehicles', async () => {
      // Create a vehicle
      const vehicle = await Vehicle.create({
        name: 'Available Truck',
        capacityKg: 2000,
        tyres: 6
      });

      const res = await request(app)
        .get('/api/vehicles/available')
        .query({
          capacityRequired: 1000,
          fromPincode: '100001',
          toPincode: '110001',
          startTime: '2023-12-01T10:00:00Z'
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toBe('Available Truck');
      expect(res.body.data[0]).toHaveProperty('estimatedRideDurationHours');
    });

    it('should not return vehicles with overlapping bookings', async () => {
      // Create a vehicle
      const vehicle = await Vehicle.create({
        name: 'Booked Truck',
        capacityKg: 2000,
        tyres: 6
      });

      // Create a booking that overlaps with our search
      await Booking.create({
        vehicle: vehicle._id,
        fromPincode: '100001',
        toPincode: '110001',
        startTime: '2023-12-01T10:00:00Z',
        endTime: '2023-12-01T14:00:00Z',
        customerId: 'cust123',
        estimatedRideDurationHours: 4
      });

      const res = await request(app)
        .get('/api/vehicles/available')
        .query({
          capacityRequired: 1000,
          fromPincode: '100001',
          toPincode: '110001',
          startTime: '2023-12-01T12:00:00Z' // Overlaps with existing booking
        });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(0);
    });
  });
});