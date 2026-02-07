import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

// Helper to get token from localStorage
const getTokenConfig = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo || !userInfo.token) throw new Error("User not logged in");

  return {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
};

// CREATE BOOKING
export const createBooking = async (bookingData) => {
  try {
    const config = getTokenConfig();
    const res = await axios.post(API_URL, bookingData, config);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Booking failed" };
  }
};

// GET MY BOOKINGS
export const getMyBookings = async () => {
  try {
    const config = getTokenConfig();
    const res = await axios.get(`${API_URL}/my`, config);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to fetch bookings" };
  }
};

// CANCEL BOOKING
export const cancelBooking = async (bookingId) => {
  try {
    const config = getTokenConfig();
    const res = await axios.put(`${API_URL}/${bookingId}/cancel`, {}, config);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Could not cancel booking" };
  }
};
