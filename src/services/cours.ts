import axiosInstance from "@/api";

type CreateCours = {
  titre: string;
  description?: string;
  dateDebut: string;
  dateFin: string;
  moduleId: number;
  enseignantId?: number;
  salleId?: number;
};


export const getCours=()=>
  axiosInstance.get("/cours");
export const getCoursById = (id:number)=>
  axiosInstance.get(`/cours/${id}`);
export const createCours = (cours:CreateCours)=>
  axiosInstance.post("/cours",cours);
export const updateCours = (id:number,cours:CreateCours)=>
  axiosInstance.put(`/cours/${id}`,cours);
export const deleteCours = (id:number)=>
  axiosInstance.delete(`/cours/${id}`);