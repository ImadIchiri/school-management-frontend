import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRessourceById } from "@/services/ressources";
import { FiCalendar, FiUser, FiFileText, FiArrowLeft, FiEdit3, FiDownload } from "react-icons/fi";

type RessourceType = {
  id: number;
  titre: string;
  description: string;
  url: string;
  uploadedAt: string;
  uploadedById: number;
  typeId: number;
};

export default function RessourceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ressource, setRessource] = useState<RessourceType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (id) {
          const res = await getRessourceById(Number(id));
          setRessource(res.data);
        }
      } catch (error) {
        console.error("Erreur details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const typeMapping: { [key: number]: string } = { 1: "PDF", 2: "IMAGE", 3: "VIDEO" };
  const userMapping: { [key: number]: string } = { 
    2: "MARJANI Abdelatif", 
    3: "NADIR Hamza", 
    4: "BOUKOUCH Hassan" 
  };

  if (loading) return <div className="p-6 text-center text-[#1D6F6B]">Chargement des détails...</div>;
  if (!ressource) return <div className="p-6 text-center">Ressource introuvable.</div>;

  return (
    <div className="p-4 bg-[#DFF6F5] min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* BOUTON RETOUR RAPIDE */}
        <button 
          onClick={() => navigate("/ressources")} 
          className="flex items-center gap-2 text-[#1D6F6B] font-medium mb-6 hover:underline"
        >
          <FiArrowLeft /> Retour au ressources
        </button>

        <div className="bg-white rounded-2xl shadow-xl border border-[#7ED4D1] overflow-hidden">
          
          {/* BANNIÈRE DE TITRE */}
          <div className="bg-[#30B2AC] p-1 text-white">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {typeMapping[ressource.typeId] || "Document"}
                </span>
                <h1 className="text-3xl font-bold mt-2">{ressource.titre}</h1>
              </div>
              <FiFileText size={40} className="opacity-20" />
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* COLONNE GAUCHE : INFOS */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {ressource.description || "Aucune description fournie pour cette ressource."}
                </p>
              </div>

              {/* GRILLE D'INFOS SECONDAIRES */}
              <div className="grid grid-cols-2 gap-2 pt-4">
                <div className="flex items-center gap-3 p-4 bg-[#F2FBFB] rounded-xl border border-[#7ED4D1]/30">
                  <FiUser className="text-[#30B2AC]" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Ajouté par</p>
                    <p className="text-[#1D6F6B] font-semibold">{userMapping[ressource.uploadedById] || "Inconnu"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[#F2FBFB] rounded-xl border border-[#7ED4D1]/30">
                  <FiCalendar className="text-[#30B2AC]" size={20} />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Date d'upload</p>
                    <p className="text-[#1D6F6B] font-semibold">
                      {ressource.uploadedAt ? new Date(ressource.uploadedAt).toLocaleDateString() : "Non spécifiée"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* COLONNE DROITE : ACTIONS & FICHIER */}
            <div className="bg-gray-50 p-2 rounded-2xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Fichier joint</h3>
                <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl border border-dashed border-[#30B2AC]">
                  <FiFileText size={48} className="text-[#30B2AC] mb-2" />
                  <p className="text-xs text-gray-500 truncate w-full mb-4">
                    {ressource.url.split('/').pop()}
                  </p>
                  <a 
                    href={ressource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-[#30B2AC] text-white py-2 rounded-lg font-bold hover:bg-[#1D6F6B] transition-colors"
                  >
                    <FiDownload /> Voir / Télécharger
                  </a>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button 
                  onClick={() => navigate(`/ressources/update/${id}`)}
                  className="w-full flex items-center justify-center gap-2 border-2 border-[#30B2AC] text-[#30B2AC] py-2 rounded-lg font-bold hover:bg-[#30B2AC] hover:text-white transition-all"
                >
                  <FiEdit3 /> Modifier
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}