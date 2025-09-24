import axios from "axios";
const baseURL = process.env.REACT_APP_API_BASE_URL;
// const API_URL = `${baseURL}/auth`;
const API_URL = "http://localhost:5000/api/auth";

export const signupUser = async (data) => {
  const res = await axios.post(`${API_URL}/signup`, data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await axios.post(`${API_URL}/login`, data);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  } 
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
