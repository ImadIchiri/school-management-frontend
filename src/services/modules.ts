import axiosInstance from "@/api";

/* ===== TYPE RETOUR API ===== */
export type ModuleType = {
  id: number;
  nom: string;
  description: string;
  niveauId: number;
  createdAt: string;
  updatedAt: string;
};

/* ===== TYPE CREATE / UPDATE ===== */
export type CreateModule = {
  nom: string;
  description: string;
  niveauId: number;
};

export const getModules = () =>
  axiosInstance.get("/modules");

export const getModuleById = (id: number) =>
  axiosInstance.get(`/module/${id}`);

export const createModule = (module: CreateModule) =>
  axiosInstance.post("/module", module);

export const updateModule = (id: number, module: CreateModule) =>
  axiosInstance.put(`/module/${id}`, module);

export const deleteModule = (id: number) =>
  axiosInstance.delete(`/module/${id}`);
