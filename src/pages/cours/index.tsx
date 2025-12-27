import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid, FiList, FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { getCours, createCours, deleteCours } from "@/services/cours";
import { getModules } from "@/services/modules";

/* ================= TYPES ================= */

type CoursAttributesTypes = {
  id: number;
  titre: string;
  description?: string;
  dateDebut: string;
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

type ModuleType = {
  id: number;
  nom: string;
};

/* ================= COMPONENT ================= */

export default function Cours() {
  const navigate = useNavigate();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [showModal, setShowModal] = useState(false);
  const [cours, setCours] = useState<CoursAttributesTypes[]>([]);
  const [modules, setModules] = useState<ModuleType[]>([]);

  const [newCours, setNewCours] = useState<CreateCours>({
    titre: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    moduleId: 0,
    enseignantId: undefined,
    salleId: undefined,
  });

  // === CONFIRM DELETE MODAL STATE ===
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
  /* ================= FETCH COURS ================= */
  useEffect(() => {
    const fetchCours = async () => {
      try {
        const res = await getCours();
        setCours(res.data);
      } catch (error) {
        console.error("Erreur récupération cours :", error);
        showPopup("Erreur lors du chargement des cours");
      }
    };
    fetchCours();
  }, []);

  /* ================= FETCH MODULES ================= */
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await getModules();
        setModules(res.data);
      } catch (error) {
        console.error("Erreur récupération modules :", error);
        showPopup("Erreur lors du chargement des modules");
      }
    };
    fetchModules();
  }, []);

  /* ================= CREATE COURS ================= */
  const handleCreateCours = async () => {
    if (!newCours.titre || !newCours.dateDebut || !newCours.dateFin || !newCours.moduleId) {
      showPopup("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const payload = {
        titre: newCours.titre,
        description: newCours.description,
        dateDebut: newCours.dateDebut,
        dateFin: newCours.dateFin,
        moduleId: newCours.moduleId,
        ...(newCours.enseignantId && { enseignantId: newCours.enseignantId }),
        ...(newCours.salleId && { salleId: newCours.salleId }),
      };

      const res = await createCours(payload);

      setCours((prev) => [...prev, res.data]);
      setShowModal(false);

      setNewCours({
        titre: "",
        description: "",
        dateDebut: "",
        dateFin: "",
        moduleId: 0,
        enseignantId: undefined,
        salleId: undefined,
      });

      showPopup("Cours ajouté avec succès");
    } catch (error) {
      console.error("Erreur création cours :", error);
      showPopup("Erreur lors de la création du cours");
    }
  };

  /* ================= DELETE COURS CONFIRMED ================= */
  const deleteCoursConfirmed = async (id: number) => {
    try {
      await deleteCours(id);
      setCours((prev) => prev.filter((c) => c.id !== id));
      setConfirmDelete({ open: false, id: null });
      showPopup("Cours supprimé avec succès");
    } catch (error) {
      console.error("Erreur suppression :", error);
      showPopup("Erreur lors de la suppression du cours");
    }
  };

  /* ================= RENDER ================= */
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
        <h1 className="text-2xl font-semibold text-[#1D6F6B]">Cours</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7ED4D1] text-[#1D6F6B]"
          >
            {view === "grid" ? <FiList size={20} /> : <FiGrid size={20} />}
          </button>

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
          {cours.map((c) => (
            <div
              key={c.id}
              className="group bg-white rounded-xl border border-[#7ED4D1] p-4 shadow relative"
            >
              <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition">
                <FiEye
                  onClick={() => navigate(`/Cours/display/${c.id}`)}
                  className="cursor-pointer hover:scale-125"
                />
              </button>

              <h3 className="text-lg font-semibold text-[#1D6F6B]">{c.titre}</h3>
              <p className="text-sm text-gray-600 mt-1">{c.description || "Pas de description"}</p>

              <div className="flex justify-end gap-2 mt-4">
                <FiEdit
                  onClick={() => navigate(`/Cours/update/${c.id}`)}
                  className="text-blue-600 cursor-pointer hover:scale-125"
                />
                <FiTrash
                  onClick={() => setConfirmDelete({ open: true, id: c.id })}
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
                <th className="p-3 text-left">Titre</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Date début</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cours.map((c) => (
                <tr key={c.id} className="border-t hover:bg-[#F2FBFB] transition group">
                  <td className="p-4">{c.titre}</td>
                  <td className="p-4">{c.description || "—"}</td>
                  <td className="p-4">{new Date(c.dateDebut).toLocaleDateString()}</td>
                  <td className="p-4 relative">
                    <div className="flex justify-end gap-3">
                      <FiEye
                        onClick={() => navigate(`/Cours/display/${c.id}`)}
                        className="cursor-pointer hover:scale-125 opacity-0 group-hover:opacity-100 transition"
                      />
                      <FiEdit
                        onClick={() => navigate(`/Cours/update/${c.id}`)}
                        className="text-blue-600 cursor-pointer hover:scale-125"
                      />
                      <FiTrash
                        onClick={() => setConfirmDelete({ open: true, id: c.id })}
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

     {/* MODAL CREATE COURS */}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-xl w-full max-w-3xl p-8 border border-[#7ED4D1] shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-[#1D6F6B]">Créer nouveau cours</h3>
        <button 
          onClick={() => setShowModal(false)} 
          className="text-[#30B2AC] hover:text-red-500 text-2xl font-bold transition-colors"
        >
          ✕
        </button>
      </div>

      {/* FORMULAIRE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Titre */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Titre du cours</label>
          <input 
            type="text"
            placeholder="Ex: Algorithmique avancée" 
            value={newCours.titre} 
            onChange={(e) => setNewCours({ ...newCours, titre: e.target.value })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all" 
          />
        </div>

        {/* Module */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Module associé</label>
          <select 
            value={newCours.moduleId} 
            onChange={(e) => setNewCours({ ...newCours, moduleId: Number(e.target.value) })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all"
          >
            <option value={0}>Choisir un module</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>{m.nom}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Description</label>
          <textarea 
            placeholder="Objectifs du cours, prérequis..." 
            value={newCours.description} 
            onChange={(e) => setNewCours({ ...newCours, description: e.target.value })}
            rows={3} 
            className="border border-[#7ED4D1] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#30B2AC] outline-none resize-none transition-all" 
          />
        </div>

        {/* Enseignant */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Enseignant</label>
          <select className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all">
            <option value="">Sélectionner l'enseignant</option>
            <option value="2">MARJANI Abdelatif</option>
            <option value="3">NADIR Hamza</option>
            <option value="4">BOUKOUCH Hassan</option>
          </select>
        </div>

        {/* Salle */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Salle de classe</label>
          <select className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all">
            <option value="">Choisir la salle</option>
            <option value="1">Salle 1</option>
            <option value="2">Salle 2</option>
            <option value="3">Salle 3</option>
          </select>
        </div>

        {/* Date Début */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Date et heure de début</label>
          <input 
            type="datetime-local" 
            value={newCours.dateDebut} 
            onChange={(e) => setNewCours({ ...newCours, dateDebut: e.target.value })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all" 
          />
        </div>

        {/* Date Fin */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Date et heure de fin</label>
          <input 
            type="datetime-local" 
            value={newCours.dateFin} 
            onChange={(e) => setNewCours({ ...newCours, dateFin: e.target.value })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all" 
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
          onClick={handleCreateCours} 
          className="bg-[#30B2AC] text-white px-8 py-2 rounded-xl font-bold hover:bg-[#1D6F6B] shadow-lg hover:shadow-[#30B2AC]/40 transition-all active:scale-95"
        >
          Ajouter le cours
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
            <p className="mb-6">Voulez-vous vraiment supprimer ce cours ?</p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (confirmDelete.id !== null) deleteCoursConfirmed(confirmDelete.id);
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
