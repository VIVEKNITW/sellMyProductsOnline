import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import ProductGrid from './components/ProductGrid.js';
import Register from './components/Register';
import Login from './components/Login';
import Cart from './components/Cart';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
        <div className="container">
        <Header />
        <main className="main-content">
            <Routes>
                <Route path="/" element={<ProductGrid />} />
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
