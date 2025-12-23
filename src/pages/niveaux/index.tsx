import { useState } from "react";
import { FiGrid, FiList, FiPlus, FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { useNiveaux, type Niveau } from "@/components/niveaux";
import ModalNiveau from "@/components/niveaux/ModalNiveau";

const NiveauxDisplay = () => {
  /* ================= STATES ================= */
  const [isGrid, setIsGrid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingNiveau, setEditingNiveau] = useState<Niveau | null>(null);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedNiveau, setSelectedNiveau] = useState<Niveau | null>(null);

  const [createErrors, setCreateErrors] = useState<Record<string, string>>({});
  const [editErrors, setEditErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState<Omit<Niveau, "id">>({
    anneeLabel: "",
    dateDebut: "",
    dateFin: "",
    filiereId: 0,
  });

  const [editForm, setEditForm] = useState<Niveau>({
    id: 0,
    anneeLabel: "",
    dateDebut: "",
    dateFin: "",
    filiereId: 0,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [niveauToDelete, setNiveauToDelete] = useState<Niveau | null>(null);

  /* ================= DATA ================= */
  const { niveaux, loading, handleCreate, handleUpdate, handleDelete } =
    useNiveaux();

  /* ================= ACTIONS ================= */
  const openAdd = () => {
    setEditingNiveau(null);
    setForm({
      anneeLabel: "",
      dateDebut: "",
      dateFin: "",
      filiereId: 0,
    });
    setCreateErrors({});
    setIsOpen(true);
  };

  const openEdit = (n: Niveau) => {
    setEditingNiveau(n);
    setEditForm({ ...n });
    setEditErrors({});
    setIsOpen(true);
    setSheetOpen(false);
  };

  const openSheet = (n: Niveau) => {
    setSelectedNiveau(n);
    setSheetOpen(true);
  };

  const saveNiveau = () => {
    const errors: Record<string, string> = {};
    const current = editingNiveau ? editForm : form;

    if (!current.anneeLabel.trim()) errors.anneeLabel = "L’année est obligatoire";
    if (!current.filiereId) errors.filiereId = "La filière est obligatoire";

    if (Object.keys(errors).length) {
      editingNiveau ? setEditErrors(errors) : setCreateErrors(errors);
      return;
    }
   

    if (editingNiveau) {
      //handleUpdate(editingNiveau.id, current);
      handleUpdate({ ...current, id: editingNiveau.id });
    } else {
      handleCreate(current);
    }

    setIsOpen(false);
  };

  const promptDelete = (n: Niveau) => {
    setNiveauToDelete(n);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (!niveauToDelete) return;
    handleDelete(niveauToDelete.id);
    setShowDeleteConfirm(false);
    if (selectedNiveau?.id === niveauToDelete.id) setSheetOpen(false);
  };

  /* ================= LOADING ================= */
  if (loading)
    return (
      <p className="text-center mt-10 text-[#1D6F6B] font-semibold">
        Chargement...
      </p>
    );

  /* ================= UI ================= */
  return (
    <div className="p-4 sm:p-8 min-h-screen bg-[#DFF6F5]">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#1D6F6B]">Niveaux</h1>

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
          {niveaux.map((n) => (
            <div
              key={n.id}
              className="group relative bg-white rounded-2xl p-6 shadow"
            >
              <button
                onClick={() => openSheet(n)}
                className="cursor-pointer absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiEye className="transition-transform hover:scale-125" />
              </button>

              <h2 className="text-xl font-bold text-[#1D6F6B]">
                {n.anneeLabel}
              </h2>
              <p className="text-gray-600">Filière : {n.filiereId}</p>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => openEdit(n)}
                  className="cursor-pointer text-blue-600 transition-transform hover:scale-125"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => promptDelete(n)}
                  className="cursor-pointer text-red-600 transition-transform hover:scale-125"
                >
                  <FiTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST */
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full bg-white rounded-xl shadow">
            <thead className="bg-[#30B2AC] text-white">
              <tr>
                <th className="p-4 text-left">Année</th>
                <th className="p-4 text-left">Filière</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {niveaux.map((n) => (
                <tr key={n.id} className="border-t">
                  <td className="p-4">{n.anneeLabel}</td>
                  <td className="p-4">{n.filiereId}</td>
                  <td className="p-4 flex justify-end gap-3">
                    <button
                      onClick={() => openSheet(n)}
                      className="cursor-pointer hover:scale-125 transition-transform"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => openEdit(n)}
                      className="cursor-pointer text-blue-600 hover:scale-125 transition-transform"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => promptDelete(n)}
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

      {/* SHEET DETAILS */}
      {sheetOpen && selectedNiveau && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSheetOpen(false)}
          />
          <div className="w-full sm:w-[380px] bg-white h-full p-6">
            <h2 className="text-xl font-bold mb-4 text-[#1D6F6B]">
              Détails du niveau
            </h2>
            <p><b>Année :</b> {selectedNiveau.anneeLabel}</p>
            <p><b>Filière :</b> {selectedNiveau.filiereId}</p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => openEdit(selectedNiveau)}
                className="cursor-pointer bg-[#30B2AC] text-white px-4 py-2 rounded-lg flex justify-center gap-2"
              >
                <FiEdit /> Modifier
              </button>
              <button
                onClick={() => promptDelete(selectedNiveau)}
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

      {/* MODALS */}
      {!editingNiveau && isOpen && (
        <ModalNiveau
          title="Créer un niveau"
          niveau={form}
          setNiveau={setForm}
          onConfirm={saveNiveau}
          onClose={() => setIsOpen(false)}
          errors={createErrors}
        />
      )}

      {editingNiveau && isOpen && (
        <ModalNiveau
          title="Modifier le niveau"
          niveau={editForm}
          setNiveau={setEditForm}
          onConfirm={saveNiveau}
          onClose={() => setIsOpen(false)}
          errors={editErrors}
        />
      )}

      {/* DELETE CONFIRM */}
      {showDeleteConfirm && niveauToDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h3 className="font-bold text-lg mb-2">Supprimer</h3>
            <p className="mb-4">
              Supprimer <b>{niveauToDelete.anneeLabel}</b> ?
            </p>

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
};

export default NiveauxDisplay;
