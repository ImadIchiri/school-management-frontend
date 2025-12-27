import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoursById, updateCours } from "@/services/cours";
import { getModules } from "@/services/modules";

/* ================= TYPES ================= */

type UpdateCoursDto = {
  titre: string;
  description?: string;
  dateDebut: string;
  dateFin: string;
  moduleId: number;
  enseignantId: number;
  salleId: number;
};

/* ================= COMPONENT ================= */

function CoursUpdate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<UpdateCoursDto>({
    titre: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    moduleId: 0,
    enseignantId: 0,
    salleId: 0,
  });

  const [modules, setModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState<{
    message: string;
    type: "success" | "error";
    visible: boolean;
  }>({
    message: "",
    type: "success",
    visible: false,
  });

  const showPopup = (message: string, type: "success" | "error" = "success") => {
    setPopup({ message, type, visible: true });
    setTimeout(() => {
      setPopup((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) return;

        const [coursRes, modulesRes] = await Promise.all([
          getCoursById(Number(id)),
          getModules(),
        ]);

        const c = coursRes.data;

        setForm({
          titre: c.titre,
          description: c.description || "",
          dateDebut: c.dateDebut?.slice(0, 10),
          dateFin: c.dateFin?.slice(0, 10),
          moduleId: c.moduleId,
          enseignantId: c.enseignantId || 0,
          salleId: c.salleId || 0,
        });

        setModules(modulesRes.data);
      } catch (error) {
        console.error("Erreur lors du chargement du cours",error);
        showPopup("Erreur lors du chargement du cours ❌", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* ================= UPDATE ================= */

  const handleUpdate = async () => {
    try {
      if (!id) return;

      if (
        !form.titre ||
        !form.moduleId ||
        !form.dateDebut ||
        !form.dateFin
      ) {
        showPopup("Veuillez remplir tous les champs obligatoires");
        return;
      }

      if (form.dateFin < form.dateDebut) {
        showPopup("La date de fin doit être après la date de début");
        return;
      }

      await updateCours(Number(id), form);

      showPopup("Cours mis à jour avec succès !");

      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } catch (error) {
      console.error("Erreur update :", error);
      showPopup("Erreur lors de la mise à jour");
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  /* ================= UI ================= */

  return (
  <div className="p-6 bg-[#DFF6F5] min-h-screen font-sans">
    {/* ================= POPUP ================= */}
      {popup.visible && (
        <div className="fixed top-5 right-5 z-[999]">
          <div
            className={`px-6 py-4 rounded-xl shadow-lg text-white font-semibold
            ${popup.type === "success" ? "bg-[#30B2AC]" : "bg-red-500"}`}
          >
            {popup.message}
          </div>
        </div>
      )}
    {/* HEADER SECTION */}
    <div className="flex justify-between items-center mb-6 max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold text-[#1D6F6B]">
        Modifier le cours <span className="text-[#30B2AC]">#{id}</span>
      </h3>
      <button 
        onClick={() => navigate(-1)} 
        className="text-[#30B2AC] hover:text-red-500 text-2xl font-bold transition-colors"
      >
        ✕
      </button>
    </div>

    {/* FORMULAIRE (CARD) */}
    <div className="bg-white rounded-xl w-full max-w-3xl p-8 border border-[#7ED4D1] shadow-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Titre */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Titre du cours</label>
          <input 
            type="text" 
            value={form.titre} 
            onChange={(e) => setForm({ ...form, titre: e.target.value })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all" 
          />
        </div>

        {/* Module */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Module</label>
          <select 
            value={form.moduleId} 
            onChange={(e) => setForm({ ...form, moduleId: Number(e.target.value) })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all"
          >
            <option value={0}>Choisir un module</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>{m.nom}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Description</label>
          <textarea 
            rows={3} 
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-[#7ED4D1] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#30B2AC] outline-none resize-none transition-all" 
          />
        </div>

        {/* Enseignant */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Enseignant</label>
          <select 
            value={form.enseignantId} 
            onChange={(e) => setForm({ ...form, enseignantId: Number(e.target.value) })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all"
          >
            <option value={0}>Choisir l'enseignant</option>
            <option value={2}>MARJANI Abdelatif</option>
            <option value={3}>NADIR Hamza</option>
            <option value={4}>BOUKOUCH Hassan</option>
          </select>
        </div>

        {/* Salle */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Salle</label>
          <select 
            value={form.salleId} 
            onChange={(e) => setForm({ ...form, salleId: Number(e.target.value) })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all"
          >
            <option value="">Choisir la salle</option>
            <option value="1">Salle 1</option>
            <option value="2">Salle 2</option>
            <option value="3">Salle 3</option>
          </select>
        </div>

        {/* Date Début */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Date de début</label>
          <input 
            type="date" 
            value={form.dateDebut} 
            onChange={(e) => setForm({ ...form, dateDebut: e.target.value })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all" 
          />
        </div>

        {/* Date Fin */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Date de fin</label>
          <input 
            type="date" 
            value={form.dateFin} 
            onChange={(e) => setForm({ ...form, dateFin: e.target.value })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all" 
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-4 mt-10">
        <button 
          type="button"
          onClick={() => navigate(-1)} 
          className="border-2 border-[#7ED4D1] px-8 py-2 rounded-lg text-[#1D6F6B] font-semibold hover:bg-[#7ED4D1]/20 transition-colors"
        >
          Annuler
        </button>
        <button 
          type="button"
          onClick={handleUpdate} 
          className="bg-[#30B2AC] text-white px-10 py-2 rounded-lg hover:bg-[#1D6F6B] font-semibold shadow-lg transition-all active:scale-95"
        >
          Mettre à jour
        </button>
      </div>
    </div>
  </div>
);
}

export default CoursUpdate;
