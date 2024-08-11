import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p>© 2022 Sri Lanka Railways (SLR). All rights Reserved Sri Lanka Railways</p>
          <address>
            Sri Lanka Railways<br />
            Sri Lanka Railways Headquarters,<br />
            Colombo 10, Sri Lanka<br />
            Telephones: +94 11 4 600 111
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
