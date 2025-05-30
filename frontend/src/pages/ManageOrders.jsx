import React, { useEffect, useState } from 'react';
import { getOrders, deleteOrder } from '../api/orderAPI';
import Sidebar from '../components/Sidebar';
import '../App.css';

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then(data => setOrders(data))
      .catch(err => alert("❌ Gagal memuat order"));
  }, []);

  const loadOrders = () => {
    getOrders().then(setOrders);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus order ini?')) {
      deleteOrder(id).then(() => loadOrders());
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Manajemen Order</h2>

        <table style={{ width: '100%', marginTop: 20 }}>
          <thead>
            <tr>
              <th>Nama Customer</th>
              <th>Produk</th>
              <th>Jumlah</th>
              <th>Tanggal Order</th> 
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>Belum ada order</td></tr>
            ) : orders.map(order => (
              <tr key={order.id}>
                <td>{order.customer_name}</td>
                <td>{order.product_name}</td>
                <td>{order.quantity}</td>
                <td>{new Date(order.created_at).toLocaleString('id-ID')}</td> 
                <td className="action-buttons">
                  <button className="delete-btn" onClick={() => handleDelete(order.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
