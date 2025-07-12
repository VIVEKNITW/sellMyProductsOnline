import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';


function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Replace this with real API call
    const mockProducts = [
      {
        id: 1,
        name: "Cake",
        description: "This is tasty and healthy sugar free cake",
        image: "/products/cake.jpg", 
      },
      {
        id: 2,
        name: "Chocolate",
        description: "This is tasty and healthy chocolate bar sugar free and 80% dark chocolate",
        image: "/products/chocolate.jpg",
      },
      {
        id: 3,
        name: "Donut",
        description: "This is tasty and healthy sugar free Donut",
        image: "/products/donut.jpg", 
      },
      {
        id: 4,
        name: "Samosa",
        description: "This is tasty samosa",
        image: "/products/samosa.jpg",
      }
    ]

    setProducts(mockProducts);
  }, []);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
