import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer.js';
import ProductGrid from './components/ProductGrid.js';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';

// Create simple placeholder components for the missing pages
const Home = () => <div className="page-container"><h1>Welcome to Sweet Bites Bakery</h1><p>Discover our delicious treats!</p></div>;
const About = () => <div className="page-container"><h1>About Us</h1><p>Learn more about our bakery and our story.</p></div>;
const Contact = () => <div className="page-container"><h1>Contact Us</h1><p>Get in touch with us for any inquiries.</p></div>;

// Component to handle auth verification on app load
function AuthVerifier() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');
      
      if (!username || !password) return;

      try {
        const response = await fetch('http://localhost:8080/api/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`)
          }
        });
        
        if (!response.ok) {
          localStorage.removeItem('username');
          localStorage.removeItem('password');
          window.dispatchEvent(new Event('storage'));
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        window.dispatchEvent(new Event('storage'));
      }
    };

    verifyAuth();
  }, []);

  return null;
}

function App() {
  return (
    <Router>
      <AuthVerifier />
      <div className="container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<ProductGrid />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<ProductGrid />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
