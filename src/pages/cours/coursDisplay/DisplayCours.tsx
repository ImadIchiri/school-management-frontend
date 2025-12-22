import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoursById } from "@/services/cours";

type CoursDetailsType = {
  id: number;
  titre: string;
  description?: string;
  dateDebut: string;
  dateFin: string;
  // moduleId: number;
  // enseignantId?: number;
  // salleId?: number;
};

export default function CoursDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [cours, setCours] = useState<CoursDetailsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCours = async () => {
      try {
        if (!id) return;
        const response = await getCoursById(Number(id));
        setCours(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement du cours :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCours();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 bg-[#DFF6F5] min-h-screen flex justify-center items-center">
        <p className="text-[#1D6F6B] font-medium">Chargement...</p>
      </div>
    );
  }

  if (!cours) {
    return (
      <div className="p-6 bg-[#DFF6F5] min-h-screen flex justify-center items-center">
        <p className="text-red-500">Cours introuvable</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow border border-[#7ED4D1] p-6">
        
        <h1 className="text-2xl font-semibold text-[#1D6F6B] mb-4">
          {cours.titre}
        </h1>

        <p className="text-gray-700 mb-4">
          {cours.description || "Aucune description disponible"}
        </p>

        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>Date début :</strong>{" "}
            {new Date(cours.dateDebut).toLocaleDateString()}
          </p>
          <p>
            <strong>Date fin :</strong>{" "}
            {new Date(cours.dateFin).toLocaleDateString()}
          </p>
          {/* <p>
            <strong>Module ID :</strong> {cours.moduleId}
          </p>
          {cours.enseignantId && (
            <p>
              <strong>Enseignant ID :</strong> {cours.enseignantId}
            </p>
          )}
          {cours.salleId && (
            <p>
              <strong>Salle ID :</strong> {cours.salleId}
            </p>
          )} */}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded border border-[#7ED4D1] text-[#1D6F6B] hover:bg-[#DFF6F5]"
          >
            Retour
          </button>

          <button
            onClick={() => navigate(`/Cours/update/${cours.id}`)}
            className="px-4 py-2 rounded bg-[#30B2AC] text-white hover:bg-[#279D99]"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
