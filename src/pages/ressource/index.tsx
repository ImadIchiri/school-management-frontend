import { useState, useEffect } from "react";
import { FiGrid, FiList, FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getRessources, createRessource, deleteRessource } from "@/services/ressources";
import type {RessourceAttributesTypes} from "@/services/ressources"

export default function Ressource() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [ressources, setRessources] = useState<RessourceAttributesTypes[]>([]);
  const [newRessource, setNewRessource] = useState<RessourceAttributesTypes>({
    titre: "",
    description: "",
    url: "",
    uploadedAt: "",
    uploadedById: 0,
    typeId: 0
  });

  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; id: number | null }>({
    open: false,
    id: null
  });

  // FETCH RESSOURCES
  useEffect(() => {
    const fetchRessources = async () => {
      try {
        const res = await getRessources();
        setRessources(res.data);
      } catch (error) {
        console.error("Erreur récupération ressources :", error);
      }
    };
    fetchRessources();
  }, []);

  // HANDLE FORM CHANGE (CORRIGÉ POUR TYPESCRIPT)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "file") {
      const fileInput = e.target as HTMLInputElement;
      // Vérification de sécurité pour éviter l'erreur 'possibly null'
      if (fileInput.files && fileInput.files.length > 0) {
        setNewRessource((prev) => ({ ...prev, url: fileInput.files![0] }));
      }
    } else {
      setNewRessource((prev) => ({
        ...prev,
        [name]: name === "uploadedById" || name === "typeId" ? Number(value) : value
      }));
    }
  };

  // CREATE RESSOURCE
  const handleCreateRessource = async () => {
    if (!newRessource.titre || !newRessource.uploadedAt || !newRessource.uploadedById || !newRessource.typeId || !newRessource.url) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titre", newRessource.titre);
      formData.append("description", newRessource.description || "");
      formData.append("uploadedAt", newRessource.uploadedAt);
      formData.append("uploadedById", String(newRessource.uploadedById));
      formData.append("typeId", String(newRessource.typeId));
      formData.append("file", newRessource.url as File);

      const res = await createRessource(formData);
      setRessources((prev) => [...prev, res.data]);
      setShowModal(false);
      setNewRessource({ titre: "", description: "", url: "", uploadedAt: "", uploadedById: 0, typeId: 0 });
      alert("Ressource ajoutée avec succès");
    } catch (error) {
      console.error("Erreur création ressource :", error);
      alert("Erreur lors de la création");
    }
  };

  const deleteRessourceConfirmed = async (id: number) => {
    try {
      await deleteRessource(id);
      setRessources((prev) => prev.filter((r) => r.id !== id));
      setConfirmDelete({ open: false, id: null });
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };

  const typeMapping: { [key: number]: string } = { 1: "PDF", 2: "IMAGE", 3: "VIDEO" };

  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen font-sans">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#1D6F6B]">Ressources</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setView(view === "grid" ? "list" : "grid")} className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7ED4D1] text-[#1D6F6B]">
            {view === "grid" ? <FiList size={20} /> : <FiGrid size={20} />}
          </button>
          <button onClick={() => setShowModal(true)} className="h-10 px-4 rounded-lg bg-[#30B2AC] text-white hover:bg-[#1D6F6B] transition-colors">
            + Ajouter
          </button>
        </div>
      </div>

      {/* GRID VIEW */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ressources.map((r) => (
            <div key={r.id} className="group bg-white rounded-xl border border-[#7ED4D1] p-4 shadow relative">
              <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition z-20">
                <FiEye onClick={() => navigate(`/ressources/display/${r.id}`)} className="cursor-pointer hover:scale-125" />
              </button>
              <h3 className="text-lg font-semibold text-[#1D6F6B]">{r.titre}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{r.description || "Pas de description"}</p>
              <div className="flex justify-end gap-2 mt-4">
                <FiEdit onClick={() => navigate(`/ressources/update/${r.id}`)} className="text-blue-600 cursor-pointer hover:scale-125" />
                <FiTrash onClick={() => setConfirmDelete({ open: true, id: r.id ?? null })} className="text-red-600 cursor-pointer hover:scale-125" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIST VIEW */}
      {view === "list" && (
        <div className="bg-white rounded-xl shadow border border-[#7ED4D1] overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-[#30B2AC] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Titre</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ressources.map((r) => (
                <tr key={r.id} className="border-t hover:bg-[#F2FBFB] transition group">
                  <td className="px-4 py-3 truncate max-w-xs">{r.titre}</td>
                  <td className="px-4 py-3 truncate max-w-sm text-gray-500">{r.description || "—"}</td>
                  <td className="px-4 py-3 text-center">{typeMapping[r.typeId] || "—"}</td>
                  <td className="px-4 py-3">{r.uploadedAt ? new Date(r.uploadedAt).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3 text-center flex justify-center gap-3">
                    <FiEye onClick={() => navigate(`/ressources/display/${r.id}`)} className="cursor-pointer hover:scale-125 text-[#1D6F6B]" />
                    <FiEdit onClick={() => navigate(`/ressources/update/${r.id}`)} className="text-blue-600 cursor-pointer hover:scale-125" />
                    <FiTrash onClick={() => setConfirmDelete({ open: true, id: r.id ?? null })} className="text-red-600 cursor-pointer hover:scale-125" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* CREATE  */}
    {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-xl w-full max-w-3xl p-8 border border-[#7ED4D1] shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-[#1D6F6B]">Créer une ressource</h3>
        <button 
          onClick={() => setShowModal(false)} 
          className="text-[#30B2AC] hover:text-red-500 text-2xl font-bold transition-colors"
        >
          ✕
        </button>
      </div>

      {/* FORMULAIRE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Titre */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Titre de la ressource</label>
          <input 
            name="titre" 
            placeholder="Ex: Manuel de formation" 
            value={newRessource.titre} 
            onChange={handleChange} 
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all" 
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Date d'upload</label>
          <input 
            type="datetime-local" 
            name="uploadedAt" 
            value={newRessource.uploadedAt} 
            onChange={handleChange} 
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all" 
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2 flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Description</label>
          <textarea 
            name="description" 
            placeholder="Ajoutez une courte description..." 
            value={newRessource.description} 
            onChange={handleChange} 
            rows={3} 
            className="border border-[#7ED4D1] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#30B2AC] outline-none resize-none transition-all" 
          />
        </div>

        {/* Uploaded By */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-[#1D6F6B] mb-2">Auteur / Utilisateur</label>
          <select 
            name="uploadedById" 
            value={newRessource.uploadedById} 
            onChange={handleChange} 
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all"
          >
            <option value={0}>Sélectionner un utilisateur</option>
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
            value={newRessource.typeId} 
            onChange={handleChange} 
            className="border border-[#7ED4D1] rounded-lg px-4 h-11 bg-white focus:ring-2 focus:ring-[#30B2AC] outline-none transition-all"
          >
            <option value={0}>Choisir le format</option>
            <option value={1}>PDF</option>
            <option value={2}>IMAGE</option>
            <option value={3}>VIDEO</option>
          </select>
        </div>

        {/* SECTION FICHIER */}
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-[#1D6F6B] mb-2">Fichier à joindre</label>
          <div className="relative flex items-center justify-between border-2 border-dashed border-[#7ED4D1] rounded-lg px-4 h-16 bg-gray-50 hover:bg-[#F2FBFB] transition-colors overflow-hidden">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700 truncate max-w-[400px]">
                {newRessource.url instanceof File ? newRessource.url.name : "Glissez ou cliquez pour choisir un fichier"}
              </span>
              <span className="text-xs text-gray-400">PDF, JPG, PNG ou MP4</span>
            </div>
            
            <input
              type="file"
              name="file"
              accept=".pdf,.jpg,.png,.mp4"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            
            <span className="px-4 py-2 rounded-lg text-white font-bold bg-[#30B2AC] shadow-md whitespace-nowrap text-sm">
              Parcourir
            </span>
          </div>
        </div>
      </div>

      {/* BOUTONS D'ACTION */}
      <div className="flex justify-end gap-4 mt-10">
        <button 
          onClick={() => setShowModal(false)} 
          className="border-2 border-[#7ED4D1] px-6 py-2 rounded-xl text-[#1D6F6B] font-bold hover:bg-gray-100 transition-all"
        >
          Annuler
        </button>
        <button 
          onClick={handleCreateRessource} 
          className="bg-[#30B2AC] text-white px-8 py-2 rounded-xl font-bold hover:bg-[#1D6F6B] shadow-lg hover:shadow-[#30B2AC]/40 transition-all active:scale-95"
        >
          Ajouter la ressource
        </button>
      </div>

    </div>
  </div>
)}

      {/* CONFIRM DELETE */}
      {confirmDelete.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-2xl">
            <h2 className="font-bold text-xl mb-4 text-[#1D6F6B]">Confirmer la suppression</h2>
            <p className="mb-6 text-gray-600">Voulez-vous vraiment supprimer cette ressource ?</p>
            <div className="flex gap-3">
              <button onClick={() => confirmDelete.id && deleteRessourceConfirmed(confirmDelete.id)} className="w-full bg-[#30B2AC] text-white py-2 rounded-lg">
                Supprimer
              </button>
              <button onClick={() => setConfirmDelete({ open: false, id: null })} className="w-full bg-gray-200 py-2 rounded-lg">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}