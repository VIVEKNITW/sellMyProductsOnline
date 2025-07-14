import './App.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import ProductGrid from './components/ProductGrid.js';

function App() {
  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
}


export default App;
