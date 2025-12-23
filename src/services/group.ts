import axiosInstance from "@/api";

/* ================= TYPES ================= */
export type GroupeAttributes = {
  id?: number;
  nom: string;
  niveauId: number;
};

/* ================= API ================= */
export const getGroupes = () =>
  axiosInstance.get("/group");

export const getGroupeById = (id: number | string) =>
  axiosInstance.get(`/group/${id}`);

export const createGroupe = (data: GroupeAttributes) =>
  axiosInstance.post("/group", data);

export const updateGroupe = (
  id: number | string,
  data: GroupeAttributes
) =>
  axiosInstance.put(`/group/${id}`, data);

export const deleteGroupe = (id: number | string) =>
  axiosInstance.delete(`/group/${id}`);

export const getEtudiantsByGroupe = (id: number | string) =>
  axiosInstance.get(`/group/${id}/etudiants`);
