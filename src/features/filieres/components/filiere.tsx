import { useEffect, useState } from "react";
import { FiliereAPI } from "../../../config/api";


export interface Filiere {
  id: number;
  nom: string;
  description?: string;
}

export const useFilieres = () => {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFilieres = async () => {
    setLoading(true);
    try {
      const res = await FiliereAPI.getAll();
      setFilieres(res.data);
    } catch (error) {
      console.error("Erreur chargement filières", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteFiliere = async (id: number) => {
    if (!window.confirm("Supprimer cette filière ?")) return;
    try {
      await FiliereAPI.delete(id);
      fetchFilieres();
    } catch (error) {
      console.error("Erreur suppression", error);
    }
  };

  const createFiliere = async (filiere: { nom: string; description?: string }) => {
    try {
      await FiliereAPI.create(filiere);
      fetchFilieres();
    } catch (error) {
      console.error("Erreur création", error);
    }
  };

  const updateFiliere = async (id: number, filiere: { nom: string; description?: string }) => {
    try {
      await FiliereAPI.update(id, filiere);
      fetchFilieres();
    } catch (error) {
      console.error("Erreur mise à jour", error);
    }
  };

  useEffect(() => {
    fetchFilieres();
  }, []);

  return {
    filieres,
    loading,
    deleteFiliere,
    createFiliere,
    updateFiliere,
  };
};
