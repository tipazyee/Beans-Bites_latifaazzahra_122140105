import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">Admin Panel</h2>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/manage-products">Manage Produk</Link>
        <Link to="/manage-orders">Manage Order</Link>
      </nav>
    </aside>
  );
}
