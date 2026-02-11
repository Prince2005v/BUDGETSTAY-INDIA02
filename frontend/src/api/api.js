import axios from "axios";

const API = axios.create({
  baseURL: "https://budgetstay-india-02-1c3x.vercel.app/api/hotels",});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
