import { useState } from "react";
import { useNiveaux } from "../components/niveaux";
import { FaEdit, FaTrash, FaPlus, FaTable, FaTh, FaEye } from "react-icons/fa";

const Niveaux = () => {
  const { niveaux, loading, deleteNiveau, createNiveau, updateNiveau } = useNiveaux();
  const [view, setView] = useState<"grid" | "table">("grid");
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentNiveau, setCurrentNiveau] = useState({
    id: 0,
    anneeLabel: "",
    dateDebut: "",
    dateFin: "",
    filiereId: 0,
  });
  const [newNiveau, setNewNiveau] = useState({
    anneeLabel: "",
    dateDebut: "",
    dateFin: "",
    filiereId: 0,
  });

  const handleCreate = () => {
    if (!newNiveau.anneeLabel || !newNiveau.filiereId) return alert("Année et filière requis !");
    createNiveau(newNiveau);
    setNewNiveau({ anneeLabel: "", dateDebut: "", dateFin: "", filiereId: 0 });
    setShowCreate(false);
  };

  const handleEdit = () => {
    if (!currentNiveau.anneeLabel || !currentNiveau.filiereId) return alert("Année et filière requis !");
    updateNiveau(currentNiveau.id, currentNiveau);
    setShowEdit(false);
  };

  if (loading) return <p className="text-center text-[#1D6F6B] font-medium">Chargement...</p>;

  return (
    <div className="p-8 font-sans min-h-screen bg-[#DFF6F5]">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="flex-1 text-center text-4xl font-bold text-[#1D6F6B]">Niveaux</h1>

        <div className="flex gap-3">
          {/* Toggle Grid/Table */}
          <button
            onClick={() => setView(view === "grid" ? "table" : "grid")}
            className="p-3 rounded-xl border border-[#30B2AC] text-[#30B2AC] hover:bg-[#7ED4D1] hover:text-[#1D6F6B] transition"
          >
            {view === "grid" ? <FaTable /> : <FaTh />}
          </button>

          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#30B2AC] text-white font-semibold hover:bg-[#279D99] transition"
          >
            <FaPlus /> Create
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {niveaux.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-[#30B2AC]"
            >
              <h2 className="text-xl font-bold text-[#1D6F6B] mb-2">{n.anneeLabel}</h2>
              <p className="text-sm text-[#1D6F6B]/80 mb-1">Début: {n.dateDebut || "—"}</p>
              <p className="text-sm text-[#1D6F6B]/80 mb-1">Fin: {n.dateFin || "—"}</p>
              <p className="text-sm text-[#1D6F6B]/80 mb-6">Filière ID: {n.filiereId}</p>

              <div className="flex justify-end gap-3">
                <button className="p-2 rounded-lg bg-[#DFF6F5] text-[#1D6F6B] hover:bg-[#30B2AC] hover:text-white transition">
                  <FaEye />
                </button>
                <button
                  onClick={() => {
                    setCurrentNiveau(n);
                    setShowEdit(true);
                  }}
                  className="p-2 rounded-lg bg-[#F2C94C] text-[#1D6F6B] hover:opacity-90 transition"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteNiveau(n.id)}
                  className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {view === "table" && (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-[#DFF6F5]">
          <table className="min-w-full">
            <thead className="bg-[#30B2AC] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Année</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Début</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Fin</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Filière ID</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {niveaux.map((n) => (
                <tr key={n.id} className="border-t border-[#DFF6F5] hover:bg-[#DFF6F5] transition">
                  <td className="px-6 py-4 font-semibold text-[#1D6F6B]">{n.anneeLabel}</td>
                  <td className="px-6 py-4 text-[#1D6F6B]/80">{n.dateDebut}</td>
                  <td className="px-6 py-4 text-[#1D6F6B]/80">{n.dateFin}</td>
                  <td className="px-6 py-4 text-[#1D6F6B]/80">{n.filiereId}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button className="p-2 rounded-lg bg-[#DFF6F5] text-[#1D6F6B] hover:bg-[#30B2AC] hover:text-white transition">
                        <FaEye />
                      </button>
                      <button
                        onClick={() => {
                          setCurrentNiveau(n);
                          setShowEdit(true);
                        }}
                        className="p-2 rounded-lg bg-[#F2C94C] text-[#1D6F6B]"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteNiveau(n.id)}
                        className="p-2 rounded-lg bg-red-500 text-white"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* CREATE MODAL */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#1D6F6B]">Créer un niveau</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Année"
                className="border border-[#30B2AC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#30B2AC]"
                value={newNiveau.anneeLabel}
                onChange={(e) => setNewNiveau({ ...newNiveau, anneeLabel: e.target.value })}
              />
              <input
                type="date"
                placeholder="Date début"
                className="border border-[#30B2AC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#30B2AC]"
                value={newNiveau.dateDebut}
                onChange={(e) => setNewNiveau({ ...newNiveau, dateDebut: e.target.value })}
              />
              <input
                type="date"
                placeholder="Date fin"
                className="border border-[#30B2AC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#30B2AC]"
                value={newNiveau.dateFin}
                onChange={(e) => setNewNiveau({ ...newNiveau, dateFin: e.target.value })}
              />
              <input
                type="number"
                placeholder="Filière ID"
                className="border border-[#30B2AC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#30B2AC]"
                value={newNiveau.filiereId}
                onChange={(e) => setNewNiveau({ ...newNiveau, filiereId: Number(e.target.value) })}
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 rounded-lg border border-[#1D6F6B] text-[#1D6F6B] hover:bg-[#F2C94C] transition"
                >
                  Annuler
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 rounded-lg bg-[#30B2AC] text-white hover:bg-[#279D99] transition"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-[#1D6F6B]">Modifier le niveau</h2>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Année"
                className="border border-[#30B2AC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#30B2AC]"
                value={currentNiveau.anneeLabel}
                onChange={(e) => setCurrentNiveau({ ...currentNiveau, anneeLabel: e.target.value })}
              />
              <input
                type="date"
                placeholder="Date début"
                className="border border-[#30B2AC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#30B2AC]"
                value={currentNiveau.dateDebut}
                onChange={(e) => setCurrentNiveau({ ...currentNiveau, dateDebut: e.target.value })}
              />
              <input
                type="date"
                placeholder="Date fin"
                className="border border-[#30B2AC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#30B2AC]"
                value={currentNiveau.dateFin}
                onChange={(e) => setCurrentNiveau({ ...currentNiveau, dateFin: e.target.value })}
              />
              <input
                type="number"
                placeholder="Filière ID"
                className="border border-[#30B2AC] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#30B2AC]"
                value={currentNiveau.filiereId}
                onChange={(e) => setCurrentNiveau({ ...currentNiveau, filiereId: Number(e.target.value) })}
              />
              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setShowEdit(false)}
                  className="px-4 py-2 rounded-lg border border-[#1D6F6B] text-[#1D6F6B] hover:bg-[#F2C94C] transition"
                >
                  Annuler
                </button>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 rounded-lg bg-[#30B2AC] text-white hover:bg-[#279D99] transition"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Niveaux;
