import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AddVehiclePage from './pages/AddVehiclePage';
import BookingPage from './pages/BookingPage';
import VehiclesPage from './pages/VehiclesPage';
import VehicleDetailPage from './pages/VehicleDetailPage';
import './styles.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/add-vehicle" element={<AddVehiclePage />} />
            <Route path="/book-vehicle" element={<BookingPage />} />
            <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/" element={<BookingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;