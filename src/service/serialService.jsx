import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;
// const API_URL = `${baseURL}/serials`;
const API_URL = "http://localhost:5000/api/serials"; 

// GET all serials with pagination
const getSerials = async ({ page = 1, status, price }) => {
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
    { page, status, price },
    config
  );

  return res.data; 
};

const checkSerial = async (data) => {
  const res = await axios.post(
    `${API_URL}/check`,
    data,
  );

  return res.data; 
};

const claimSerial = async (data) => {
  const res = await axios.post(
    `${API_URL}/claim`,
    data
  );

  return res.data; 
};

export default {
  getSerials,
  checkSerial,
  claimSerial
};
