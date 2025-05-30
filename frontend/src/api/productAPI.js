import axios from 'axios';
const api = axios.create({ baseURL: 'http://localhost:6543/api' });

export async function getProducts() {
  const res = await api.get('/products');
  return res.data;
}

export function addProduct(payload) {
  return api.post('/products', payload).then(res => res.data);
}

export function updateProduct(id, payload) {
  return api.put(`/products/${id}`, payload).then(res => res.data);
}

export function deleteProduct(id) {
  return api.delete(`/products/${id}`).then(res => res.data);
}
