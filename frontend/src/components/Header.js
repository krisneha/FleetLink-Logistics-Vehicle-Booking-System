import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/vehicles">All Vehicles</Link>
          </li>
          <li>
            <Link to="/add-vehicle">Add Vehicle</Link>
          </li>
          <li>
            <Link to="/book-vehicle">Book Vehicle</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;