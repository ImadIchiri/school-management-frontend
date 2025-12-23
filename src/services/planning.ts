import axiosInstance from "@/api";

type ExamenAttributesTypes = {
  id?: number;
  titre: string;
  date: Date;
  employeId: number;
};

export const getPlannings = () => axiosInstance.get("/plannings");
export const getPlanningById = (id: number) =>
  axiosInstance.get(`/plannings/${id}`);
export const createPlanning = (planning: ExamenAttributesTypes) =>
  axiosInstance.post("/plannings", planning);
export const updatePlanning = (id: number,planning: ExamenAttributesTypes) =>
  axiosInstance.put(`/plannings/${id}`, planning);
export const deletePlanning = (id: number) => 
  axiosInstance.delete(`/plannings/${id}`);