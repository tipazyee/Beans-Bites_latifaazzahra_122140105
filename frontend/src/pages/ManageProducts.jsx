import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../api/productAPI';
import Sidebar from '../components/Sidebar';
import '../App.css';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', price: '', stock: '', image_url: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    getProducts()
      .then(data => setProducts(data))
      .catch(err => console.error('Gagal fetch produk:', err));
  };

  const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };

  const handleUpdateStock = (id, stock) => {
    if (isNaN(stock) || stock < 0) {
      alert('Stok harus berupa angka valid dan tidak negatif');
      return;
    }
    updateProduct(id, { stock: Number(stock) })
      .then(() => fetchProducts())
      .catch(() => alert('Gagal update stok'));
  };

  const handleDelete = (id) => {
  if (window.confirm('Yakin ingin menghapus produk ini?')) {
    deleteProduct(id)
      .then(() => fetchProducts())
      .catch(() => alert('Gagal menghapus produk'));
  }
};

  const handleEdit = (p) => {
    setForm(p);
    setEditingId(p.id); 
  };
  const handleSubmit = (e) => {
  e.preventDefault();
  const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
  const action = editingId ? updateProduct(editingId, payload) : addProduct(payload);

  action
    .then(() => {
      fetchProducts(); 
      setForm({ name: '', category: '', price: '', stock: '', image_url: '' });
      setEditingId(null);
    })
    .catch(() => alert('Gagal menyimpan produk'));
};

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Manajemen Produk</h2>

        <form onSubmit={handleSubmit} className="product-form">
          <input type="text" placeholder="Nama Produk" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} required>
            <option value="">Pilih Kategori</option>
            <option value="Coffee">Coffee</option>
            <option value="Non-Coffee">Non-Coffee</option>
            <option value="Dessert">Dessert</option>
          </select>
          <input type="number" placeholder="Harga" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
          <input type="number" placeholder="Stok" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} required />
          <input type="text" placeholder="URL Gambar" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} />
          <button type="submit" className="submit-button">{editingId ? 'Update' : 'Tambah'} Produk</button>
        </form>

        <table style={{ width: '100%', marginTop: 20 }}>
          <thead>
            <tr>
              <th>Nama</th><th>Kategori</th><th>Harga</th><th>Stok</th><th>Gambar</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>Rp {p.price.toLocaleString()}</td>
                <td>{p.stock}</td>
                <td>{p.image_url ? <img src={p.image_url} alt="" width="60" /> : '-'}</td>
                <td className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
