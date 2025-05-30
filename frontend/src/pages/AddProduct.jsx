import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../api/productAPI';

export default function AddProduct() {
  const [form, setForm] = useState({
    name: '', category: '', price: '', stock: '', image_url: ''
  });
  const nav = useNavigate();

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addProduct({
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10)
    })
      .then(() => {
        alert('Produk berhasil ditambah');
        nav('/admin/dashboard');
      })
      .catch(err => {
        console.error(err);
        alert('Gagal menambah produk');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name"       onChange={handleChange} placeholder="Nama"/>
      <select name="category"  onChange={handleChange}>
        <option value="">Pilih kategori</option>
        <option value="Coffee">Coffee</option>
        <option value="Non-Coffee">Non-Coffee</option>
      </select>
      <input name="price"      onChange={handleChange} placeholder="Harga"/>
      <input name="stock"      onChange={handleChange} placeholder="Stok"/>
      <input name="image_url"  onChange={handleChange} placeholder="URL Gambar"/>
      <button type="submit">Tambah Produk</button>
    </form>
  );
}
