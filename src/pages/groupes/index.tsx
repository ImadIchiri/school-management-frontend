import { useState } from "react";
import { FiGrid, FiList, FiPlus, FiEdit, FiTrash, FiX, FiEye } from "react-icons/fi";
import { useGroupes, type Groupe } from "@/components/groupes";
import ModalGroupe from "@/components/groupes/ModalGroupe";

export default function GroupesPage() {
  const { groupes, loading, handleCreate, handleUpdate, handleDelete } = useGroupes();

  const [isGrid, setIsGrid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingGroupe, setEditingGroupe] = useState<Groupe | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedGroupe, setSelectedGroupe] = useState<Groupe | null>(null);

  const [form, setForm] = useState({ nom: "", niveauId: 0 });
  const [editForm, setEditForm] = useState<Groupe>({ id: 0, nom: "", niveauId: 0 });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [groupeToDelete, setGroupeToDelete] = useState<Groupe | null>(null);

  /* ---------- ACTIONS ---------- */
  const openAdd = () => {
    setEditingGroupe(null);
    setForm({ nom: "", niveauId: 0 });
    setErrors({});
    setIsOpen(true);
  };

  const openEdit = (groupe: Groupe) => {
    setEditingGroupe(groupe);
    setEditForm({ ...groupe });
    setErrors({});
    setIsOpen(true);
    setSheetOpen(false);
  };

  const openSheet = (groupe: Groupe) => {
    setSelectedGroupe(groupe);
    setSheetOpen(true);
  };

  const saveGroupe = () => {
    const newErrors: Record<string, string> = {};
    const currentForm = editingGroupe ? editForm : form;

    if (!currentForm.nom.trim()) newErrors.nom = "Nom obligatoire";
    if (!currentForm.niveauId) newErrors.niveauId = "Niveau obligatoire";
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    if (editingGroupe) {
      handleUpdate(editingGroupe.id, currentForm);
    } else {
      handleCreate(currentForm);
    }

    setIsOpen(false);
  };

  const confirmDelete = () => {
    if (groupeToDelete) {
      handleDelete(groupeToDelete.id);
      setShowDeleteConfirm(false);
      if (selectedGroupe?.id === groupeToDelete.id) setSheetOpen(false);
    }
  };

  const promptDelete = (groupe: Groupe) => {
    setGroupeToDelete(groupe);
    setShowDeleteConfirm(true);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-[#1D6F6B] font-semibold">
        Chargement...
      </p>
    );

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-[#DFF6F5]">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#1D6F6B]">Groupes</h1>
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

      {/* GRID */}
      {isGrid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupes.map((g) => (
            <div key={g.id} className="group relative bg-white rounded-2xl p-6 shadow">
              <button
                onClick={() => openSheet(g)}
                className="cursor-pointer absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiEye className="text-black transition-transform hover:scale-125" />
              </button>
              <h2 className="text-xl font-bold text-[#1D6F6B]">{g.nom}</h2>
              <p className="text-gray-600">Niveau : {g.niveauId}</p>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => openEdit(g)}
                  className="cursor-pointer text-blue-600 transition-transform hover:scale-125"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => promptDelete(g)}
                  className="cursor-pointer text-red-600 transition-transform hover:scale-125"
                >
                  <FiTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full bg-white rounded-xl shadow">
            <thead className="bg-[#30B2AC] text-white">
              <tr>
                <th className="p-4 text-left">Nom</th>
                <th className="p-4 text-left">Niveau</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupes.map((g) => (
                <tr key={g.id} className="group border-t">
                  <td className="p-4">{g.nom}</td>
                  <td className="p-4">{g.niveauId}</td>
                  <td className="p-4 flex justify-end gap-3">
                    <button
                      onClick={() => openSheet(g)}
                      className="cursor-pointer text-black transition-transform hover:scale-125"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => openEdit(g)}
                      className="cursor-pointer text-blue-600 transition-transform hover:scale-125"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => promptDelete(g)}
                      className="cursor-pointer text-red-600 transition-transform hover:scale-125"
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

      {/* SHEET DETAILS */}
      {sheetOpen && selectedGroupe && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSheetOpen(false)}
          />
          <div className="w-full sm:w-[380px] bg-white h-full p-6 animate-slide-in">
            <h2 className="text-xl font-bold mb-4 text-[#1D6F6B]">
              Détails du groupe
            </h2>
            <p><b>Nom :</b> {selectedGroupe.nom}</p>
            <p><b>Niveau :</b> {selectedGroupe.niveauId}</p>
            <p><b>ID :</b> {selectedGroupe.id}</p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => openEdit(selectedGroupe)}
                className="cursor-pointer px-4 py-2 bg-[#30B2AC] text-white rounded-lg w-full flex justify-center gap-2 items-center"
              >
                <FiEdit /> Modifier
              </button>
              <button
                onClick={() => promptDelete(selectedGroupe)}
                className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg w-full flex justify-center gap-2 items-center"
              >
                <FiTrash /> Supprimer
              </button>
              <button
                onClick={() => setSheetOpen(false)}
                className="cursor-pointer px-4 py-2 bg-gray-200 rounded-lg w-full"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CREATE */}
      {!editingGroupe && isOpen && (
        <ModalGroupe
          title="Créer un groupe"
          groupe={form}
          setGroupe={setForm}
          onConfirm={saveGroupe}
          onClose={() => setIsOpen(false)}
          errors={errors}
        />
      )}

      {/* MODAL EDIT */}
      {editingGroupe && isOpen && (
        <ModalGroupe
          title="Modifier le groupe"
          groupe={editForm}
          setGroupe={setEditForm}
          onConfirm={saveGroupe}
          onClose={() => setIsOpen(false)}
          errors={errors}
        />
      )}

      {/* DELETE CONFIRM */}
      {showDeleteConfirm && groupeToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h3 className="font-bold text-lg mb-2">Supprimer</h3>
            <p className="mb-4">Supprimer <b>{groupeToDelete.nom}</b> ?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
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
