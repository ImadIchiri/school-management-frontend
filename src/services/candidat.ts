import axiosInstance from "@/api";

/* ================= TYPES ================= */
export interface CandidatAttributes {
  idCandidature?: number;
  userId?: number;
  nom?: string;
  prenom?: string;
  dateNaissance?: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  password?: string;
  filiere: string;
  niveau: string;
  etat?: "en_attente" | "en_cours" | "accepte" | "refuse" | "incomplet";
  dateCandidature?: string;
}

/* ================= API ================= */
export const getAllCandidats = () => axiosInstance.get("/candidats");
export const getCandidatById = (id: number) => axiosInstance.get(`/candidats/${id}`);
export const createCandidat = (data: CandidatAttributes) => axiosInstance.post("/candidats", data);
export const updateCandidat = (id: number, data: Partial<CandidatAttributes>) =>
  axiosInstance.put(`/candidats/${id}`, data);
export const deleteCandidat = (id: number) =>
  axiosInstance.delete("/candidats", { data: { id } });
