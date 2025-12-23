import axiosInstance from "@/api";

type ExamenAttributesTypes = {
  id?: number;
  titre: string;
  date: Date;
  employeId: number;
};

export const getExamens = () => axiosInstance.get("/examens");
export const getExamenById = (examenId: number) =>
  axiosInstance.get(`/examens/${examenId}`);
export const createExamen = (examen: ExamenAttributesTypes) =>
  axiosInstance.post("/examens", examen);
export const updateExamen = (examen: ExamenAttributesTypes) =>
  axiosInstance.put("/examens", examen);
export const deleteExamen = () => axiosInstance.delete("/examens");
