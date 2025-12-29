import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid, FiList, FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { getModules, createModule, deleteModule } from "@/services/modules";
import type { ModuleType, CreateModule } from "@/services/modules";
import { getNiveaux } from "@/services/niveau";

 type Niveau= {
  id: number;
  anneeLabel: string;
  dateDebut: string;
  dateFin: string;
  filiereId: number;
}
export default function Module() {
  const navigate = useNavigate();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [showModal, setShowModal] = useState(false);
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [niveaux, setNiveaux] = useState<Niveau[]>([]);
  const [newModule, setNewModule] = useState<CreateModule>({
    nom: "",
    description: "",
    niveauId: 0,
  });

  /* ================= DELETE CONFIRM ================= */
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: number | null;
  }>({ open: false, id: null });

  {/*PopUp CREATE */}
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });
  const showPopup = (message: string, type: "success" | "error" = "success") => {
  setPopup({ message, type, visible: true });

  setTimeout(() => {
    setPopup((prev) => ({ ...prev, visible: false }));
  }, 3000);
};


  /* ===== FETCH MODULES ===== */
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await getModules();
        setModules(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Erreur récupération modules :", error);
        showPopup("Erreur lors du chargement des modules");
      }
    };
    fetchModules();
  }, []);
/* ===== FETCH Niveaux ===== */
  useEffect(() => {
    const fetchNiveaux = async () => {
      try {
        const res = await getNiveaux();
        setNiveaux(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Erreur récupération niveaux :", error);
        showPopup("Erreur lors du chargement des niveaux");
      }
    };
    fetchNiveaux();
  }, []);
  /* ===== CREATE MODULE ===== */
  const handleCreateModule = async () => {
    if (!newModule.nom || !newModule.niveauId) {
      showPopup("Veuillez remplir le nom et le niveau du module");
      return;
    }

    try {
      const res = await createModule(newModule);
      setModules((prev) => [...prev, res.data]);
      setShowModal(false);
      setNewModule({ nom: "", description: "", niveauId: 0 });

      showPopup("Module ajouté avec succès !", "success");
    } catch (error) {
      console.error("Erreur création module :", error);
      showPopup("Erreur lors de la création du module ❌", "error");
    }
  };

  /* ===== DELETE MODULE CONFIRMED ===== */
  const deleteModuleConfirmed = async (id: number) => {
    try {
      await deleteModule(id);
      setModules((prev) => prev.filter((m) => m.id !== id));
      setConfirmDelete({ open: false, id: null });
      showPopup("Module supprimé avec succès 🗑️", "success");
    } catch (error) {
      console.error("Erreur suppression module :", error);
      showPopup("Erreur lors de la suppression ❌", "error");
    }
  };

  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen font-sans">
      {/* ================= POPUP ================= */}
      {popup.visible && (
        <div className="fixed top-5 right-5 z-[999]">
          <div
            className={`px-6 py-4 rounded-xl shadow-lg text-white font-semibold
            ${popup.type === "success" ? "bg-[#30B2AC]" : "bg-red-500"}`}
          >
            {popup.message}
          </div>
        </div>
      )}
      {/* HEADER */}
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#1D6F6B]">Modules</h1>
        <div className="flex items-center gap-3">
          {/* Toggle Grid / List */}

          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7ED4D1] text-[#1D6F6B]">
            {view === "grid" ? <FiList size={20} /> : <FiGrid size={20} />}
          </button>

          {/* Create */}
          <button
            onClick={() => setShowModal(true)}
            className="h-10 px-4 rounded-lg bg-[#30B2AC] text-white"
          >
            + Ajouter
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((m) => (
            <div
              key={m.id}
              className="group bg-white rounded-xl border border-[#7ED4D1] p-4 shadow relative"
            >
              <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                <FiEye
                  onClick={() => navigate(`/Modules/display/${m.id}`)}
                  className="cursor-pointer hover:scale-125"
                />
              </button>

              <h3 className="text-lg font-semibold text-[#1D6F6B]">{m.nom}</h3>
              <p className="text-sm text-gray-600 mt-1">{m.description || "Pas de description"}</p>

              <div className="flex justify-end gap-2 mt-4">
                <FiEdit
                  onClick={() => navigate(`/Modules/update/${m.id}`)}
                  className="text-blue-600 cursor-pointer hover:scale-125"
                />
                <FiTrash
                  onClick={() => setConfirmDelete({ open: true, id: m.id })}
                  className="text-red-600 cursor-pointer hover:scale-125"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <div className="bg-white rounded-xl shadow border border-[#7ED4D1] overflow-x-auto">
          <table className="min-w-[700px] w-full bg-white rounded-xl">
            <thead className="bg-[#30B2AC] text-white">
              <tr>
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Niveau</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.id} className="border-t hover:bg-[#F2FBFB] transition group">
                  <td className="p-3">{m.nom}</td>
                  <td className="p-3">{m.description || "—"}</td>
                  <td className="p-3">{m.niveauId}</td>
                  <td className="p-4 relative">
                    <div className="flex justify-end gap-3">
                      <FiEye
                        onClick={() => navigate(`/Modules/display/${m.id}`)}
                        className="cursor-pointer hover:scale-125 opacity-0 group-hover:opacity-100 transition"
                      />
                      <FiEdit
                        onClick={() => navigate(`/Modules/update/${m.id}`)}
                        className="text-blue-600 cursor-pointer hover:scale-125"
                      />
                      <FiTrash
                        onClick={() => setConfirmDelete({ open: true, id: m.id })}
                        className="text-red-600 cursor-pointer hover:scale-125"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL CREATE MODULE */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-3xl p-8 border border-[#7ED4D1] shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
            
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-[#1D6F6B]">Créer nouveau Module</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-[#30B2AC] hover:text-red-500 text-2xl font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* FORMULAIRE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Nom du Module */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Nom du module</label>
                <input 
                  type="text"
                  placeholder="Ex: Développement Web" 
                  value={newModule.nom} 
                  onChange={(e) => setNewModule({ ...newModule, nom: e.target.value })}
                  className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all" 
                />
              </div>

              {/* Niveau */}
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Niveau scolaire</label>
                <select 
                  value={newModule.niveauId} 
                  onChange={(e) => setNewModule({ ...newModule, niveauId: Number(e.target.value) })}
                  className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all"
                >
                  <option value={0}>Choisir le niveau</option>
                  {niveaux.map((n)=> (
                    <option key={n.id} value={n.id}>{n.id}</option>
                  ))}
                  
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2 flex flex-col">
                <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Description du module</label>
                <textarea 
                  placeholder="Détails du programme, compétences visées..." 
                  value={newModule.description} 
                  onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                  rows={4} 
                  className="border border-[#7ED4D1] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#30B2AC] outline-none resize-none transition-all" 
                />
              </div>

            </div>

            {/* BOUTONS D'ACTION */}
            <div className="flex justify-end gap-4 mt-10">
              <button 
                onClick={() => setShowModal(false)} 
                className="border-2 border-[#7ED4D1] px-6 py-2 rounded-xl text-[#1D6F6B] font-bold hover:bg-gray-100 transition-all"
              >
                Annuler
              </button>
              <button 
                onClick={handleCreateModule} 
                className="bg-[#30B2AC] text-white px-8 py-2 rounded-xl font-bold hover:bg-[#1D6F6B] shadow-lg hover:shadow-[#30B2AC]/40 transition-all active:scale-95"
              >
                Créer le module
              </button>
            </div>

          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {confirmDelete.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h2 className="font-bold text-xl mb-4 text-[#1D6F6B]">Confirmer la suppression</h2>
            <p className="mb-6">Voulez-vous vraiment supprimer ce module ?</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (confirmDelete.id !== null) deleteModuleConfirmed(confirmDelete.id);
                }}
                className="cursor-pointer w-full bg-[#30B2AC] text-white py-2 rounded-xl"
              >
                Supprimer
              </button>
              <button
                onClick={() => setConfirmDelete({ open: false, id: null })}
                className="cursor-pointer w-full bg-gray-200 py-2 rounded-xl"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
