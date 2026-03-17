import axios from "axios";

const paymentApi = axios.create({
  baseURL: "http://localhost:5000/api/payment",
});

paymentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default paymentApi;
