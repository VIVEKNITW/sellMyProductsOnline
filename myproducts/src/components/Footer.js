import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Fallback icon components
const FaFacebook = () => <span>FB</span>;
const FaTwitter = () => <span>TW</span>;
const FaInstagram = () => <span>IG</span>;
const FaEnvelope = () => <span>✉️</span>;
const FaPhone = () => <span>📞</span>;
const FaMapMarkerAlt = () => <span>📍</span>;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-heading">Sweet Bites Bakery</h3>
          <p className="footer-about">
            Delivering delicious, handcrafted baked goods made with love and the finest ingredients since 2023.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/menu" className="footer-link">Our Menu</Link></li>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
            <li><Link to="/terms" className="footer-link">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <ul className="contact-info">
            <li className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>123 Bakery Street, Sweet City, 560001</span>
            </li>
            <li className="contact-item">
              <FaPhone className="contact-icon" />
              <a href="tel:+911234567890" className="footer-link">+91 12345 67890</a>
            </li>
            <li className="contact-item">
              <FaEnvelope className="contact-icon" />
              <a href="mailto:info@sweetbites.com" className="footer-link">info@sweetbites.com</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Newsletter</h4>
          <p className="newsletter-text">Subscribe to our newsletter for the latest updates and offers.</p>
          <form className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="newsletter-input" 
              required 
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Sweet Bites Bakery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;