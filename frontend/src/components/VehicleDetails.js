import React from 'react';
import { Link } from 'react-router-dom';

const VehicleDetails = ({ vehicle }) => {
  if (!vehicle) {
    return <div>Loading vehicle details...</div>;
  }

  return (
    <div className="vehicle-details">
      <h2>{vehicle.name}</h2>
      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Capacity:</span>
          <span className="detail-value">{vehicle.capacityKg} kg</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Tyres:</span>
          <span className="detail-value">{vehicle.tyres}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Created At:</span>
          <span className="detail-value">
            {new Date(vehicle.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <Link to="/vehicles" className="back-link">
        ← Back to all vehicles
      </Link>
    </div>
  );
};

export default VehicleDetails;