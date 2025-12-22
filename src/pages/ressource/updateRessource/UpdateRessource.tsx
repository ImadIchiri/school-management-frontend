import { useParams, useNavigate} from "react-router-dom";
import { useState } from "react";

function RessourceUpdate() {
  const { id } = useParams();
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
  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[#1D6F6B]">
          Modifier le ressource #{id}
        </h3>
        <button onClick={() => navigate("/ressources")} className="text-black-500 text-xl font-bold">
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
                  className="w-full h-11 border bg-white border-[#7ED4D1] rounded-lg px-4"
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
                  className="w-full h-11 border border-[#7ED4D1] bg-white rounded-lg px-4"
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
                  className="w-full border border-[#7ED4D1] bg-white rounded-lg px-4 py-2 resize-none"
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
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button
          onClick={() => navigate(-1)}
          className="border px-6 py-2 rounded text-[#1D6F6B]"
        >
          Annuler
        </button>
        <button className="bg-[#30B2AC] text-white px-6 py-2 rounded">
          Mettre à jour
        </button>
      </div>
</div>
  );
}
export default RessourceUpdate;
