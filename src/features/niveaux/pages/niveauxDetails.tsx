import { useParams, useNavigate } from "react-router-dom";
import { useNiveauDetails } from "../components/niveauxDetails";
import { FaEdit, FaTrash } from "react-icons/fa";

const NiveauDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { niveau, loading, deleteNiveau } = useNiveauDetails(Number(id));

  if (loading) return <p className="text-center text-[#1D6F6B] font-medium">Chargement...</p>;
  if (!niveau) return <p className="text-center text-[#1D6F6B] font-medium">Niveau non trouvé</p>;

  return (
    <div className="p-8 min-h-screen bg-[#DFF6F5] font-sans">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#1D6F6B]">Détails du Niveau</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/niveaux/edit/${niveau.id}`)}
            className="p-2 rounded-lg bg-[#F2C94C] text-[#1D6F6B] hover:opacity-90 transition"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => {
              deleteNiveau();
              navigate("/niveaux");
            }}
            className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow border border-[#30B2AC] max-w-xl">
        <p className="mb-2"><strong>Année:</strong> {niveau.anneeLabel}</p>
        <p className="mb-2"><strong>Date début:</strong> {niveau.dateDebut}</p>
        <p className="mb-2"><strong>Date fin:</strong> {niveau.dateFin}</p>
        <p className="mb-2"><strong>Filière ID:</strong> {niveau.filiereId}</p>
      </div>
    </div>
  );
};

export default NiveauDetailsPage;
