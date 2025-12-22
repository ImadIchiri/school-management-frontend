import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid, FiList } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { getCours,createCours } from "@/services/cours"; // Assure-toi que le chemin est correct

type CoursAttributesTypes = {
  id: number;
  titre: string;
  description?: string;
  dateDebut: string; // string car récupéré du serveur
  dateFin: string;
  moduleId: number;
  enseignantId?: number;
  salleId?: number;
};
type CreateCours = {
  titre: string;
  description?: string;
  dateDebut: string;
  dateFin: string;
  moduleId: number;
  enseignantId?: number;
  salleId?: number;
};

export default function CoursStyle() {
  const [view, setView] = useState<"grid" | "list">("list");
  const [showModal, setShowModal] = useState(false);
  const [cours, setCours] = useState<CoursAttributesTypes[]>([]);
  const [newCours, setNewCours] = useState<CreateCours>({
  titre: "",
  description: "",
  dateDebut: "",
  dateFin: "",
  moduleId: 0,
  enseignantId: 0,
  salleId: 0,
});

const navigate = useNavigate();
const handleCreateCours = async () => {
  try {
    const response = await createCours(newCours);

    // Mettre à jour la liste sans recharger
    setCours([...cours, response.data]);

    // Fermer le modal
    setShowModal(false);

    // Reset formulaire
    setNewCours({
      titre: "",
      description: "",
      dateDebut: "",
      dateFin: "",
      moduleId: 0,
      enseignantId: 0,
      salleId: 0,
    });
  } catch (error) {
    console.error("Erreur lors de la création du cours :", error);
  }
};

  // ===== Récupération des cours =====
  useEffect(() => {
    const fetchCours = async () => {
      try {
        const response = await getCours();
        setCours(response.data); // Assure-toi que ton API renvoie bien un tableau
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
      }
    };
    fetchCours();
  }, []);

  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen font-sans">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#1D6F6B]">Cours</h1>
        <div className="flex items-center gap-3">
          {/* Toggle Grid / List */}
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7ED4D1] text-[#1D6F6B] hover:bg-[#279D99] hover:text-white transition-all"
            title={view === "grid" ? "Vue liste" : "Vue grille"}
          >
            {view === "grid" ? <FiList size={20} /> : <FiGrid size={20} />}
          </button>
          {/* Supprimer */}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7ED4D1] text-[#1D6F6B] hover:bg-[#279D99] hover:text-white transition-all" > 
            <MdDelete className="text-2xl" /> </button>
          {/* Create */}
          <button
            onClick={() => setShowModal(true)}
            className="h-10 px-4 rounded-lg bg-[#30B2AC] text-white hover:bg-[#1D6F6B]"
          >
            + Create
          </button>
        </div>
      </div>

      {/* ===== GRID VIEW ===== */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cours.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-[#7ED4D1] shadow p-4">
              <h3 className="text-lg font-semibold text-[#1D6F6B]">{c.titre}</h3>
              <p className="text-sm text-gray-600 mt-1">{c.description || "Pas de description"}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => navigate(`/Cours/display/${c.id}`)}
                  className="px-3 py-1 rounded bg-[#30B2AC] text-white"
                >
                  Display
                </button>
                <button
                  onClick={() => navigate(`/Cours/update/${c.id}`)}
                  className="px-3 py-1 rounded bg-[#279D99] text-white"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== LIST VIEW ===== */}
      {view === "list" && (
        <div className="bg-white rounded-xl shadow border border-[#7ED4D1]">
          {cours.map((c) => (
            <div key={c.id} className="flex justify-between items-center p-4 border-b">
              <span className="font-medium text-[#1D6F6B]">{c.titre}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/Cours/display/${c.id}`)}
                  className="px-3 py-1 rounded bg-[#30B2AC] text-white"
                >
                  Display
                </button>
                <button
                  onClick={() => navigate(`/Cours/update/${c.id}`)}
                  className="px-3 py-1 rounded bg-[#279D99] text-white"
                >
                  Update
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== MODAL CREATE ===== */}
      {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative border border-[#7ED4D1] shadow-2xl mx-4">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[#1D6F6B]">
          Créer nouveau Cours
        </h3>
        <button
          onClick={() => setShowModal(false)}
          className="text-[#30B2AC] text-2xl font-bold"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Titre */}
        <div>
          <label className="text-sm font-semibold text-[#1D6F6B]">
            Titre du cours
          </label>
          <input
            type="text"
            value={newCours.titre}
            onChange={(e) =>
              setNewCours({ ...newCours, titre: e.target.value })
            }
            className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
          />
        </div>

        {/* Module */}
        <div>
          <label className="text-sm font-semibold text-[#1D6F6B]">
            Module
          </label>
          <select
            value={newCours.moduleId}
            onChange={(e) =>
              setNewCours({ ...newCours, moduleId: Number(e.target.value) })
            }
            className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
          >
            <option value={0}>Choisir le module</option>
            <option value={1}>Module 1</option>
            <option value={2}>Module 2</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-[#1D6F6B]">
            Description
          </label>
          <textarea
            rows={4}
            value={newCours.description}
            onChange={(e) =>
              setNewCours({ ...newCours, description: e.target.value })
            }
            className="w-full border border-[#7ED4D1] rounded-lg px-4 py-2"
          />
        </div>

        {/* Date début */}
        <div>
          <label className="text-sm font-semibold text-[#1D6F6B]">
            Date début
          </label>
          <input
            type="date"
            value={newCours.dateDebut}
            onChange={(e) =>
              setNewCours({ ...newCours, dateDebut: e.target.value })
            }
            className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
          />
        </div>

        {/* Date fin */}
        <div>
          <label className="text-sm font-semibold text-[#1D6F6B]">
            Date fin
          </label>
          <input
            type="date"
            value={newCours.dateFin}
            onChange={(e) =>
              setNewCours({ ...newCours, dateFin: e.target.value })
            }
            className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() => setShowModal(false)}
          className="border-2 border-[#7ED4D1] px-6 py-2 rounded-lg"
        >
          Annuler
        </button>
        <button
          onClick={handleCreateCours}
          className="bg-[#30B2AC] text-white px-6 py-2 rounded-lg"
        >
          Ajouter
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
