import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    capacityRequired: '',
    fromPincode: '',
    toPincode: '',
    startTime: new Date()
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      startTime: date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>Search Available Vehicles</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Capacity Required (kg):</label>
          <input
            type="number"
            name="capacityRequired"
            value={formData.capacityRequired}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="form-group">
          <label>From Pincode:</label>
          <input
            type="text"
            name="fromPincode"
            value={formData.fromPincode}
            onChange={handleChange}
            pattern="\d{6}"
            title="6-digit pincode"
            required
          />
        </div>
        <div className="form-group">
          <label>To Pincode:</label>
          <input
            type="text"
            name="toPincode"
            value={formData.toPincode}
            onChange={handleChange}
            pattern="\d{6}"
            title="6-digit pincode"
            required
          />
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <DatePicker
            selected={formData.startTime}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy h:mm aa"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search Availability'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;