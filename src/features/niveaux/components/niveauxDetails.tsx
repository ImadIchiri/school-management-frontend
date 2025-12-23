import { useEffect, useState } from "react";
import { NiveauAPI } from "../../../config/api"; // Assure-toi que tu as cette API

export interface Niveau {
  id: number;
  anneeLabel: string;
  dateDebut: string;
  dateFin: string;
  filiereId: number;
}

export const useNiveauDetails = (id: number) => {
  const [niveau, setNiveau] = useState<Niveau | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchNiveau = async () => {
    setLoading(true);
    try {
      const res = await NiveauAPI.getById(id);
      setNiveau(res.data);
    } catch (error) {
      console.error("Erreur chargement niveau", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNiveau = async () => {
    if (!window.confirm("Supprimer ce niveau ?")) return;
    try {
      await NiveauAPI.delete(id);
      setNiveau(null);
    } catch (error) {
      console.error("Erreur suppression", error);
    }
  };

  useEffect(() => {
    fetchNiveau();
  }, [id]);

  return {
    niveau,
    loading,
    deleteNiveau,
  };
};
