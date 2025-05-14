import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageStock = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!loggedIn) {
      navigate('/admin/login');
    } else {
      setProducts([
        { id: 1, name: 'Americano', stock: 10 },
        { id: 2, name: 'Cappuccino', stock: 5 },
        { id: 3, name: 'Cheesecake', stock: 8 },
      ]);
      setLoading(false);
    }
  }, [navigate]);

  const handleStockChange = (id, newStock) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, stock: newStock } : product
    ));
  };

  const handleSave = () => {
    alert('Stok produk berhasil diperbarui!');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="manage-stock-page">
      <h1>Kelola Stok Produk</h1>
      <table border="1" cellPadding="10" style={{ width: '100%', marginTop: 20 }}>
        <thead>
          <tr>
            <th>Nama Produk</th>
            <th>Stok Saat Ini</th>
            <th>Update Stok</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={product.stock}
                  onChange={e => handleStockChange(product.id, parseInt(e.target.value))}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSave} style={{ marginTop: 20, padding: '10px 20px' }}>
        Simpan Perubahan Stok
      </button>
    </div>
  );
};

export default ManageStock;
