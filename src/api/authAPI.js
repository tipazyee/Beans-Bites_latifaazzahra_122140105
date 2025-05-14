import axios from 'axios';

// Set URL backend (ganti sesuai dengan URL backend kamu)
const API_URL = 'http://localhost:6543/api/auth';

// Fungsi untuk login admin
export const loginAdmin = async (username, password) => {
  try {
    const response = await axios.post(API_URL, { username, password });
    return response.data; // Mengembalikan data login admin
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
