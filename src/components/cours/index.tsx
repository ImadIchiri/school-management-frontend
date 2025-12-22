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

export default function CoursStyle() {
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
    enseignantId: 0,
    salleId: 0,
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
      } catch (error) {
        console.error("Erreur récupération modules :", error);
      }
    };
    fetchModules();
  }, []);

  /* ================= CREATE COURS ================= */

  const handleCreateCours = async () => {
    if (!newCours.titre || !newCours.moduleId) return;

    try {
      const res = await createCours(newCours);

      setCours([...cours, res.data]);
      setShowModal(false);

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
      console.error("Erreur création cours :", error);
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen font-sans">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#1D6F6B]">Cours</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7ED4D1] hover:bg-[#279D99] text-[#1D6F6B] hover:text-white"
          >
            {view === "grid" ? <FiList /> : <FiGrid />}
          </button>

          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7ED4D1] hover:bg-[#279D99]">
            <MdDelete />
          </button>

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
            <div
              key={c.id}
              className="bg-white rounded-xl border border-[#7ED4D1] p-4 shadow"
            >
              <h3 className="text-lg font-semibold text-[#1D6F6B]">
                {c.titre}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {c.description || "Pas de description"}
              </p>

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
            <div
              key={c.id}
              className="flex justify-between items-center p-4 border-b"
            >
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">

            <h3 className="text-xl font-semibold text-[#1D6F6B] mb-4">
              Créer nouveau cours
            </h3>
            
            <button
                onClick={() => setShowModal(false)}
                className="text-[#30B2AC] text-2xl font-bold"
              >
                ✕
              </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                placeholder="Titre"
                value={newCours.titre}
                onChange={(e) =>
                  setNewCours({ ...newCours, titre: e.target.value })
                }
                className="border p-3 rounded"
              />

              <select
                value={newCours.moduleId}
                onChange={(e) =>
                  setNewCours({
                    ...newCours,
                    moduleId: Number(e.target.value),
                  })
                }
                className="border p-3 rounded"
              >
                <option value={0}>Choisir un module</option>
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nom}
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={newCours.dateDebut}
                onChange={(e) =>
                  setNewCours({ ...newCours, dateDebut: e.target.value })
                }
                className="border p-3 rounded"
              />

              <input
                type="date"
                value={newCours.dateFin}
                onChange={(e) =>
                  setNewCours({ ...newCours, dateFin: e.target.value })
                }
                className="border p-3 rounded"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="border px-5 py-2 rounded"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateCours}
                className="bg-[#30B2AC] text-white px-5 py-2 rounded"
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
