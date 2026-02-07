// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Backend URL

// Register new user
export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data; // returns { user, token }
  } catch (err) {
    // Throw backend error to handle in UI
    throw err.response?.data || { message: "Registration failed" };
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials);
    return res.data; // returns { user, token }
  } catch (err) {
    throw err.response?.data || { message: "Login failed" };
  }
};
