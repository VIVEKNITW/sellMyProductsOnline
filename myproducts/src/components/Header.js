import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const username = localStorage.getItem('username');
    setIsLoggedIn(!!username);
  }, [location.pathname]); // Re-check on route change

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setIsLoggedIn(false);
    navigate('/');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    !isLoggedIn && { path: '/register', label: 'Register' },
    !isLoggedIn ? 
      { path: '/login', label: 'Login' } : 
      { path: '#', label: 'Logout', onClick: handleLogout },
    { path: '/cart', label: 'Cart' },
    isLoggedIn && { path: '/profile', label: 'Profile' }
  ].filter(Boolean);

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <h1 className="logo">Sweet Bites Bakery</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                {link.onClick ? (
                  <button 
                    onClick={link.onClick}
                    className="nav-link"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link 
                    to={link.path} 
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="mobile-nav">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.path} className="mobile-nav-item">
                {link.onClick ? (
                  <button 
                    onClick={link.onClick}
                    className="mobile-nav-link"
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link 
                    to={link.path} 
                    className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

Header.propTypes = {
  // Add any props validation if needed
};

export default Header;