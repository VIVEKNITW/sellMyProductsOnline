import { useEffect, useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (!username || !password) {
      alert('❌ Please login first!');
      return;
    }

    fetch('http://localhost:8080/api/cart', {
      headers: {
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      }
    })
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>{item.product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
