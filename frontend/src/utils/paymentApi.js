import axios from "axios";

const paymentApi = axios.create({
  baseURL: import.meta.env.PAYMENT_URL,
});

paymentApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default paymentApi;
