import React from 'react';
import './Navbar.css'; // Import CSS file for Navbar component

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          Task Manager
        </a>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/com" className="nav-links">
              Task-List
            </a>
          </li>
          <li className="nav-item">
            <a href="/history" className="nav-links">
              History
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
