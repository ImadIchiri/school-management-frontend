import { useParams, useNavigate } from "react-router-dom";

function CoursUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[#1D6F6B]">
          Modifier le Cours #{id}
        </h3>
        <button onClick={() => navigate("/Cours")} className="text-black-500 text-xl font-bold">
          ✕
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto pr-1">
    {/* ===== Form ===== */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* Titre du cours */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-[#1D6F6B]">
          Titre du cours
        </label>
        <input
          type="text"
          placeholder="Entrer le titre du cours"
          className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4
                    focus:ring-2 focus:ring-[#30B2AC] bg-white outline-none"
        />
      </div>

      {/* Module */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-[#1D6F6B]">
          Module
        </label>
        <select className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4 bg-white
                          focus:ring-2 focus:ring-[#30B2AC] outline-none">
          <option value="">Choisir le module</option>
          <option value="1">Module 1</option>
          <option value="2">Module 2</option>
          <option value="3">Module 3</option>
        </select>
      </div>

      {/* Description */}
      <div className="md:col-span-2 space-y-1">
        <label className="text-sm font-semibold text-[#1D6F6B]">
          Description
        </label>
        <textarea
          rows={4}
          placeholder="Entrer la description du cours"
          className="w-full border border-[#7ED4D1] rounded-lg px-4 py-2
                    focus:ring-2 focus:ring-[#30B2AC] bg-white outline-none resize-none"
        />
      </div>
      {/* Date début */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-[#1D6F6B]">
          Date début
        </label>
        <input type="date" className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4
                                    focus:ring-2 focus:ring-[#30B2AC] bg-white outline-none"/>
      </div>
      {/* Date fin */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-[#1D6F6B]">
          Date fin
        </label>
        <input type="date" className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4
                                    focus:ring-2 focus:ring-[#30B2AC] bg-white outline-none"/>
      </div>
      {/* Enseignant */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-[#1D6F6B]">
          Enseignant
        </label>
        <select className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4 bg-white
                          focus:ring-2 focus:ring-[#30B2AC] outline-none">
          <option value="">Choisir l'enseignant</option>
          <option value="1">Enseignant 1</option>
          <option value="2">Enseignant 2</option>
          <option value="3">Enseignant 3</option>
        </select>
      </div>
      {/* Salle */}
      <div className="space-y-1">
        <label className="text-sm font-semibold text-[#1D6F6B]">
          Salle
        </label>
        <select className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4 bg-white
                          focus:ring-2 focus:ring-[#30B2AC] outline-none">
          <option value="">Choisir la salle</option>
          <option value="1">Salle 1</option>
          <option value="2">Salle 2</option>
          <option value="3">Salle 3</option>
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
export default CoursUpdate;
