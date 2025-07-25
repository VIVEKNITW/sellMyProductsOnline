import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

// API endpoints
const API = {
  PRODUCTS: 'http://localhost:8080/api/products',
  LOGIN: 'http://localhost:8080/api/auth/login'
};

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Form validation rules
  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    return true;
  };
  
  // Handle successful login
  const handleLoginSuccess = (username) => {
    // Note: In a production app, consider using HTTP-only cookies instead of localStorage
    localStorage.setItem('username', username);
    navigate('/cart');
  };
  
  // Handle API errors
  const handleApiError = (error) => {
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      return 'Unable to connect to the server. Please check your connection and try again.';
    }
    return error.message || 'An unexpected error occurred. Please try again.';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    const { username, password } = formData;
    const authHeader = `Basic ${btoa(`${username}:${password}`)}`;
    
    try {
      // Test server connection
      const testResponse = await fetch(API.PRODUCTS, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        credentials: 'same-origin'
      });
      
      if (!testResponse.ok) {
        const errorText = await testResponse.text();
        throw new Error(`Server returned status ${testResponse.status}: ${errorText}`);
      }
      
      // Attempt login
      const loginResponse = await fetch(API.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': authHeader
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
        mode: 'cors'
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        if (loginData.success) {
          handleLoginSuccess(username);
          return;
        }
        throw new Error(loginData.message || 'Invalid username or password');
      }
      
      const errorData = await loginResponse.json().catch(() => ({}));
      throw new Error(errorData.message || `Login failed with status ${loginResponse.status}`);
      
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to your account</p>
        
        {error && (
          <div className="error-message">
            <span>❌</span> {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
              disabled={isLoading}
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
              <button 
                type="button" 
                className="show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="button-loader">Logging in...</span>
            ) : (
              'Log In'
            )}
          </button>
          
          <div className="register-link">
            Don't have an account?{' '}
            <Link to="/register" className="link">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
