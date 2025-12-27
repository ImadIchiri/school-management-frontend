import axiosInstance from "@/api";

export type RessourceAttributesTypes = {
  id?: number;
  titre: string;
  description: string;
  url: string | File; // File pour l'upload
  uploadedAt: Date | string; // string si utilisé dans FormData
  uploadedById: number;
  typeId: number;
};

// GET toutes les ressources
export const getRessources = () => 
  axiosInstance.get("/ressources");

// GET une ressource par id
export const getRessourceById = (ressourceId: number) =>
  axiosInstance.get(`/ressources/${ressourceId}`);

// CREATE ressource avec upload fichier
export const createRessource = (formData: FormData) => {
  return axiosInstance.post("/ressources/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// UPDATE ressource (sans fichier)
export const updateRessource = (ressourceId: number, data: Partial<RessourceAttributesTypes>) =>
  axiosInstance.put(`/ressources/${ressourceId}`, data);

// DELETE ressource
export const deleteRessource = (ressourceId: number) => 
  axiosInstance.delete(`/ressources/${ressourceId}`);
