import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiGrid, FiList } from "react-icons/fi";

export default function ModuleStyle() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen font-sans">

      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#1D6F6B]">Modules</h1>

        <div className="flex items-center gap-3">
          {/* Toggle Grid / List */}
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="w-10 h-10 flex items-center justify-center rounded-lg
                       bg-[#7ED4D1] text-[#1D6F6B]
                       hover:bg-[#279D99] hover:text-white transition-all"
          >
            {view === "grid" ? <FiList size={20} /> : <FiGrid size={20} />}
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
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-[#7ED4D1] shadow p-4"
            >
              <h3 className="text-lg font-semibold text-[#1D6F6B]">
                Module {index + 1}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                Description du module
              </p>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => navigate(`/modules/display/${index + 1}`)}
                  className="px-3 py-1 rounded bg-[#30B2AC] text-white"
                >
                  Display
                </button>

                <button
                  onClick={() => navigate(`/modules/update/${index + 1}`)}
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
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 border-b"
            >
              <span className="font-medium text-[#1D6F6B]">
                Module {index + 1}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/modules/display/${index + 1}`)}
                  className="px-3 py-1 rounded bg-[#30B2AC] text-white"
                >
                  Display
                </button>

                <button
                  onClick={() => navigate(`/modules/update/${index + 1}`)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 border border-[#7ED4D1] shadow-2xl mx-4">

            {/* Header Modal */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#1D6F6B]">
                Créer nouveau module
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#30B2AC] text-2xl font-bold"
              >
                ✕
              </button>
            </div>
            {/* ===== Form ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">

              {/* Nom du module */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-[#1D6F6B]">
                  Nom du module
                </label>
                <input type="text" placeholder="Entrer le nom du module" className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4 focus:ring-2 focus:ring-[#30B2AC] outline-none"/>
              </div>
              {/* Niveau (SELECT) */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#1D6F6B]">
                  Niveau
                </label>
                <select
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4 bg-white
                            focus:ring-2 focus:ring-[#30B2AC] outline-none"
                >
                  <option value="">Choisir le niveau</option>
                  <option value="1">1ère année</option>
                  <option value="2">2ème année</option>
                  <option value="3">3ème année</option>
                </select>
              </div>

              {/* Description (pleine largeur) */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-[#1D6F6B]">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Entrer la description du module"
                  className="w-full border border-[#7ED4D1] rounded-lg px-4 py-2
                            focus:ring-2 focus:ring-[#30B2AC] outline-none resize-none"
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="border-2 border-[#7ED4D1] px-6 py-2 rounded-lg text-[#1D6F6B] hover:bg-[#DFF6F5] transition">
                Annuler
              </button>
              <button className="bg-[#30B2AC] text-white px-6 py-2 rounded-lg hover:bg-[#1D6F6B] transition">
                Ajouter
              </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
