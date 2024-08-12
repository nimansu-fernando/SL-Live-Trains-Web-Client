import React from 'react';
import '../styles/footer.css';
import SlEmblem from '../assets/EmblemSL.png';
import RailwayLogo from '../assets/Sri_Lanka_Railway_logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-top">
            <p>© 2022 Sri Lanka Railways (SLR). All rights Reserved Sri Lanka Railways</p>
            <div className="footer-logos">
              <img src={SlEmblem} alt="SL Emblem" className="footer-logo" />
              <div className="separator"></div>
              <img src={RailwayLogo} alt="SLR Logo" className="footer-logo" />
            </div>
          </div>
          <address>
            Sri Lanka Railways<br />
            Sri Lanka Railways Headquarters,<br />
            Colombo 10, Sri Lanka<br />
            Telephone: +94 11 4 600 111
          </address>
        <div className="footer-links">
          <a href="#faq">FAQ</a>
          <a href="#about-us">About us</a>
          <a href="#privacy-policy">Privacy policy</a>
          <a href="#train-timetable">Train timetable</a>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
