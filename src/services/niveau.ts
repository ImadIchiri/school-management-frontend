import axiosInstance from "@/api";

/* ================= TYPES ================= */
export type NiveauAttributes = {
  id?: number;
  nom: string;
  filiereId: number;
};

/* ================= API ================= */
export const getNiveaux = () =>
  axiosInstance.get("/niveau");

export const getNiveauById = (id: number | string) =>
  axiosInstance.get(`/niveau/${id}`);

export const createNiveau = (data: NiveauAttributes) =>
  axiosInstance.post("/niveau", data);

export const updateNiveau = (
  id: number | string,
  data: NiveauAttributes
) =>
  axiosInstance.put(`/niveau/${id}`, data);

export const deleteNiveau = (id: number | string) =>
  axiosInstance.delete(`/niveau/${id}`);

export const getGroupesByNiveau = (id: number | string) =>
  axiosInstance.get(`/niveau/${id}/groupes`);
