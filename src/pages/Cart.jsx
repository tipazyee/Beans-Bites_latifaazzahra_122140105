import React from 'react';
import { useCart } from '../context/CartContext';  
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import coffee1 from '../aset/Americano.jpg';
import coffee2 from '../aset/Cappucino.jpg';
import noncoffee1 from '../aset/Lemonade.jpg';
import noncoffee2 from '../aset/Iced Tea.jpg';
import dessert1 from '../aset/Cheesecake.jpg';
import dessert2 from '../aset/Brownie.jpg';

const Cart = () => {
  const { cart, removeFromCart, changeQuantity } = useCart();  
  const navigate = useNavigate();
  const images = {
    'coffee1.jpg': coffee1,
    'coffee2.jpg': coffee2,
    'noncoffee1.jpg': noncoffee1,
    'noncoffee2.jpg': noncoffee2,
    'dessert1.jpg': dessert1,
    'dessert2.jpg': dessert2,
  };

  const goToPayment = () => {
    navigate('/payment', { state: { cart } });  
  };

  return (
    <div className="cart-page">
      <Navbar />
      <h2>Keranjang Belanja</h2>

      {cart.length > 0 ? (
        <div className="cart-items">
        {cart.map((product) => (
          <CartItem
            key={product.id}
            item={product}
            image={images[product.imageUrl]}
            onRemove={removeFromCart}
            onChangeQuantity={changeQuantity}
          />
         ))}
        </div>
      ) : (
        <p>Keranjang Anda kosong.</p>
      )}

      {cart.length > 0 && (
        <div className="checkout-btn">
          <button onClick={goToPayment}>Checkout</button>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Cart;
