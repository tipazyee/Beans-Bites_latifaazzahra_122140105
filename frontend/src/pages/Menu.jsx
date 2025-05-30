import React, { useEffect, useState } from 'react';
import { getProducts }   from '../api/productAPI';
import Navbar            from '../components/Navbar';
import Footer            from '../components/Footer';
import { useCart }       from '../context/CartContext.js';
import { useNavigate }   from 'react-router-dom';

export default function Menu() {
  const [products, setProducts]     = useState([]);
  const [notification, setNotification] = useState('');
  const { addToCart }               = useCart();
  const navigate                    = useNavigate();

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(console.error);
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product, 1);
      setNotification(`✅ ${product.name} berhasil ditambahkan ke keranjang!`);
    } catch (err) {
      console.error('Gagal tambah ke cart:', err);
      setNotification(`❌ Gagal menambahkan ${product.name}`);
    }
  
    setTimeout(() => setNotification(''), 3000);
  };

  const coffeeProducts    = products.filter(p => p.category.toLowerCase() === 'coffee');
  const nonCoffeeProducts = products.filter(p => p.category.toLowerCase() === 'non-coffee');
  const dessertProducts   = products.filter(p => p.category.toLowerCase() === 'dessert');

  return (
    <div className="menu-page">
      <Navbar />

      {notification && (
        <div className="notification">{notification}</div>
      )}

      <section id="coffee">
        <h2>Coffee Menu</h2>
        <div className="product-list">
          {coffeeProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>Rp {Number(product.price).toLocaleString('id-ID')}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="non-coffee">
        <h2>Non-Coffee Menu</h2>
        <div className="product-list">
          {nonCoffeeProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>Rp {Number(product.price).toLocaleString('id-ID')}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="dessert">
        <h2>Dessert Menu</h2>
        <div className="product-list">
          {dessertProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>Rp {Number(product.price).toLocaleString('id-ID')}</p>
              <button onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
