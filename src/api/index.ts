// Export tous les services API (named exports)
export * from './examen.api';
export * from './absence.api';
export * from './planning.api';

// Provide default axios instance for services expecting default import from "@/api"
import axiosInstance from '@/services/axios';
export default axiosInstance;
