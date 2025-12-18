import axios, { type AxiosInstance } from 'axios';
import { API_BASE_URL } from '@/config/api';
import { setupInterceptors } from './interceptors';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

// Setup interceptors (auth, error handling)
setupInterceptors(axiosInstance);

export default axiosInstance;
