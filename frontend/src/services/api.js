import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Vehicles API
export const getVehicles = () => api.get('/vehicles');
export const createVehicle = (vehicleData) => api.post('/vehicles', vehicleData);
export const getAvailableVehicles = (params) => api.get('/vehicles/available', { params });
export const getVehicle = (id) => api.get(`/vehicles/${id}`);

// Bookings API
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getBookings = () => api.get('/bookings');
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);

export default api;