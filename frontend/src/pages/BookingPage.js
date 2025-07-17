import React, { useState } from 'react';
import BookingForm from '../components/BookingForm';
import VehicleList from '../components/VehicleList';
import { getAvailableVehicles } from '../services/api';

const BookingPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    setSearchParams(formData);
    
    try {
      // Convert date to ISO string for API
      const params = {
        ...formData,
        startTime: formData.startTime.toISOString()
      };
      
      const response = await getAvailableVehicles(params);
      console.log(response);
      setVehicles(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to search vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSuccess = (message) => {
    setSuccess(message);
    setVehicles([]); // Clear the list to force a new search
  };

  return (
    <div className="page-container">
      <h1>Book a Vehicle</h1>
      {success && <div className="success-message">{success}</div>}
      <BookingForm onSubmit={handleSearch} loading={loading} />
      {error && <div className="error-message">{error}</div>}
      {searchParams && (
        <VehicleList 
          vehicles={vehicles} 
          searchParams={searchParams}
          onBookingSuccess={handleBookingSuccess}
          onBookingError={setError}
        />
      )}
    </div>
  );
};

export default BookingPage;