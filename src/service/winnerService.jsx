import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseURL}/auth`;
// const API_URL = "http://localhost:5000/api/winners"; 

// GET all serials with pagination
const getWinners = async ({ page = 1 }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Auth token not found");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Send filters + pagination
  const res = await axios.post(
    `${API_URL}/read`,
    { page },
    config
  );

  return res.data;
};

const clearSerial = async (data) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Auth token not found");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Send filters + pagination
  const res = await axios.post(
    `${API_URL}/clear`,
    data,
    config
  );

  return res.data;
};

export default {
  getWinners,
  clearSerial
};
