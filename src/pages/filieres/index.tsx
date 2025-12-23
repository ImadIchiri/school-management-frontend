import { useState } from "react";
// import { useFilieres, type Filiere } from "@/components/filieres";
import Modal from "@/components/filieres/Modal";

import { FaEdit, FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { FiGrid, FiList } from "react-icons/fi";

const FiliereDisplay = () => {
  const {
    filieres,
    loading,
    deleteFiliere,
    createFiliere,
    updateFiliere,
  } = useFilieres();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [createErrors, setCreateErrors] = useState<Record<string, string>>({});
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});

  const [currentFiliere, setCurrentFiliere] = useState<Filiere>({
    id: 0,
    nom: "",
    description: "",
  });

  const [newFiliere, setNewFiliere] = useState({
    nom: "",
    description: "",
  });

  const [selectedFiliere, setSelectedFiliere] = useState<Filiere | null>(null);

  /* ================= CREATE ================= */
  const handleCreate = () => {
    const errors: Record<string, string> = {};

    if (!newFiliere.nom.trim()) {
      errors.nom = "Le nom est obligatoire";
    }

    if (Object.keys(errors).length > 0) {
      setCreateErrors(errors);
      return;
    }

    createFiliere(newFiliere);
    setNewFiliere({ nom: "", description: "" });
    setCreateErrors({});
    setShowCreate(false);
  };

  /* ================= EDIT ================= */
  const handleEdit = () => {
    const errors: Record<string, string> = {};

    if (!currentFiliere.nom.trim()) {
      errors.nom = "Le nom est obligatoire";
    }

    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }

    updateFiliere(currentFiliere.id, {
      nom: currentFiliere.nom,
      description: currentFiliere.description,
    });

    setEditErrors({});
    setShowEdit(false);
  };

  if (loading) {
    return (
      <p className="text-center text-[#1D6F6B] font-medium mt-10">
        Chargement...
      </p>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-[#DFF6F5] relative">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="flex-1 text-center text-4xl font-bold text-[#1D6F6B]">
          Filières
        </h1>

        <div className="flex items-center gap-3">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filieres.map((f) => (
            <div key={f.id} className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-xl font-bold text-[#1D6F6B]">{f.nom}</h2>
              <p className="text-sm mb-4">{f.description || "—"}</p>

              <div className="flex justify-end gap-3">
                <button onClick={() => setSelectedFiliere(f)}>
                  <FaEye />
                </button>
                <button
                  onClick={() => {
                    setCurrentFiliere(f);
                    setShowEdit(true);
                  }}
                >
                  <FaEdit />
                </button>
                <button onClick={() => deleteFiliere(f.id)}>
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST */}
      {view === "list" && (
        <table className="w-full bg-white rounded-xl shadow overflow-hidden">
          <thead className="bg-[#30B2AC] text-white">
            <tr>
              <th className="p-4 text-left">Nom</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filieres.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-4 font-semibold">{f.nom}</td>
                <td className="p-4">{f.description || "—"}</td>
                <td className="p-4 text-right">
                  <button onClick={() => setSelectedFiliere(f)}>
                    <FaEye />
                  </button>
                  <button
                    className="mx-2"
                    onClick={() => {
                      setCurrentFiliere(f);
                      setShowEdit(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteFiliere(f.id)}>
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
        <Modal
          title="Créer une filière"
          filiere={newFiliere}
          setFiliere={setNewFiliere}
          onConfirm={handleCreate}
          onClose={() => setShowCreate(false)}
          errors={createErrors}
        />
      )}

      {showEdit && (
        <Modal
          title="Modifier la filière"
          filiere={currentFiliere}
          setFiliere={setCurrentFiliere}
          onConfirm={handleEdit}
          onClose={() => setShowEdit(false)}
          errors={editErrors}
        />
      )}
    </div>
  );
};

export default FiliereDisplay;
