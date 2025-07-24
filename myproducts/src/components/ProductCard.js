import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
        <img
            src={`http://localhost:8080${product.imageUrl}`}
            alt={product.name}
            className="product-image"
        />
        <h3 className="product-name">{product.name}</h3>
       <p className="product-price">₹ {product.price}</p>  {/* ✅ Show price */}
        <div className="product-description">
        {product.description}
      </div>
    </div>
  );
}

export default ProductCard;
