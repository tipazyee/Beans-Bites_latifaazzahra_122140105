import axios from 'axios';

// Set URL backend (ganti sesuai dengan URL backend kamu)
const API_URL = 'http://localhost:6543/api/orders';

// Fungsi untuk membuat pesanan
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(API_URL, orderData);
    return response.data; // Mengembalikan data pesanan yang dibuat
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Fungsi untuk mengambil riwayat pesanan (admin)
export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};
