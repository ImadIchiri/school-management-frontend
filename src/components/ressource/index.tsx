import { useState } from "react";
import { FiGrid, FiList } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function RessourceStyle() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    url: "",
    uploadedBy: "",
    type: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Ressource créée :", formData);
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen font-sans">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#1D6F6B]">Ressources</h1>

        <div className="flex items-center gap-3">
          {/* Toggle view */}
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
              className="bg-white rounded-xl border border-[#7ED4D1] shadow p-5"
            >
              <h3 className="text-lg font-semibold text-[#1D6F6B]">
                Ressource {index + 1}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                Description de la ressource
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() =>
                    navigate(`/ressources/display/${index + 1}`)
                  }
                  className="px-4 py-2 rounded-lg bg-[#30B2AC] text-white
                             hover:bg-[#1D6F6B] transition"
                >
                  Display
                </button>

                <button
                  onClick={() =>
                    navigate(`/ressources/update/${index + 1}`)
                  }
                  className="px-4 py-2 rounded-lg bg-[#279D99] text-white
                             hover:bg-[#1D6F6B] transition"
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
                Ressource {index + 1}
              </span>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    navigate(`/ressources/display/${index + 1}`)
                  }
                  className="px-4 py-1 rounded-lg bg-[#30B2AC] text-white"
                >
                  Display
                </button>

                <button
                  onClick={() =>
                    navigate(`/ressources/update/${index + 1}`)
                  }
                  className="px-4 py-1 rounded-lg bg-[#279D99] text-white"
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
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#1D6F6B]">
                Créer une ressource
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#30B2AC] text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Titre */}
              <div>
                <label className="text-sm font-semibold text-[#1D6F6B]">
                  Titre
                </label>
                <input
                  name="titre"
                  placeholder="Titre de la ressource"
                  value={formData.titre}
                  onChange={handleChange}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-sm font-semibold text-[#1D6F6B]">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4 bg-white"
                >
                  <option value="">Choisir le type</option>
                  <option value="pdf">PDF</option>
                  <option value="video">Vidéo</option>
                  <option value="lien">Lien</option>
                </select>
              </div>

              {/* URL */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-[#1D6F6B]">
                  URL
                </label>
                <input
                  name="url"
                  placeholder="https://..."
                  value={formData.url}
                  onChange={handleChange}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-[#1D6F6B]">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-[#7ED4D1] rounded-lg px-4 py-2 resize-none"
                />
              </div>

              {/* Uploaded By */}
              <div>
                <label className="text-sm font-semibold text-[#1D6F6B]">
                  Uploaded By
                </label>
                <select
                  name="uploadedBy"
                  value={formData.uploadedBy}
                  onChange={handleChange}
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4 bg-white"
                >
                  <option value="">Choisir l'utilisateur</option>
                  <option value="user1">User 1</option>
                  <option value="user2">User 2</option>
                  <option value="user3">User 3</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="border-2 border-[#7ED4D1] px-6 py-2 rounded-lg text-[#1D6F6B]"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                className="bg-[#30B2AC] text-white px-6 py-2 rounded-lg hover:bg-[#1D6F6B]"
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
