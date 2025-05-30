import axios from 'axios'
const api = axios.create({ baseURL: 'http://localhost:6543/api' })

export const getOrders = () =>
  fetch('/api/orders') 
    .then(res => {
      if (!res.ok) throw new Error('Gagal memuat order');
      return res.json();
    });

export const addOrder = (payload) =>
  api.post('/orders', payload).then(res => res.data);

export function removeOrderItem(id) {
  return api.delete(`/orders/${id}`).then(r => r.data)
}

export function updateOrderItem(id, payload) {
  return api.put(`/orders/${id}`, payload).then(r => r.data)
}

export function finalizeOrder(orderId) {
  return api.post('/orders/finalize', { order_id: orderId }).then(r => r.data);
}

export async function deleteOrder(id) {
  return api.delete(`/orders/${id}`).then(r => r.data);
}
