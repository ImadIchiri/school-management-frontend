import { useEffect, useState } from "react";
import {
  getGroupes,
  createGroupe,
  updateGroupe,
  deleteGroupe,
} from "@/services/group";

/* ================= TYPES ================= */
export interface Groupe {
  id: number;
  nom: string;
  niveauId: number;
  createdAt?: string;
  updatedAt?: string;
}

/* ================= HOOK ================= */
export const useGroupes = () => {
  const [groupes, setGroupes] = useState<Groupe[]>([]);
  const [loading, setLoading] = useState(false);

  /* ========== FETCH ========== */
  const fetchGroupes = async () => {
    setLoading(true);
    try {
      const res = await getGroupes();
      setGroupes(res.data);
    } catch (error) {
      console.error("Erreur chargement groupes", error);
    } finally {
      setLoading(false);
    }
  };

  /* ========== CREATE ========== */
  const handleCreate = async (data: {
    nom: string;
    niveauId: number;
  }) => {
    try {
      await createGroupe(data);
      fetchGroupes();
    } catch (error) {
      console.error("Erreur création groupe", error);
    }
  };

  /* ========== UPDATE ========== */
  const handleUpdate = async (
    id: number,
    data: {
      nom: string;
      niveauId: number;
    }
  ) => {
    try {
      await updateGroupe(id, data);
      fetchGroupes();
    } catch (error) {
      console.error("Erreur mise à jour groupe", error);
    }
  };

  /* ========== DELETE ========== */
  const handleDelete = async (id: number) => {
    console.log({id});
    
    try {
      await deleteGroupe(id);
      fetchGroupes();
    } catch (error) {
      console.error("Erreur suppression groupe", error);
    }
  };

  useEffect(() => {
    fetchGroupes();
  }, []);

  return {
    groupes,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
