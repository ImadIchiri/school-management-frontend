import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FiliereAPI } from "../../../config/api"; // adapte le chemin

export interface Niveau {
  id: number;
  nom: string;
  groupes: Groupe[];
}

export interface Groupe {
  id: number;
  nom: string;
}

export interface FiliereDetailsType {
  id: number;
  nom: string;
  description?: string;
  niveaux: Niveau[];
}

const FiliereDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [filiere, setFiliere] = useState<FiliereDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFiliere = async () => {
    setLoading(true);
    try {
      const res = await FiliereAPI.getById(Number(id));
      setFiliere(res.data);
    } catch (error) {
      console.error("Erreur chargement filière", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!filiere) return;
    if (!window.confirm("Supprimer cette filière ?")) return;
    try {
      await FiliereAPI.delete(filiere.id);
      alert("Filière supprimée !");
      // ici tu peux rediriger vers la liste des filières
      window.location.href = "/filieres";
    } catch (error) {
      console.error("Erreur suppression filière", error);
    }
  };

  useEffect(() => {
    fetchFiliere();
  }, [id]);

  if (loading) return <p className="text-center text-[#1D6F6B] font-medium">Chargement...</p>;
  if (!filiere) return <p className="text-center text-red-500">Filière non trouvée</p>;

  return (
    <div className="p-8 font-sans min-h-screen bg-[#DFF6F5]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-[#1D6F6B]">{filiere.nom}</h1>
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            <FaTrash />
          </button>
          <button
            className="p-2 rounded-lg bg-[#F2C94C] text-[#1D6F6B] hover:opacity-90 transition"
          >
            <FaEdit />
          </button>
        </div>
      </div>

      <p className="mb-8 text-[#1D6F6B]/80">{filiere.description || "—"}</p>

      {/* TABLE DES NIVEAUX ET GROUPES */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-[#30B2AC]">
        <table className="min-w-full text-left">
          <thead className="bg-[#30B2AC] text-white">
            <tr>
              <th className="px-6 py-3">Niveau</th>
              <th className="px-6 py-3">Groupes</th>
            </tr>
          </thead>
          <tbody>
            {filiere.niveaux.map((niveau) => (
              <tr key={niveau.id} className="border-t border-[#DFF6F5] hover:bg-[#DFF6F5] transition">
                <td className="px-6 py-4 font-semibold text-[#1D6F6B]">{niveau.nom}</td>
                <td className="px-6 py-4 text-[#1D6F6B]/80">
                  {niveau.groupes.map((g) => g.nom).join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FiliereDetails;
