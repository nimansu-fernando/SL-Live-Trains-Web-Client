import React from 'react';
import '../styles/header.css';
import logo from '../assets/Sri_Lanka_Railway_logo.png';

const Header = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-logo">
          <img src={logo} alt="Sri Lanka Live Trains Logo" className="logo-img" />
          Sri Lanka Live Trains
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
