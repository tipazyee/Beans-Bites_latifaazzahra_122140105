import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { getProducts } from '../api/productAPI';
import { getOrders } from '../api/orderAPI';
import '../App.css';

export default function AdminDashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    getProducts().then(data => setTotalProducts(data.length));
    getOrders().then(data => setTotalOrders(data.length));
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <h2 className="dashboard-title">Welcome back, <strong>admin 👋</strong></h2>
        <p className="dashboard-subtitle">Dashboard Overview</p>
        <div className="dashboard-cards">
          <div className="card">
            <h4>Total Produk</h4>
            <p className="card-number">{totalProducts}</p>
            <p className="card-desc">produk tersedia di sistem</p>
          </div>
          <div className="card">
            <h4>Total Order</h4>
            <p className="card-number">{totalOrders}</p>
            <p className="card-desc">order masuk di sistem</p>
          </div>
        </div>
      </div>
    </div>
  );
}

