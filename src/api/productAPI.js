import axios from 'axios';

const API_URL = 'http://localhost:6543/api/products';

// Fungsi untuk mengambil daftar produk
export const getProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fungsi untuk mendapatkan produk berdasarkan kategori
export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}?category=${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

// Fungsi untuk menambahkan produk baru
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Fungsi untuk memperbarui produk
export const updateProduct = async (productId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${productId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
