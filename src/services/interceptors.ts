import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '@/types/common';

export const setupInterceptors = (instance: AxiosInstance) => {
  // Request interceptor - Ajouter token auth
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor - Gestion erreurs
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Token expiré ou invalide
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }

      const status = error.response?.status || 500;
      const message = (error.response?.data as any)?.message || error.message;
      
      return Promise.reject(
        new ApiError(status, message, error.response?.data)
      );
    }
  );

  return instance;
};
