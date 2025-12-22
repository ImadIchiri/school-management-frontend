import { useState } from "react";
import { useGroupes, type Groupe } from "@/components/groupes";
import ModalGroupe from "@/components/groupes/ModalGroupe";

import { FaEdit, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { FiGrid, FiList } from "react-icons/fi";

const GroupesDisplay = () => {
  /* ================= STATES ================= */
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedGroupe, setSelectedGroupe] = useState<Groupe | null>(null);

  const [createErrors, setCreateErrors] = useState<Record<string, string>>({});
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});

  const [currentGroupe, setCurrentGroupe] = useState<Groupe>({
    id: 0,
    nom: "",
    niveauId: 0,
  });

  const [newGroupe, setNewGroupe] = useState<Omit<Groupe, "id">>({
    nom: "",
    niveauId: 0,
  });

  /* ================= DATA ================= */
  const {
    groupes,
    loading,
    createGroupe,
    updateGroupe,
    deleteGroupe,
  } = useGroupes();

  /* ================= CREATE ================= */
  const handleCreate = () => {
    const errors: Record<string, string> = {};

    if (!newGroupe.nom.trim()) {
      errors.nom = "Le nom du groupe est obligatoire";
    }

    if (!newGroupe.niveauId || newGroupe.niveauId === 0) {
      errors.niveauId = "Le niveau est obligatoire";
    }

    if (Object.keys(errors).length > 0) {
      setCreateErrors(errors);
      return;
    }

    createGroupe(newGroupe);
    setShowCreate(false);
    setCreateErrors({});
    setNewGroupe({ nom: "", niveauId: 0 });
  };

  /* ================= EDIT ================= */
  const handleEdit = () => {
    const errors: Record<string, string> = {};

    if (!currentGroupe.nom.trim()) {
      errors.nom = "Le nom du groupe est obligatoire";
    }

    if (!currentGroupe.niveauId || currentGroupe.niveauId === 0) {
      errors.niveauId = "Le niveau est obligatoire";
    }

    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    updateGroupe(currentGroupe.id, currentGroupe);
    setShowEdit(false);
    setEditErrors({});
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <p className="text-center mt-10 text-[#1D6F6B] font-medium">
        Chargement...
      </p>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="p-8 min-h-screen bg-[#DFF6F5]">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-[#1D6F6B]">Groupes</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="w-10 h-10 flex items-center justify-center rounded-lg
                       bg-[#7ED4D1] text-[#1D6F6B]"
          >
            {view === "grid" ? <FiList /> : <FiGrid />}
          </button>

          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl
                       bg-[#30B2AC] text-white font-semibold"
          >
            <FaPlus /> Créer
          </button>
        </div>
      </div>

      {/* GRID */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {groupes.map((g) => (
            <div key={g.id} className="bg-white p-6 rounded-xl shadow">
              <h2 className="font-bold text-lg">{g.nom}</h2>
              <p className="text-sm text-gray-500">
                Niveau ID : {g.niveauId}
              </p>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setSelectedGroupe(g)}>
                  <FaEye />
                </button>
                <button
                  onClick={() => {
                    setCurrentGroupe(g);
                    setShowEdit(true);
                  }}
                >
                  <FaEdit />
                </button>
                <button onClick={() => deleteGroupe(g.id)}>
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST */}
      {view === "list" && (
        <table className="w-full bg-white rounded-xl overflow-hidden shadow">
          <thead className="bg-[#30B2AC] text-white">
            <tr>
              <th className="p-4 text-left">Nom</th>
              <th className="p-4 text-left">Niveau</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groupes.map((g) => (
              <tr key={g.id} className="border-t">
                <td className="p-4">{g.nom}</td>
                <td className="p-4">{g.niveauId}</td>
                <td className="p-4 text-right">
                  <button onClick={() => setSelectedGroupe(g)}>
                    <FaEye />
                  </button>
                  <button
                    onClick={() => {
                      setCurrentGroupe(g);
                      setShowEdit(true);
                    }}
                    className="mx-2"
                  >
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteGroupe(g.id)}>
                    <FaTrash className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MODALS */}
      {showCreate && (
        <ModalGroupe
          title="Créer un groupe"
          groupe={newGroupe}
          setGroupe={setNewGroupe}
          onConfirm={handleCreate}
          onClose={() => setShowCreate(false)}
          errors={createErrors}
        />
      )}

      {showEdit && (
        <ModalGroupe
          title="Modifier le groupe"
          groupe={currentGroupe}
          setGroupe={setCurrentGroupe}
          onConfirm={handleEdit}
          onClose={() => setShowEdit(false)}
          errors={editErrors}
        />
      )}
    </div>
  );
};

export default GroupesDisplay;
