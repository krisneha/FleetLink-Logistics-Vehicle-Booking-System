import React, { useState } from 'react';

const AddVehicleForm = ({ onSubmit, loading, error, success }) => {
  const [formData, setFormData] = useState({
    name: '',
    capacityKg: '',
    tyres: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>Add New Vehicle</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Capacity (kg):</label>
          <input
            type="number"
            name="capacityKg"
            value={formData.capacityKg}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Number of Tyres:</label>
          <input
            type="number"
            name="tyres"
            value={formData.tyres}
            onChange={handleChange}
            min="2"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Vehicle'}
        </button>
      </form>
    </div>
  );
};

export default AddVehicleForm;