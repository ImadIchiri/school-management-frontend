import { useParams, useNavigate } from "react-router-dom";

function ModuleUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[#1D6F6B]">
          Modifier le module #{id}
        </h3>
        <button onClick={() => navigate("/modules")} className="text-black-500 text-xl font-bold">
          ✕
        </button>
      </div>
      {/* ===== FORM ===== */}
    <div className="bg-white p-6 rounded-xl shadow border border-[#7ED4D1]">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Nom du module */}
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[#1D6F6B]">
        Nom du module
      </label>
      <input
        type="text"
        placeholder="Entrer le nom du module"
        className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4
                   focus:ring-2 focus:ring-[#30B2AC] outline-none"
      />
    </div>

    {/* Niveau (SELECT) */}
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[#1D6F6B]">
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

    {/* Description */}
    <div className="md:col-span-2 space-y-2">
      <label className="text-sm font-semibold text-[#1D6F6B]">
        Description
      </label>
      <textarea
        rows={4}
        placeholder="Entrer la description du module"
        className="w-full border border-[#7ED4D1] rounded-lg px-4 py-2
                   focus:ring-2 focus:ring-[#30B2AC] outline-none resize-none"
      />
    </div>

    {/* Cours */}
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[#1D6F6B]">
        Cours
      </label>
      <input
        type="text"
        placeholder="Entrer le cours"
        className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4
                   focus:ring-2 focus:ring-[#30B2AC] outline-none"
      />
    </div>

    {/* Enseignant (SELECT) */}
    <div className="space-y-2">
      <label className="text-sm font-semibold text-[#1D6F6B]">
        Enseignant
      </label>
      <select
        className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4 bg-white
                   focus:ring-2 focus:ring-[#30B2AC] outline-none"
      >
        <option value="">Choisir l'enseignant</option>
        <option value="1">Enseignant 1</option>
        <option value="2">Enseignant 2</option>
        <option value="3">Enseignant 3</option>
      </select>
    </div>

  </div>
    </div>
      {/* BUTTONS */}
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
export default ModuleUpdate;
