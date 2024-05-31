import axios from "axios";
const token = localStorage.getItem("stylevow_token");

export const apiRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
