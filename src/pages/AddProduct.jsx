import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Coffee');
  const [imageUrl, setImageUrl] = useState(''); 
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    } else {
      setLoggedIn(true);
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = { name, price, stock, category, imageUrl };
    console.log('Tambah produk:', newProduct);
    alert('Produk berhasil ditambahkan!');

    navigate('/admin/dashboard');
  };

  const handleBack = () => {
    navigate('/admin/dashboard');
  };

  if (!loggedIn) return null;

  return (
    <div className="add-product-container">
      <Navbar />
      <div className="add-product-main">
        <h2 className="add-product-title">Tambah Produk Baru</h2>
        <form className="add-product-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nama Produk"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="Coffee">Coffee</option>
            <option value="Non-Coffee">Non-Coffee</option>
            <option value="Dessert">Dessert</option>
          </select>
          <input
            type="number"
            placeholder="Harga"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Stok"
            value={stock}
            onChange={e => setStock(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="URL Gambar Produk (misal: https://domain.com/image.png)"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            required
          />

          <div className="form-buttons">
            <button type="submit" className="btn-primary">Tambah Produk</button>
            <button type="button" className="btn-secondary" onClick={handleBack}>Kembali ke Dashboard</button>
          </div>
        </form>

        {imageUrl && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p>Preview Gambar Produk:</p>
            <img src={imageUrl} alt="Preview Produk" style={{ maxWidth: '300px', borderRadius: '8px' }} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AddProduct;
