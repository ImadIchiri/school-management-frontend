import axiosInstance from "@/api";

type ExamenAttributesTypes = {
  id?: number;
  titre: string;
  date: Date;
  employeId: number;
};

export const getPlannings = () => axiosInstance.get("/planning");
export const getPlanningById = (planningId: number) =>
  axiosInstance.get(`/planning/${planningId}`);
export const createPlanning = (planning: ExamenAttributesTypes) =>
  axiosInstance.post("/planning", planning);
export const updatePlanning = (planning: ExamenAttributesTypes) =>
  axiosInstance.put("/planning", planning);
export const deletePlanning = () => axiosInstance.delete("/planning");