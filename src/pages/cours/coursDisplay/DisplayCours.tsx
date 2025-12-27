import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoursById } from "@/services/cours";
import { FiArrowLeft, FiCalendar, FiUser, FiMapPin, FiBookOpen, FiEdit3, FiClock } from 'react-icons/fi';

/* ================= TYPES ================= */

type ModuleType = {
  id: number;
  nom: string;
};

type CoursDetailsType = {
  id: number;
  titre: string;
  description?: string | null;
  dateDebut: string;
  dateFin: string;
  module?: ModuleType;
};

/* ================= COMPONENT ================= */

export default function CoursDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [cours, setCours] = useState<CoursDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH COURS ================= */
  useEffect(() => {
    const fetchCours = async () => {
      try {
        if (!id) return;

        const response = await getCoursById(Number(id));
        console.log("Cours API :", response.data); // 🔍 utile pour debug

        setCours(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du cours :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCours();
  }, [id]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="p-6 bg-[#DFF6F5] min-h-screen flex justify-center items-center">
        <p className="text-[#1D6F6B] font-medium">Chargement...</p>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!cours) {
    return (
      <div className="p-6 bg-[#DFF6F5] min-h-screen flex justify-center items-center">
        <p className="text-red-500">Cours introuvable</p>
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
  <div className="p-4 bg-[#DFF6F5] min-h-screen font-sans">
    <div className="max-w-4xl mx-auto">
      
      {/* BOUTON RETOUR RAPIDE */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-[#1D6F6B] font-medium mb-6 hover:underline transition-all"
      >
        <FiArrowLeft /> Retour au cours
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-[#7ED4D1] overflow-hidden">
        
        {/* BANNIÈRE DE TITRE */}
        <div className="bg-[#30B2AC] p-2 text-white">
          <div className="flex justify-between items-start">
            <div>
              <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {cours.module?.nom || "Cours"}
              </span>
              <h1 className="text-3xl font-bold mt-2">{cours.titre}</h1>
            </div>
            <FiBookOpen size={40} className="opacity-20" />
          </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLONNE GAUCHE : DESCRIPTION & INFOS */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Description du cours</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {cours.description && cours.description.trim() !== ""
                  ? cours.description
                  : "Aucune description détaillée n'a été fournie pour ce cours."}
              </p>
            </div>

            {/* GRILLE D'INFOS CLÉS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-4 bg-[#F2FBFB] rounded-xl border border-[#7ED4D1]/30">
                <FiUser className="text-[#30B2AC]" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Enseignant</p>
                  <p className="text-[#1D6F6B] font-semibold">MARJANI Abdelatif</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#F2FBFB] rounded-xl border border-[#7ED4D1]/30">
                <FiMapPin className="text-[#30B2AC]" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Salle</p>
                  <p className="text-[#1D6F6B] font-semibold">Salle 102 (Bâtiment B)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#F2FBFB] rounded-xl border border-[#7ED4D1]/30">
                <FiCalendar className="text-[#30B2AC]" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Date du cours</p>
                  <p className="text-[#1D6F6B] font-semibold">
                    {new Date(cours.dateDebut).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#F2FBFB] rounded-xl border border-[#7ED4D1]/30">
                <FiClock className="text-[#30B2AC]" size={20} />
                <div>
                  <p className="text-xs text-gray-500 font-medium">Horaires</p>
                  <p className="text-[#1D6F6B] font-semibold text-sm">
                    {new Date(cours.dateDebut).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(cours.dateFin).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : STATUT & ACTIONS */}
          <div className="bg-gray-50 p-2 rounded-2xl border border-gray-100 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Statut</h3>
              <div className="flex items-center gap-2 mb-6">
                <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[#1D6F6B] font-bold">Programmée</span>
              </div>
              
              <div className="p-4 bg-white rounded-xl border border-[#7ED4D1]/50 text-center">
                <p className="text-xs text-gray-500 mb-1">Module</p>
                <p className="text-[#1D6F6B] font-bold">{cours.module?.nom || "N/A"}</p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              <button 
                onClick={() => navigate(`/Cours/update/${cours.id}`)}
                className="w-full flex items-center justify-center gap-2 bg-[#30B2AC] text-white py-3 rounded-lg font-bold hover:bg-[#1D6F6B] shadow-lg hover:shadow-[#30B2AC]/40 transition-all active:scale-95"
              >
                <FiEdit3 /> Modifier le cours
              </button>
              
              <button 
                onClick={() => navigate(-1)}
                className="w-full flex items-center justify-center gap-2 border-2 border-[#7ED4D1] text-[#1D6F6B] py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
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
