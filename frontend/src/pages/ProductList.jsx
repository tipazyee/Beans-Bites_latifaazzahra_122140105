import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../api/productAPI';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  const fetch = () => {
    getProducts()
      .then(setProducts)
      .catch(console.error);
  };

  useEffect(fetch, []);

  const onDelete = id =>
    deleteProduct(id).then(() => fetch());

  return (
    <table>
      <thead>…</thead>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.category}</td>
            <td>{p.price}</td>
            <td>{p.stock}</td>
            <td><img src={p.image_url} alt={p.name} width={50}/></td>
            <td>
              <button onClick={() => onDelete(p.id)}>Hapus</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
