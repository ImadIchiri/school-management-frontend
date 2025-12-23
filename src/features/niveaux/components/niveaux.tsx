import { useEffect, useState } from "react";
import { NiveauAPI } from "../../../config/api";

export interface Niveau {
  id: number;
  anneeLabel: string;
  dateDebut: string;
  dateFin: string;
  filiereId: number;
}

export const useNiveaux = () => {
  const [niveaux, setNiveaux] = useState<Niveau[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNiveaux = async () => {
    setLoading(true);
    try {
      const res = await NiveauAPI.getAll();
      setNiveaux(res.data);
    } catch (error) {
      console.error("Erreur chargement niveaux", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteNiveau = async (id: number) => {
    if (!window.confirm("Supprimer ce niveau ?")) return;
    try {
      await NiveauAPI.delete(id);
      fetchNiveaux();
    } catch (error) {
      console.error("Erreur suppression", error);
    }
  };

  const createNiveau = async (niveau: {
    anneeLabel: string;
    dateDebut: string;
    dateFin: string;
    filiereId: number;
  }) => {
    try {
      await NiveauAPI.create(niveau);
      fetchNiveaux();
    } catch (error) {
      console.error("Erreur création", error);
    }
  };

  const updateNiveau = async (
    id: number,
    niveau: { anneeLabel: string; dateDebut: string; dateFin: string; filiereId: number }
  ) => {
    try {
      await NiveauAPI.update(id, niveau);
      fetchNiveaux();
    } catch (error) {
      console.error("Erreur mise à jour", error);
    }
  };

  useEffect(() => {
    fetchNiveaux();
  }, []);

  return {
    niveaux,
    loading,
    deleteNiveau,
    createNiveau,
    updateNiveau,
  };
};
