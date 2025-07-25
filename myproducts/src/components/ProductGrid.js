import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Error fetching products:', err));
  }, []);

  const handleAddToCart = (cartItem) => {
    setCartUpdated(true);
    // Hide the success message after 3 seconds
    setTimeout(() => setCartUpdated(false), 3000);
  };

  return (
    <div className="product-grid-container">
      <h2>Our Products</h2>
      {cartUpdated && (
        <div className="cart-update-message">
          Item added to cart successfully!
        </div>
      )}
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;
