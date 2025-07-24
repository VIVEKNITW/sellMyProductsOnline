import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>Sweet Bites Bakery</h1>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/register">Register</Link> |{' '}
        <Link to="/login">Login</Link> |{' '}
        <Link to="/cart">Cart</Link>
      </nav>
    </header>
  );
}

export default Header;