import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid, FiList } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { getModules, createModule } from "@/services/modules";
import type { ModuleType, CreateModule } from "@/services/modules";

export default function ModuleStyle() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showModal, setShowModal] = useState(false);
  const [modules, setModules] = useState<ModuleType[]>([]);
  const navigate = useNavigate();

  const [newModule, setNewModule] = useState<CreateModule>({
    nom: "",
    description: "",
    niveauId: 0,
  });

  /* ===== GET ALL MODULES ===== */
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await getModules();
        setModules(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Erreur récupération modules :", error);
      }
    };
    fetchModules();
  }, []);

  /* ===== CREATE MODULE ===== */
  const handleCreateModule = async () => {
    try {
      const res = await createModule(newModule);
      setModules((prev) => [...prev, res.data]);
      setShowModal(false);
      setNewModule({ nom: "", description: "", niveauId: 0 });
    } catch (error) {
      console.error("Erreur création module :", error);
    }
  };

  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen font-sans">

      {/* ===== HEADER ===== */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#1D6F6B]">Modules</h1>

        <div className="flex items-center gap-3">

          {/* Toggle Grid / List */}
          
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7ED4D1] text-[#1D6F6B] hover:bg-[#279D99] hover:text-white transition-all"
            title={view === "grid" ? "Vue liste" : "Vue grille"}
          >
            {view === "grid" ? <FiList size={20} /> : <FiGrid size={20} />}
          </button>

          {/* Delete */}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7ED4D1] text-[#1D6F6B] hover:bg-[#279D99] hover:text-white transition-all">
            <MdDelete className="text-2xl" />
          </button>

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
          {modules.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-[#7ED4D1] shadow p-4 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-lg font-semibold text-[#1D6F6B]">{m.nom}</h3>
                <p className="text-sm text-gray-600 mt-1">{m.description || "Pas de description"}</p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button className="px-3 py-1 rounded bg-[#30B2AC] text-white">Display</button>
                <button className="px-3 py-1 rounded bg-[#279D99] text-white">Update</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== LIST VIEW ===== */}
      {view === "list" && (
        <div className="bg-white rounded-xl shadow border border-[#7ED4D1]">
          {modules.map((m) => (
            <div key={m.id} className="flex justify-between items-center p-4 border-b">
              <span className="font-medium text-[#1D6F6B]">{m.nom}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/Modules/display/${m.id}`)}
                  className="px-3 py-1 rounded bg-[#30B2AC] text-white"
                >
                  Display
                </button>
                
                <button
                  onClick={() => navigate(`/Module/update/${m.id}`)}
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
              <h3 className="text-xl font-semibold text-[#1D6F6B]">Créer nouveau Module</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#30B2AC] text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nom */}
              <div>
                <label className="text-sm font-semibold text-[#1D6F6B]">Nom du module</label>
                <input
                  type="text"
                  value={newModule.nom}
                  onChange={(e) => setNewModule({ ...newModule, nom: e.target.value })}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
                />
              </div>

              {/* Niveau */}
              <div>
                <label className="text-sm font-semibold text-[#1D6F6B]">Niveau</label>
                <select
                  value={newModule.niveauId}
                  onChange={(e) => setNewModule({ ...newModule, niveauId: Number(e.target.value) })}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
                >
                  <option value={0}>Choisir le niveau</option>
                  <option value={1}>Niveau 1</option>
                  <option value={2}>Niveau 2</option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-[#1D6F6B]">Description</label>
                <textarea
                  rows={4}
                  value={newModule.description}
                  onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                  className="w-full border border-[#7ED4D1] rounded-lg px-4 py-2"
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
                onClick={handleCreateModule}
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
