// src/services/serviceService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/services";

// GET ALL SERVICES
export const getAllServices = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch services" };
  }
};

// GET SERVICE BY ID
export const getServiceById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch service details" };
  }
};

// CREATE SERVICE (Admin only)
export const createService = async (serviceData) => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) throw new Error("User not logged in");

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.post(API_URL, serviceData, config);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to create service" };
  }
};
