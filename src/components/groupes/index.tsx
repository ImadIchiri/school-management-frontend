import { useEffect, useState } from "react";
import { GroupeAPI } from "../../services/axios";

/* ================= TYPES ================= */
export interface Groupe {
  id: number;
  nom: string;
  niveauId: number;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
}

/* ================= HOOK ================= */
export const useGroupes = () => {
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [loading, setLoading] = useState(false);

  /* ========== FETCH ========== */
  const fetchGroupes = async () => {
    setLoading(true);
    try {
      const res = await GroupeAPI.getAll();
      setGroupes(res.data);
    } catch (error) {
      console.error("Erreur chargement groupes", error);
    } finally {
      setLoading(false);
    }
  };

  /* ========== CREATE ========== */
  const createGroupe = async (groupe: {
    nom: string;
    niveauId: number;
  }) => {
    try {
      await GroupeAPI.create(groupe);
      fetchGroupes();
    } catch (error) {
      console.error("Erreur création groupe", error);
    }
  };

  /* ========== UPDATE ========== */
  const updateGroupe = async (
    id: number,
    groupe: {
      nom: string;
      niveauId: number;
    }
  ) => {
    try {
      await GroupeAPI.update(id, groupe);
      fetchGroupes();
    } catch (error) {
      console.error("Erreur mise à jour groupe", error);
    }
  };

  /* ========== DELETE (SOFT DELETE) ========== */
  const deleteGroupe = async (id: number) => {
    try {
      await GroupeAPI.delete(id);
      fetchGroupes();
    } catch (error) {
      console.error("Erreur suppression groupe", error);
    }
  };

  /* ========== INIT ========== */
  useEffect(() => {
    fetchGroupes();
  }, []);

  return {
    groupes,
    loading,
    fetchGroupes,
    createGroupe,
    updateGroupe,
    deleteGroupe,
  };
};
