import { useEffect, useState } from "react";
import {
  getFilieres,
  createFiliere,
  updateFiliere,
  deleteFiliere,
} from "@/services/filieres";

/* ================= TYPES ================= */
export interface Filiere {
  id: number;
  nom: string;
  description?: string;
}

/* ================= HOOK ================= */
export const useFilieres = () => {
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFilieres = async () => {
    setLoading(true);
    try {
      const res = await getFilieres();
      setFilieres(res.data);
    } catch (error) {
      console.error("Erreur chargement filières", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: {
    nom: string;
    description?: string;
  }) => {
    await createFiliere(data);
    fetchFilieres();
  };

  const handleUpdate = async (
    id: number,
    data: { nom: string; description?: string }
  ) => {
    await updateFiliere(id, data);
    fetchFilieres();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer cette filière ?")) return;
    await deleteFiliere(id);
    fetchFilieres();
  };

  useEffect(() => {
    fetchFilieres();
  }, []);

  return {
    filieres,
    loading,
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
