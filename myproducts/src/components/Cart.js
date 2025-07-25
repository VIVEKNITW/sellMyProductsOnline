import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Cart.css';

// API endpoints
const API = {
  CART: 'http://localhost:8080/api/cart'
};

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  // Handle unauthorized access
  const handleUnauthorized = useCallback(() => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    navigate('/login', { state: { from: 'cart' } });
  }, [navigate]);

  // Fetch cart items
  const fetchCartItems = useCallback(async () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) {
      handleUnauthorized();
      return;
    }

    try {
      const response = await fetch(API.CART, {
        headers: {
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 401) {
          handleUnauthorized();
          return;
        }
        throw new Error(`Failed to fetch cart items: ${response.status}`);
      }

      const data = await response.json();
      setCartItems(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      console.error('Cart fetch error:', err);
      setError('Failed to load cart. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [handleUnauthorized]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  // Render loading state
  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your cart...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-button" 
          onClick={fetchCartItems}
          disabled={isLoading}
        >
          Retry
        </button>
      </div>
    );
  }

  // Calculate total
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.product?.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button 
            className="continue-shopping"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="item-image">
                  {item.product?.imageUrl && (
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="product-image"
                    />
                  )}
                </div>
                <div className="item-details">
                  <h4 className="product-name">{item.product?.name || 'Product'}</h4>
                  <p className="product-quantity">Quantity: {item.quantity}</p>
                  <p className="product-price">
                    {formatCurrency((item.product?.price || 0) * (item.quantity || 0))}
                  </p>
                </div>
                <div className="item-actions">
                  <button 
                    className="remove-button"
                    onClick={() => {/* TODO: Implement remove from cart */}}
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className="cart-summary">
            <div className="cart-total">
              <span>Total:</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <button 
              className="checkout-button"
              onClick={() => {/* TODO: Implement checkout */}}
              disabled={isLoading || cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

Cart.propTypes = {
  // Add any props validation if needed
};

export default Cart;
