import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getModuleById, updateModule } from "@/services/modules";

/* ================= TYPES ================= */
type UpdateModule = {
  nom: string;
  description: string;
  niveauId: number;
};

/* ================= COMPONENT ================= */
export default function ModuleUpdate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<UpdateModule>({
    nom: "",
    description: "",
    niveauId: 0,
  });

  const [loading, setLoading] = useState(true);
   /* ================= POPUP ================= */
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

  /* ===== Charger le module ===== */
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchModule = async () => {
      try {
        const response = await getModuleById(Number(id));
        const moduleData = response.data?.data ?? response.data;

        setForm({
          nom: moduleData.nom,
          description: moduleData.description || "",
          niveauId: moduleData.niveauId,
        });
      } catch (error) {
        console.error("Erreur chargement module :", error);
        showPopup("Erreur lors du chargement du module ❌", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  /* ===== Update ===== */
  const handleUpdate = async () => {
    if (!form.nom || !form.niveauId) {
      showPopup("Nom et niveau obligatoires");
      return;
    }

    try {
      await updateModule(Number(id), form);
      showPopup("Module mis à jour avec succès ✨", "success");

      setTimeout(() => {
        // setShowPopup(false);
        navigate("/modules");
      }, 2000);
    } catch (error) {
      console.error("Erreur update :", error);
      showPopup("Erreur lors de la mise à jour");
    }
  };

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <div className="p-6 bg-[#DFF6F5] min-h-screen flex justify-center items-center">
        <p className="text-[#1D6F6B] font-medium">Chargement...</p>
      </div>
    );
  }

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
        Modifier le module <span className="text-[#30B2AC]">#{id}</span>
      </h3>
      <button 
        onClick={() => navigate("/modules")} 
        className="text-[#30B2AC] hover:text-red-500 text-2xl font-bold transition-colors"
      >
        ✕
      </button>
    </div>

    {/* FORMULAIRE (CARD) */}
    <div className="bg-white rounded-xl w-full max-w-3xl p-8 border border-[#7ED4D1] shadow-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Nom du Module */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Nom du module</label>
          <input 
            type="text" 
            value={form.nom} 
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all" 
          />
        </div>

        {/* Niveau */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Niveau</label>
          <select 
            value={form.niveauId} 
            onChange={(e) => setForm({ ...form, niveauId: Number(e.target.value) })}
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all"
          >
            <option value={0}>Choisir le niveau</option>
            <option value={2}>Niveau 1</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Description</label>
          <textarea 
            rows={5} 
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border border-[#7ED4D1] rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#30B2AC] outline-none resize-none transition-all" 
          />
        </div>
      </div>

      {/* BOUTONS D'ACTION */}
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
