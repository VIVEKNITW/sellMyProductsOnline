import { useState } from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState('');

  const handleAddToCart = async () => {
    // Check if user is logged in
    const username = localStorage.getItem('username');
    const authToken = localStorage.getItem('authToken');

    console.log('Auth check - Username:', username);
    console.log('Auth check - Auth token exists:', !!authToken);

    if (!username || !authToken) {
      alert('Please login first to add items to cart');
      window.location.href = '/login';
      return;
    }

    setIsAdding(true);
    setError('');

    try {
      console.log('Attempting to add product to cart:', product.id);
      
      // Verify the token is still valid
      const verifyResponse = await fetch('http://localhost:8080/api/auth/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });

      if (!verifyResponse.ok) {
        console.error('Session verification failed:', await verifyResponse.text());
        // Clear auth data and redirect to login
        localStorage.removeItem('username');
        localStorage.removeItem('authToken');
        alert('Your session has expired. Please log in again.');
        window.location.href = '/login';
        return;
      }

      // If verification is successful, add to cart
      const response = await fetch('http://localhost:8080/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${authToken}`
        },
        body: new URLSearchParams({
          productId: product.id,
          quantity: 1 // Default quantity to 1 for now
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add item to cart');
      }

      const data = await response.json();
      
      // Notify parent component if needed
      if (onAddToCart) {
        onAddToCart(data);
      }
      
      // Show success message
      alert('Item added to cart!');
    } catch (err) {
      console.error('Add to cart error:', err);
      setError(err.message || 'Failed to add item to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="product-card">
      <img
        src={`http://localhost:8080${product.imageUrl}`}
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">₹ {product.price}</p>
      <div className="product-description">
        {product.description}
      </div>
      <button 
        className="add-to-cart-btn" 
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default ProductCard;
