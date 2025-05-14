import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../aset/logo.png'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Beans & Bites Logo" className="logo-img" />
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Beranda</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Keranjang</Link></li>
        <li><Link to="/admin/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
