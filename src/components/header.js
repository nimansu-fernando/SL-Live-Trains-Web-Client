import React from 'react';
import '../styles/header.css';
import logo from '../assets/SL-Live-Trains-Logo.png';

const Header = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-logo" onClick={handleRefresh} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="Sri Lanka Live Trains Logo" className="logo-img" />
          <span>Sri Lanka Live Trains</span>
        </div>
        {/*<ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#trains">Trains</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>*/}
      </div>
    </nav>
  );
};

export default Header;
