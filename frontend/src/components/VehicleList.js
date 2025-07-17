import React, { useState } from 'react';
import { createBooking } from '../services/api';

const VehicleList = ({ vehicles, searchParams, onBookingSuccess, onBookingError }) => {
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const handleBookVehicle = async (vehicleId) => {
    setBookingLoading(true);
    setBookingError(null);
    
    try {
      const bookingData = {
        vehicleId,
        fromPincode: searchParams.fromPincode,
        toPincode: searchParams.toPincode,
        startTime: searchParams.startTime.toISOString(),
        customerId: 'cust123' // Hardcoded for simplicity
      };

      await createBooking(bookingData);
      onBookingSuccess(`Vehicle booked successfully!`);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to book vehicle';
      setBookingError(errorMessage);
      onBookingError(errorMessage);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="vehicle-list">
      <h3>Available Vehicles</h3>
      {bookingError && <div className="error-message">{bookingError}</div>}
      
      {vehicles.length === 0 ? (
        <p>No available vehicles found for your criteria.</p>
      ) : (
        <ul>
          {vehicles.map((vehicle) => (
            <li key={vehicle._id} className="vehicle-item">
              <div>
                <strong>{vehicle.name}</strong>
                <p>Capacity: {vehicle.capacityKg} kg</p>
                <p>Tyres: {vehicle.tyres}</p>
                <p>Estimated Ride Duration: {vehicle.estimatedRideDurationHours} hours</p>
              </div>
              <button 
                onClick={() => handleBookVehicle(vehicle._id)}
                disabled={bookingLoading}
              >
                {bookingLoading ? 'Booking...' : 'Book Now'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VehicleList;