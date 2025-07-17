import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVehicles } from '../services/api';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await getVehicles();
        setVehicles(response.data.data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch vehicles');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  if (loading) return <div>Loading vehicles...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page-container">
      <h1>All Vehicles</h1>
      <div className="vehicle-grid">
        {vehicles.map((vehicle) => (
          <div key={vehicle._id} className="vehicle-card">
            <h3>{vehicle.name}</h3>
            <p>Capacity: {vehicle.capacityKg} kg</p>
            <p>Tyres: {vehicle.tyres}</p>
            <Link to={`/vehicles/${vehicle._id}`} className="details-link">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclesPage;