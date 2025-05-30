import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.js';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function Cart() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  if (!cart) return <p>Loading...</p>;

  const itemsWithSub = cart.map(item => ({
    ...item,
    subtotal: item.product.price * item.quantity
  }));

  const total = itemsWithSub.reduce((sum, item) => sum + item.subtotal, 0);

  const handleIncrease = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
  };

  const handleDecrease = (id) => {
    const updated = cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updated);
  };

  const handleRemove = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
  };

  return (
    <div className="cart-page">
      <Navbar />
      <h2>Keranjang Anda</h2>

      {itemsWithSub.length === 0 ? (
        <p>Keranjang kosong</p>
      ) : (
        <>
          <ul className="cart-list">
            {itemsWithSub.map(item => (
              <li key={item.id} className="cart-item">
                <div className="item-info">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    width={60}
                    style={{ borderRadius: 4, marginRight: 12 }}
                  />
                  <div>
                    <strong>{item.product.name}</strong><br />
                    Rp {item.product.price.toLocaleString('id-ID')} × {item.quantity} =  
                    <strong> Rp {item.subtotal.toLocaleString('id-ID')}</strong>
                  </div>
                </div>

                <div className="item-controls">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    –
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => handleIncrease(item.id)}>+</button>

                  <button onClick={() => handleRemove(item.id)}>🗑️</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-footer">
            <div className="total">
              Total: <strong>Rp {total.toLocaleString('id-ID')}</strong>
            </div>
            <button
              className="checkout-btn"
              onClick={() => navigate('/payment')}
            >
              Checkout
            </button>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}
