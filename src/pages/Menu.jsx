import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; 
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import coffee1 from '../aset/Americano.jpg';
import coffee2 from '../aset/Cappucino.jpg';
import noncoffee1 from '../aset/Lemonade.jpg';
import noncoffee2 from '../aset/Iced Tea.jpg';
import dessert1 from '../aset/Cheesecake.jpg';
import dessert2 from '../aset/Brownie.jpg';

const Menu = () => {
  const { addToCart } = useCart(); 
  const [notification, setNotification] = useState(""); 
  const images = {
  'coffee1.jpg': coffee1,
  'coffee2.jpg': coffee2,
  'noncoffee1.jpg': noncoffee1,
  'noncoffee2.jpg': noncoffee2,
  'dessert1.jpg': dessert1,
  'dessert2.jpg': dessert2,
};

  const coffeeProducts = [
    { id: 1, name: 'Americano', description: 'Espresso dengan air panas', price: '25,000', imageUrl: 'coffee1.jpg' },
    { id: 2, name: 'Cappuccino', description: 'Espresso, susu panas, dan busa susu', price: '30,000', imageUrl: 'coffee2.jpg' },
  ];

  const nonCoffeeProducts = [
    { id: 3, name: 'Lemonade', description: 'Minuman lemon segar', price: '20,000', imageUrl: 'noncoffee1.jpg' },
    { id: 4, name: 'Iced Tea', description: 'Teh dingin dengan es', price: '18,000', imageUrl: 'noncoffee2.jpg' },
  ];

  const dessertProducts = [
    { id: 5, name: 'Cheesecake', description: 'Kue keju lembut dengan topping buah', price: '35,000', imageUrl: 'dessert1.jpg' },
    { id: 6, name: 'Brownie', description: 'Kue cokelat padat dan lezat', price: '25,000', imageUrl: 'dessert2.jpg' },
  ];

  const handleAddToCart = (product) => {
    addToCart(product);  
    setNotification(`${product.name} berhasil ditambahkan ke keranjang!`);  

    setTimeout(() => {
      setNotification(""); 
    }, 3000);
  };

  return (
    <div className="menu-page">
    <Navbar/>
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      <section id="coffee">
        <h2>Coffee Menu</h2>
        <div className="product-list">
          {coffeeProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={images[product.imageUrl]} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Rp {product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section id="non-coffee">
        <h2>Non-Coffee Menu</h2>
        <div className="product-list">
          {nonCoffeeProducts.map((product) => (
            <div key={product.id} className="product-card">
             <img src={images[product.imageUrl]} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Rp {product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      <section id="dessert">
        <h2>Dessert Menu</h2>
        <div className="product-list">
          {dessertProducts.map((product) => (
            <div key={product.id} className="product-card">
             <img src={images[product.imageUrl]} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Rp {product.price}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Menu;
