const request = require('supertest');
const app = require('../app');
const Vehicle = require('../models/Vehicle');
const Booking = require('../models/Booking');

describe('Booking API', () => {
  let vehicle;

  beforeEach(async () => {
    await Vehicle.deleteMany({});
    await Booking.deleteMany({});
    
    // Create a test vehicle
    vehicle = await Vehicle.create({
      name: 'Test Truck',
      capacityKg: 2000,
      tyres: 6
    });
  });

  describe('POST /api/bookings', () => {
    it('should create a new booking', async () => {
      const res = await request(app)
        .post('/api/bookings')
        .send({
          vehicleId: vehicle._id,
          fromPincode: '100001',
          toPincode: '110001',
          startTime: '2023-12-01T10:00:00Z',
          customerId: 'cust123'
        });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('vehicle', vehicle._id.toString());
    });

    it('should return 409 if vehicle is already booked', async () => {
      // Create first booking
      await request(app)
        .post('/api/bookings')
        .send({
          vehicleId: vehicle._id,
          fromPincode: '100001',
          toPincode: '110001',
          startTime: '2023-12-01T10:00:00Z',
          customerId: 'cust123'
        });

      // Try to create overlapping booking
      const res = await request(app)
        .post('/api/bookings')
        .send({
          vehicleId: vehicle._id,
          fromPincode: '100001',
          toPincode: '110001',
          startTime: '2023-12-01T12:00:00Z', // Overlaps with first booking
          customerId: 'cust456'
        });
      
      expect(res.statusCode).toEqual(409);
      expect(res.body.success).toBe(false);
    });

    it('should return 404 if vehicle does not exist', async () => {
      const res = await request(app)
        .post('/api/bookings')
        .send({
          vehicleId: '5f8d0d55b54764421b7156da', // Non-existent ID
          fromPincode: '100001',
          toPincode: '110001',
          startTime: '2023-12-01T10:00:00Z',
          customerId: 'cust123'
        });
      
      expect(res.statusCode).toEqual(404);
      expect(res.body.success).toBe(false);
    });
  });

  describe('DELETE /api/bookings/:id', () => {
    it('should delete a booking', async () => {
      // Create a booking first
      const booking = await Booking.create({
        vehicle: vehicle._id,
        fromPincode: '100001',
        toPincode: '110001',
        startTime: '2023-12-01T10:00:00Z',
        endTime: '2023-12-01T14:00:00Z',
        customerId: 'cust123',
        estimatedRideDurationHours: 4
      });

      const res = await request(app)
        .delete(`/api/bookings/${booking._id}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.success).toBe(true);

      // Verify booking is deleted
      const deletedBooking = await Booking.findById(booking._id);
      expect(deletedBooking).toBeNull();
    });
  });
});