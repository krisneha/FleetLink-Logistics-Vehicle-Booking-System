import React, { useState } from 'react';
import AddVehicleForm from '../components/AddVehicleForm';
import { createVehicle } from '../services/api';

const AddVehiclePage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (vehicleData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await createVehicle(vehicleData);
      setSuccess('Vehicle added successfully!');
      // Reset form by triggering a re-render with new key
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1>Add New Vehicle to Fleet</h1>
      <AddVehicleForm 
        onSubmit={handleSubmit} 
        loading={loading} 
        error={error}
        success={success}
      />
    </div>
  );
};

export default AddVehiclePage;