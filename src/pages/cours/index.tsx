import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid, FiList } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { getCours, createCours } from "@/services/cours";
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
  const [enseignants] = useState<ModuleType[]>([]);
  const [salles] = useState<ModuleType[]>([]);

  const [newCours, setNewCours] = useState<CreateCours>({
    titre: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    moduleId: 0,
    enseignantId: undefined,
    salleId: undefined,
  });

  /* ================= FETCH COURS ================= */
  useEffect(() => {
    const fetchCours = async () => {
      try {
        const res = await getCours();
        setCours(res.data);
      } catch (error) {
        console.error("Erreur récupération cours :", error);
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
        // Ici tu peux fetch enseignants et salles si nécessaire
        // setEnseignants(...)
        // setSalles(...)
      } catch (error) {
        console.error("Erreur récupération modules :", error);
      }
    };
    fetchModules();
  }, []);

  /* ================= CREATE COURS ================= */
  const handleCreateCours = async () => {
    if (!newCours.titre || !newCours.dateDebut || !newCours.dateFin || !newCours.moduleId) {
      alert("Veuillez remplir tous les champs obligatoires");
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
    } catch (error) {
      console.error("Erreur création cours :", error);
      alert("Erreur lors de la création du cours");
    }
  };

  /* ================= RENDER ================= */
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
          {cours.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-[#7ED4D1] p-4 shadow">
              <h3 className="text-lg font-semibold text-[#1D6F6B]">{c.titre}</h3>
              <p className="text-sm text-gray-600 mt-1">{c.description || "Pas de description"}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => navigate(`/Cours/display/${c.id}`)} className="px-3 py-1 rounded bg-[#30B2AC] text-white">
                  Display
                </button>
                <button onClick={() => navigate(`/Cours/update/${c.id}`)} className="px-3 py-1 rounded bg-[#279D99] text-white">
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
                <button onClick={() => navigate(`/Cours/display/${c.id}`)} className="px-3 py-1 rounded bg-[#30B2AC] text-white">
                  Display
                </button>
                <button onClick={() => navigate(`/Cours/update/${c.id}`)} className="px-3 py-1 rounded bg-[#279D99] text-white">
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
              <h3 className="text-xl font-semibold text-[#1D6F6B]">Créer nouveau cours</h3>
              <button onClick={() => setShowModal(false)} className="text-[#30B2AC] text-2xl font-bold">✕</button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Titre */}
              <div>
                <label className="text-sm font-semibold text-[#1D6F6B]">Titre</label>
                <input
                  type="text"
                  placeholder="Entrer le titre..."
                  value={newCours.titre}
                  onChange={(e) => setNewCours({ ...newCours, titre: e.target.value })}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
                />
              </div>

              {/* Module */}
              <div>
                <label className="text-sm font-semibold text-[#1D6F6B]">Module</label>
                <select
                  value={newCours.moduleId}
                  onChange={(e) => setNewCours({ ...newCours, moduleId: Number(e.target.value) })}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
                >
                  <option value={0}>Choisir un module</option>
                  {modules.map((m) => (
                    <option key={m.id} value={m.id}>{m.nom}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-[#1D6F6B]">Description</label>
                <textarea
                  rows={4}
                  placeholder="Entrer la description..."
                  value={newCours.description}
                  onChange={(e) => setNewCours({ ...newCours, description: e.target.value })}
                  className="w-full border border-[#7ED4D1] rounded-lg px-4 py-2"
                />
              </div>

              {/* Enseignant */}
              <div>
                <label className="text-sm font-semibold text-[#1D6F6B]">Enseignant</label>
                <select
                  value={newCours.enseignantId || ""}
                  onChange={(e) => setNewCours({ ...newCours, enseignantId: Number(e.target.value) || undefined })}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
                >
                  <option value="">Choisir l'enseignant</option>
                  {enseignants.map((e) => (
                    <option key={e.id} value={e.id}>{e.nom}</option>
                  ))}
                </select>
              </div>

              {/* Salle */}
              <div>
                <label className="text-sm font-semibold text-[#1D6F6B]">Salle</label>
                <select
                  value={newCours.salleId || ""}
                  onChange={(e) => setNewCours({ ...newCours, salleId: Number(e.target.value) || undefined })}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
                >
                  <option value="">Choisir une salle</option>
                  {salles.map((s) => (
                    <option key={s.id} value={s.id}>{s.nom}</option>
                  ))}
                </select>
              </div>

              {/* Date début */}
              <div>
                <label className="text-sm font-semibold text-[#1D6F6B]">Date début</label>
                <input
                  type="date"
                  value={newCours.dateDebut}
                  onChange={(e) => setNewCours({ ...newCours, dateDebut: e.target.value })}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
                />
              </div>

              {/* Date fin */}
              <div>
                <label className="text-sm font-semibold text-[#1D6F6B]">Date fin</label>
                <input
                  type="date"
                  value={newCours.dateFin}
                  onChange={(e) => setNewCours({ ...newCours, dateFin: e.target.value })}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="border px-5 py-2 rounded">Annuler</button>
              <button onClick={handleCreateCours} className="bg-[#30B2AC] text-white px-5 py-2 rounded">Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
