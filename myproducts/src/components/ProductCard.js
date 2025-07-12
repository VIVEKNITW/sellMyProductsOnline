import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <div className="product-description">
        {product.description}
      </div>
    </div>
  );
}

export default ProductCard;
