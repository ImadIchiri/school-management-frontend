import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000, // Cancel Request If There is no reply after '10s'
  httpsAgent: import.meta.env.VITE_API_HTTPS_AGENT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // true seulement si on a cookies
});

export default axiosInstance;
