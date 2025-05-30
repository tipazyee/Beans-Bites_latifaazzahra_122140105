import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import coffeeImage from '../aset/coffee.jpeg';
import nonCoffeeImage from '../aset/noncoffee.jpg';
import dessertImage from '../aset/dessert.jpg';

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      <div className="hero-section">
        <h1>Selamat datang di Beans & Bites!</h1>
        <p>Menikmati kopi dan dessert terbaik di kota.</p>
        <Link to="/menu">
          <button>Jelajahi Menu</button>
        </Link>
      </div>

      <section className="menu-categories">
        <h2>Menu Kami</h2>
        <div className="menu-buttons">
          <Link to="/menu#coffee">
            <button className="menu-btn">
              <img src={coffeeImage} alt="Coffee" />
              Coffee
            </button>
          </Link>
          <Link to="/menu#non-coffee">
            <button className="menu-btn">
              <img src={nonCoffeeImage} alt="Non-Coffee" />
              Non-Coffee
            </button>
          </Link>
          <Link to="/menu#dessert">
            <button className="menu-btn">
              <img src={dessertImage} alt="Dessert" />
              Dessert
            </button>
          </Link>
        </div>
      </section>

      <section className="contact-info">
        <div className="contact">
          <h3>Kontak Kami</h3>
          <p>Instagram: <a href="https://instagram.com/beansandbites" target="_blank" rel="noopener noreferrer">@beansandbites</a></p>
          <p>Email: <a href="mailto:info@beansandbites.com">info@beansandbites.com</a></p>
          <p>Alamat: Jl. Kopi No. 10, Jakarta</p>
        </div>
        <div className="map">
          <h3>Lokasi Kami</h3>
          <iframe 
            src="https://www.google.com/maps/embed?pb=..." 
            width="600" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy"
            title="Map showing Beans & Bites location"  
          ></iframe>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
