import { useEffect, useState } from "react";
import {
  getNiveaux,
  createNiveau,
  updateNiveau,
  deleteNiveau,
} from "@/services/niveau";

/* ================= TYPES ================= */
export interface Niveau {
  id: number;
  anneeLabel: string;
  dateDebut: string;
  dateFin: string;
  filiereId: number;
}

/* ================= HOOK ================= */
export const useNiveaux = () => {
  const [niveaux, setNiveaux] = useState<Niveau[]>([]);
  const [loading, setLoading] = useState(false);

  /* ========== FETCH ========== */
  const fetchNiveaux = async () => {
    setLoading(true);
    try {
      const res = await getNiveaux();
      setNiveaux(res.data);
    } catch (error) {
      console.error("Erreur chargement niveaux", error);
    } finally {
      setLoading(false);
    }
  };

  /* ========== CREATE ========== */
  const handleCreate = async (niveau: Omit<Niveau, "id">) => {
    await createNiveau(niveau);
    fetchNiveaux();
  };

  /* ========== UPDATE ========== */
  const handleUpdate = async (
    id: number,
    niveau: Omit<Niveau, "id">
  ) => {
    await updateNiveau(id, niveau);
    fetchNiveaux();
  };

  /* ========== DELETE ========== */
  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce niveau ?")) return;
    await deleteNiveau(id);
    fetchNiveaux();
  };

  useEffect(() => {
    fetchNiveaux();
  }, []);

  return {
    niveaux,
    loading,
    fetchNiveaux,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
