import { useState, useEffect } from "react";
import * as candidatService from "@/services/candidat";

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

export const useCandidats = () => {
  const [candidats, setCandidats] = useState<CandidatAttributes[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCandidats = async () => {
    setLoading(true);
    try {
      const res = await candidatService.getAllCandidats();
      setCandidats(res.data.data);
    } catch (error) {
      console.error("Erreur chargement candidats", error);
    } finally {
      setLoading(false);
    }
  };

  const create = async (data: CandidatAttributes) => {
    await candidatService.createCandidat(data);
    await fetchCandidats();
  };

  const update = async (id: number, data: Partial<CandidatAttributes>) => {
    await candidatService.updateCandidat(id, data);
    await fetchCandidats();
  };

  const remove = async (id: number) => {
    await candidatService.deleteCandidat(id);
    await fetchCandidats();
  };

  useEffect(() => {
    fetchCandidats();
  }, []);

  return { candidats, loading, fetchCandidats, create, update, remove };
};
