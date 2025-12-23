import axiosInstance from "@/api";

/* ================= TYPES ================= */
export type FiliereAttributes = {
  id?: number;
  nom: string;
  description?: string;
};

/* ================= API ================= */
export const getFilieres = () =>
  axiosInstance.get("/filiere");

export const getFiliereById = (id: number | string) =>
  axiosInstance.get(`/filiere/${id}`);

export const createFiliere = (data: FiliereAttributes) =>
  axiosInstance.post("/filiere", data);

export const updateFiliere = (
  id: number | string,
  data: FiliereAttributes
) =>
  axiosInstance.put(`/filiere/${id}`, data);

export const deleteFiliere = (id: number | string) =>
  axiosInstance.delete(`/filiere/${id}`);

export const getEtudiantsByFiliere = (id: number | string) =>
  axiosInstance.get(`/filiere/${id}/etudiants`);
