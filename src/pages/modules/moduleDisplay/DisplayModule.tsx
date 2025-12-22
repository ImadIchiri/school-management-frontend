import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getModuleById} from "@/services/modules";
import type { ModuleType } from "@/services/modules";
export default function ModuleDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [module, setModule] = useState<ModuleType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModule = async () => {
      try {
        if (!id) return;
        const response = await getModuleById(Number(id));
        setModule(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du module :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <div className="p-6 bg-[#DFF6F5] min-h-screen flex justify-center items-center">
        <p className="text-[#1D6F6B] font-medium">Chargement...</p>
      </div>
    );
  }

  /* ===== MODULE NOT FOUND ===== */
  if (!module) {
    return (
      <div className="p-6 bg-[#DFF6F5] min-h-screen flex justify-center items-center">
        <p className="text-red-500">Module introuvable</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow border border-[#7ED4D1] p-6">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-[#1D6F6B] mb-4">
          {module.nom}
        </h1>

        {/* Description */}
        <p className="text-gray-700 mb-4">
          {module.description || "Aucune description disponible"}
        </p>

        {/* Informations */}
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>Niveau ID :</strong> {module.niveauId}
          </p>
          <p>
            <strong>Créé le :</strong>{" "}
            {new Date(module.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Mis à jour le :</strong>{" "}
            {new Date(module.updatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Boutons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg border border-[#7ED4D1] text-[#1D6F6B] hover:bg-[#DFF6F5] transition-all"
          >
            Retour
          </button>

          <button
            onClick={() => navigate(`/modules/update/${module.id}`)}
            className="px-4 py-2 rounded-lg bg-[#30B2AC] text-white hover:bg-[#279D99] transition-all"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
