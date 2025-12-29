import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getModuleById} from "@/services/modules";
import type { ModuleType } from "@/services/modules";
import { FiArrowLeft, FiLayers, FiCalendar, FiClock, FiEdit3, FiInfo } from 'react-icons/fi';

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

  /* ================= UI ================= */

  return (
  <div className="p-4 bg-[#DFF6F5] min-h-screen font-sans">
    <div className="max-w-4xl mx-auto">
      
      {/* BOUTON RETOUR RAPIDE */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-[#1D6F6B] font-medium mb-6 hover:translate-x-[-4px] transition-all"
      >
        <FiArrowLeft /> Retour au modules
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-[#7ED4D1] overflow-hidden">
        
        {/* BANNIÈRE DE TITRE */}
        <div className="bg-[#30B2AC] p-2 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {module.nom}
                      </span>
                      <h1 className="text-3xl font-bold mt-2">{module.nom}</h1>
                    </div>
                    <FiLayers size={40} className="opacity-20" />
                  </div>
                </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLONNE GAUCHE : DESCRIPTION */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                <FiInfo className="text-[#30B2AC]" /> Synopsis du module
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {module.description || "Aucune description détaillée n'est disponible pour ce module pour le moment."}
              </p>
            </div>

            {/* GRILLE D'INFOS SECONDAIRES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-[#F2FBFB] rounded-xl border border-[#7ED4D1]/30">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <FiLayers className="text-[#30B2AC]" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Niveau</p>
                  <p className="text-[#1D6F6B] font-bold">Niveau {module.niveauId}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#F2FBFB] rounded-xl border border-[#7ED4D1]/30">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                  <FiCalendar className="text-[#30B2AC]" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Créé le</p>
                  <p className="text-[#1D6F6B] font-semibold">
                    {new Date(module.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : STATISTIQUES  ACTIONS */}
          <div className="bg-gray-50 p-2 rounded-2xl border border-gray-100 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Historique</h3>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <FiClock size={16} />
                  <span>Mis à jour : {new Date(module.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="h-[2px] bg-gradient-to-r from-transparent via-[#7ED4D1] to-transparent"></div>
              
              <p className="text-xs text-center text-gray-400">
                ID Unique du module : <span className="font-mono">#MOD-{module.id}</span>
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <button 
                onClick={() => navigate(`/modules/update/${module.id}`)}
                className="w-full flex items-center justify-center gap-2 bg-[#30B2AC] text-white py-3 rounded-xl font-bold hover:bg-[#1D6F6B] shadow-lg hover:shadow-[#30B2AC]/40 transition-all active:scale-95"
              >
                <FiEdit3 /> Modifier les infos
              </button>
              
              <button 
                onClick={() => navigate(-1)}
                className="w-full py-3 rounded-xl text-[#1D6F6B] font-bold border-2 border-[#7ED4D1] hover:bg-white transition-all"
              >
                Retour
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);
}
