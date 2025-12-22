<<<<<<< HEAD
// API Configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const API_VERSION = '/api/v1';

export const API_BASE_URL = `${BASE_URL}${API_VERSION}`;

export const ENDPOINTS = {
  // Examens
  EXAMENS: '/examen',
  EXAMEN_DETAIL: (id: string) => `/examen/${id}`,

  // Absences
  ABSENCES: '/absence',
  ABSENCE_DETAIL: (id: string) => `/absence/${id}`,

  // Planning
  PLANNING: '/plannings',
  PLANNING_DETAIL: (id: string) => `/plannings/${id}`,

  // Autres ressources (si exposées)
  MODULES: '/modules',
  ENSEIGNANTS: '/enseignants',
  ETUDIANTS: '/etudiants',
  COURS: '/cours',
  SALLES: '/salles',
} as const;

export default API_BASE_URL;
=======
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: { "Content-Type": "application/json" },
// });

// export const login = async (email: string, password: string) => {
//   const response = await api.post("/auth/login", { email, password });
//   return response.data;
// };

// export default api;
>>>>>>> 01199f9171915a2cb520bbaf4ad8a3405e056215
