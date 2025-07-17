import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getVehicle } from '../services/api';
import VehicleDetails from '../components/VehicleDetails';

const VehicleDetailPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await getVehicle(id);
        setVehicle(response.data.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch vehicle details');
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id]);

  if (loading) return <div>Loading vehicle details...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="page-container">
      <VehicleDetails vehicle={vehicle} />
    </div>
  );
};

export default VehicleDetailPage;