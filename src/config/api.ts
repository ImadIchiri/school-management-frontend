import axios from "axios";

/* ================= CONFIG AXIOS ================= */
const API_BASE_URL = "http://localhost:8088/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Si plus tard tu as un token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* ================= FILIERE API ================= */
export const FiliereAPI = {
  getAll: () => api.get("/filiere"),

  getById: (id: number | string) =>
    api.get(`/filiere/${id}`),

  create: (data: any) =>
    api.post("/filiere", data),

  update: (id: number | string, data: any) =>
    api.put(`/filiere/${id}`, data),

  delete: (id: number | string) =>
    api.delete(`/filiere/${id}`),

  getEtudiantsByFiliere: (id: number | string) =>
    api.get(`/filiere/${id}/etudiants`),
};

/* ================= NIVEAU API ================= */
export const NiveauAPI = {
  getAll: () => api.get("/niveau"),

  getById: (id: number | string) =>
    api.get(`/niveau/${id}`),

  create: (data: any) =>
    api.post("/niveau", data),

  update: (id: number | string, data: any) =>
    api.put(`/niveau/${id}`, data),

  delete: (id: number | string) =>
    api.delete(`/niveau/${id}`),

  getGroupesByNiveau: (id: number | string) =>
    api.get(`/niveau/${id}/groupes`),
};

/* ================= GROUPE API ================= */
export const GroupeAPI = {
  getAll: () => api.get("/group"),

  getById: (id: number | string) =>
    api.get(`/group/${id}`),

  create: (data: any) =>
    api.post("/group", data),

  update: (id: number | string, data: any) =>
    api.put(`/group/${id}`, data),

  delete: (id: number | string) =>
    api.delete(`/group/${id}`),

  getEtudiantsByGroupe: (id: number | string) =>
    api.get(`/group/${id}/etudiants`),
};
