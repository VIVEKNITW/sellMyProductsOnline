import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.css';

// Fallback icon components
const FaUser = () => <span>👤</span>;
const FaShoppingCart = () => <span>🛒</span>;
const FaSignOutAlt = () => <span>🚪</span>;
const FaBars = () => <span>☰</span>;
const FaTimes = () => <span>✕</span>;
const FaChevronDown = ({ className }) => <span className={className}>▼</span>;

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Verify authentication with server
  const verifyAuth = useCallback(async () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    
    if (!username || !password) {
      setIsLoggedIn(false);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/verify', {
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa(`${username}:${password}`)
        },
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
        setIsLoggedIn(true);
      } else {
        clearAuthData();
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      clearAuthData();
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear authentication data
  const clearAuthData = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    setUserData(null);
    setIsLoggedIn(false);
  }, []);

  // Handle storage changes across tabs
  const handleStorageChange = useCallback(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    setIsLoggedIn(!!(username && password));
    if (!username || !password) {
      setUserData(null);
    } else if (!isLoggedIn) {
      verifyAuth();
    }
  }, [isLoggedIn, verifyAuth]);

  // Initial setup
  useEffect(() => {
    verifyAuth();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [verifyAuth, handleStorageChange]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    clearAuthData();
    window.dispatchEvent(new Event('storage'));
    navigate('/');
  };

  const toggleMenu = () => {
    console.log('Toggle menu clicked, current state:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false);
  };

  // Handle navigation click
  const handleNavClick = (e) => {
    e.preventDefault();
    const path = e.currentTarget.getAttribute('href');
    console.log('Navigation clicked:', path);
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // Navigate programmatically
    navigate(path);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  if (isLoading) {
    return <div className="navbar-loading">Loading...</div>;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          Sweet Bites
        </Link>

        {/* Mobile menu button */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Navigation */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={handleNavClick}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link" onClick={handleNavClick}>
              Menu
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link" onClick={handleNavClick}>
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link" onClick={handleNavClick}>
              Contact
            </Link>
          </li>
        </ul>

        {/* User Actions */}
        <div className="nav-actions">
          <Link to="/cart" className="cart-icon" aria-label="Shopping Cart">
            <FaShoppingCart />
            <span className="cart-count">0</span>
          </Link>
          
          <div className="auth-section">
            {isLoggedIn ? (
              <div className="profile-dropdown" ref={profileRef}>
                <button className="profile-button" onClick={toggleProfile} aria-expanded={isProfileOpen}>
                  <FaUser className="profile-icon" />
                  <span className="profile-name">
                    {userData?.name || 'Account'}
                  </span>
                  <FaChevronDown className={`dropdown-arrow ${isProfileOpen ? 'rotate' : ''}`} />
                </button>
                
                {isProfileOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                      <FaUser /> My Profile
                    </Link>
                    <Link to="/orders" className="dropdown-item" onClick={() => setIsProfileOpen(false)}>
                      <FaShoppingCart /> My Orders
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="nav-link auth-link">
                  Login
                </Link>
                <span className="auth-divider">|</span>
                <Link to="/register" className="nav-link auth-link register">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  // Add prop types if needed
};

export default Navbar;
