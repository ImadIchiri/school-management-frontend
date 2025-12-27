import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getRessourceById, updateRessource } from "@/services/ressources";

function RessourceUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    url: "" as string | File,
    uploadedAt: "",
    uploadedById: 0,
    typeId: 0,
  });

  const [loading, setLoading] = useState(true);

  // Charger les données de la ressource
  useEffect(() => {
    const fetchRessource = async () => {
      try {
        if (id) {
          const res = await getRessourceById(Number(id));
          const data = res.data;
          setFormData({
            titre: data.titre,
            description: data.description || "",
            url: data.url, 
            // Formatage de la date pour l'input datetime-local (YYYY-MM-DDTHH:mm)
            uploadedAt: data.uploadedAt ? new Date(data.uploadedAt).toISOString().slice(0, 16) : "",
            uploadedById: data.uploadedById,
            typeId: data.typeId,
          });
        }
      } catch (error) {
        console.error("Erreur chargement:", error);
        alert("Erreur lors de la récupération des données");
      } finally {
        setLoading(false);
      }
    };
    fetchRessource();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "file") {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        setFormData((prev) => ({ ...prev, url: fileInput.files![0] }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "uploadedById" || name === "typeId" ? Number(value) : value,
      }));
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      if (!id) return;

      // On utilise FormData car il y a potentiellement un fichier
      const dataToSend = new FormData();
      dataToSend.append("titre", formData.titre);
      dataToSend.append("description", formData.description);
      dataToSend.append("uploadedAt", formData.uploadedAt);
      dataToSend.append("uploadedById", String(formData.uploadedById));
      dataToSend.append("typeId", String(formData.typeId));
      
      // Si l'utilisateur a sélectionné un nouveau fichier (instance de File)
      if (formData.url instanceof File) {
        dataToSend.append("file", formData.url);
      }

      // Le 'as any' permet de contourner l'erreur de type si votre service attend un objet simple
      await updateRessource(Number(id), dataToSend as any);
      
      alert("Ressource mise à jour avec succès !");
      navigate("/ressources");
    } catch (error) {
      console.error("Erreur update:", error);
      alert("Erreur lors de la mise à jour");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-[#DFF6F5]">
      <p className="text-[#1D6F6B] font-semibold">Chargement des données...</p>
    </div>
  );

  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold text-[#1D6F6B]">Modifier la ressource #{id}</h3>
        <button 
          onClick={() => navigate("/ressources")} 
          className="text-[#30B2AC] hover:text-red-500 text-2xl font-bold transition-colors"
        >
          ✕
        </button>
      </div>

      {/* FORMULAIRE */}
      <div className="bg-white rounded-xl w-full max-w-3xl p-8 border border-[#7ED4D1] shadow-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Titre */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Titre</label>
            <input 
              name="titre" 
              value={formData.titre} 
              onChange={handleChange} 
              className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none" 
            />
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Date d'upload</label>
            <input 
              type="datetime-local" 
              name="uploadedAt" 
              value={formData.uploadedAt} 
              onChange={handleChange} 
              className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none" 
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows={4} 
              className="border border-[#7ED4D1] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#30B2AC] outline-none resize-none" 
            />
          </div>
          
          {/* Uploaded By */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Auteur (Modifié par)</label>
            <select 
              name="uploadedById" 
              value={formData.uploadedById} 
              onChange={handleChange} 
              className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none"
            >
              <option value={0}>Sélectionner l'auteur</option>
              <option value={2}>MARJANI Abdelatif</option>
              <option value={3}>NADIR Hamza</option>
              <option value={4}>BOUKOUCH Hassan</option>
            </select>
          </div>

          {/* Type ID */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Type de document</label>
            <select 
              name="typeId" 
              value={formData.typeId} 
              onChange={handleChange} 
              className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none"
            >
              <option value={0}>Choisir le type</option>
              <option value={1}>PDF</option>
              <option value={2}>IMAGE</option>
              <option value={3}>VIDEO</option>
            </select>
          </div>

          {/* SECTION FICHIER CORRIGÉE */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-[#1D6F6B] mb-2">
              Fichier (Optionnel : sélectionner pour remplacer)
            </label>
            <div className="relative flex items-center justify-between border border-[#7ED4D1] rounded-lg px-4 h-11 bg-gray-50 hover:bg-white transition-all overflow-hidden">
              <span className="truncate text-gray-600 text-sm">
                {formData.url instanceof File 
                  ? `Nouveau : ${formData.url.name}` 
                  : (formData.url ? `Actuel : ${String(formData.url).split('/').pop()}` : "Aucun fichier sélectionné")}
              </span>
              
              <input
                type="file"
                name="file"
                accept=".pdf,.jpg,.png,.mp4"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              
              <span className="px-4 py-1 rounded-md ml-2 text-[#30B2AC] font-bold border border-[#7ED4D1] bg-white whitespace-nowrap text-xs uppercase">
                Remplacer
              </span>
            </div>
          </div>
        </div>

        {/* ACTIONS BUTTONS */}
        <div className="flex justify-end gap-4 mt-10">
          <button 
            type="button"
            onClick={() => navigate("/ressources")} 
            className="border-2 border-[#7ED4D1] px-8 py-2 rounded-lg text-[#1D6F6B] font-semibold hover:bg-[#7ED4D1]/20 transition-colors"
          >
            Annuler
          </button>
          <button 
            type="button"
            onClick={handleUpdateSubmit} 
            className="bg-[#30B2AC] text-white px-10 py-2 rounded-lg hover:bg-[#1D6F6B] font-semibold shadow-lg transition-all active:scale-95"
          >
            Mettre à jour
          </button>
        </div>
      </div>
    </div>
  );
}

export default RessourceUpdate;