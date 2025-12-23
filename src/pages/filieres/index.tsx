import { useState } from "react";
import {
  FiGrid,
  FiList,
  FiPlus,
  FiEdit,
  FiTrash,
  FiEye,
} from "react-icons/fi";
import { useFilieres, type Filiere } from "@/components/filieres";
import Modal from "@/components/filieres/Modal";

export default function FiliereDisplay () {
  const { filieres, loading, handleCreate, handleUpdate, handleDelete } =
    useFilieres();

  const [isGrid, setIsGrid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingFiliere, setEditingFiliere] = useState<Filiere | null>(null);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedFiliere, setSelectedFiliere] = useState<Filiere | null>(null);

  const [form, setForm] = useState({ nom: "", description: "" });
  const [editForm, setEditForm] = useState<Filiere>({
    id: 0,
    nom: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [filiereToDelete, setFiliereToDelete] = useState<Filiere | null>(null);

  /* ================= ACTIONS ================= */
  const openAdd = () => {
    setEditingFiliere(null);
    setForm({ nom: "", description: "" });
    setErrors({});
    setIsOpen(true);
  };

  const openEdit = (f: Filiere) => {
    setEditingFiliere(f);
    setEditForm({ ...f });
    setErrors({});
    setIsOpen(true);
    setSheetOpen(false);
  };

  const openSheet = (f: Filiere) => {
    setSelectedFiliere(f);
    setSheetOpen(true);
  };

  const saveFiliere = () => {
    const errs: Record<string, string> = {};
    const current = editingFiliere ? editForm : form;

    if (!current.nom.trim()) errs.nom = "Nom obligatoire";

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    if (editingFiliere) {
      handleUpdate(editingFiliere.id, current);
    } else {
      handleCreate(current);
    }

    setIsOpen(false);
  };

  const promptDelete = (f: Filiere) => {
    setFiliereToDelete(f);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!filiereToDelete) return;
    handleDelete(filiereToDelete.id);
    setShowDeleteConfirm(false);
    if (selectedFiliere?.id === filiereToDelete.id) setSheetOpen(false);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-[#1D6F6B] font-semibold">
        Chargement...
      </p>
    );

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-[#DFF6F5]">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#1D6F6B]">Filières</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setIsGrid(!isGrid)}
            className="cursor-pointer w-10 h-10 rounded-lg bg-[#7ED4D1] flex items-center justify-center"
          >
            {isGrid ? <FiList /> : <FiGrid />}
          </button>

          <button
            onClick={openAdd}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl bg-[#30B2AC] text-white font-semibold"
          >
            <FiPlus /> Ajouter
          </button>
        </div>
      </div>

      {/* ================= GRID ================= */}
      {isGrid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filieres.map((f) => (
            <div
              key={f.id}
              className="group relative bg-white rounded-2xl p-6 shadow"
            >
              <button
                onClick={() => openSheet(f)}
                className="cursor-pointer absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiEye className="transition-transform hover:scale-125" />
              </button>

              <h2 className="text-xl font-bold text-[#1D6F6B]">{f.nom}</h2>
              <p className="text-gray-600">{f.description || "—"}</p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => openEdit(f)}
                  className="cursor-pointer text-blue-600 transition-transform hover:scale-125"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => promptDelete(f)}
                  className="cursor-pointer text-red-600 transition-transform hover:scale-125"
                >
                  <FiTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ================= LIST ================= */
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full bg-white rounded-xl shadow">
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
                  <td className="p-4">{f.nom}</td>
                  <td className="p-4">{f.description || "—"}</td>
                  <td className="p-4 flex justify-end gap-3">
                    <button
                      onClick={() => openSheet(f)}
                      className="cursor-pointer hover:scale-125 transition-transform"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => openEdit(f)}
                      className="cursor-pointer text-blue-600 hover:scale-125 transition-transform"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => promptDelete(f)}
                      className="cursor-pointer text-red-600 hover:scale-125 transition-transform"
                    >
                      <FiTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================= SHEET DETAILS ================= */}
      {sheetOpen && selectedFiliere && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setSheetOpen(false)} />
          <div className="w-full sm:w-[380px] bg-white h-full p-6">
            <h2 className="text-xl font-bold mb-4 text-[#1D6F6B]">
              Détails filière
            </h2>
            <p><b>Nom :</b> {selectedFiliere.nom}</p>
            <p><b>Description :</b> {selectedFiliere.description || "—"}</p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => openEdit(selectedFiliere)}
                className="cursor-pointer bg-[#30B2AC] text-white px-4 py-2 rounded-lg flex justify-center gap-2"
              >
                <FiEdit /> Modifier
              </button>
              <button
                onClick={() => promptDelete(selectedFiliere)}
                className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg flex justify-center gap-2"
              >
                <FiTrash /> Supprimer
              </button>
              <button
                onClick={() => setSheetOpen(false)}
                className="cursor-pointer bg-gray-200 px-4 py-2 rounded-lg"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODALS ================= */}
      {!editingFiliere && isOpen && (
        <Modal
          title="Créer une filière"
          filiere={form}
          setFiliere={setForm}
          onConfirm={saveFiliere}
          onClose={() => setIsOpen(false)}
          errors={errors}
        />
      )}

      {editingFiliere && isOpen && (
        <Modal
          title="Modifier la filière"
          filiere={editForm}
          setFiliere={setEditForm}
          onConfirm={saveFiliere}
          onClose={() => setIsOpen(false)}
          errors={errors}
        />
      )}

      {/* ================= DELETE CONFIRM ================= */}
      {showDeleteConfirm && filiereToDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h3 className="font-bold text-lg mb-2">Confirmation</h3>
            <p>Supprimer <b>{filiereToDelete.nom}</b> ?</p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="cursor-pointer bg-gray-200 px-4 py-2 rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded-lg"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

