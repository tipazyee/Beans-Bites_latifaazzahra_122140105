import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!loggedIn) {
      navigate('/admin/login');
    } else {
      setProducts([
        {
          id: 1,
          name: 'Americano',
          price: '25000',
          stock: 10,
          category: 'Coffee',
        },
        {
          id: 2,
          name: 'Cappuccino',
          price: '30000',
          stock: 5,
          category: 'Coffee',
        },
        {
          id: 3,
          name: 'Lemonade',
          price: '20000',
          stock: 8,
          category: 'Non-Coffee',
        },
      ]);
    }
  }, [navigate]);

  return (
    <div className="admin-container">
      <Navbar />
      <main className="admin-main">
        <h1 className="admin-title">Dashboard Admin</h1>
        <div className="admin-button-container">
          <Link to="/admin/add-product">
            <button className="admin-add-button">Tambah Produk Baru</button>
          </Link>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nama Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>Rp {parseInt(p.price).toLocaleString('id-ID')}</td>
                  <td>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
