import { useParams, useNavigate } from "react-router-dom";

export default function RessourceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow border border-[#7ED4D1] p-6">
        <h1 className="text-2xl font-semibold text-[#1D6F6B] mb-4">
          Ressource {id}
        </h1>
        <p className="text-gray-700 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Ce module contient les détails complets, cours associés,
          enseignants et niveaux.
        </p>
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Niveau :</strong> Bac +2</p>
          <p><strong>Filière :</strong> Informatique</p>
          <p><strong>Status :</strong> Actif</p>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => navigate(-1)} className="px-4 py-2 rounded border border-[#7ED4D1] text-[#1D6F6B] hover:bg-[#DFF6F5]">
            Retour
          </button>
          <button onClick={() => navigate(`/ressources/update/${id}`)} className="px-4 py-2 rounded bg-[#30B2AC] text-white hover:bg-[#279D99]">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
