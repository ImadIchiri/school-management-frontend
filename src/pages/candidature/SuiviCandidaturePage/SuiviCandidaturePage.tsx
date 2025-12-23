import { useState, useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import * as candidatService from "@/services/candidat";
import type { CandidatAttributes } from "@/components/candidature";

export default function SuiviCandidaturePage() {
  const navigate = useNavigate();
  const [candidature, setCandidature] = useState<CandidatAttributes | null>(null);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openSheet = (c: CandidatAttributes) => {
    setCandidature(c);
    setSheetOpen(true);
  };

  const badgeColor = (etat?: CandidatAttributes["etat"]) => {
    switch (etat) {
      case "accepte":
        return "bg-green-100 text-green-700";
      case "refuse":
        return "bg-red-100 text-red-700";
      case "en_cours":
        return "bg-blue-100 text-blue-700";
      case "incomplet":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const badgeLabel = (etat?: CandidatAttributes["etat"]) => {
    switch (etat) {
      case "accepte":
        return "Accepté";
      case "refuse":
        return "Refusé";
      case "en_attente":
        return "En attente";
      case "en_cours":
        return "En cours";
      case "incomplet":
        return "Incomplet";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchCandidature = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("Utilisateur non connecté");

        const res = await candidatService.getAllCandidats();
        const userCandidature = res.data.data.find(
          (c: CandidatAttributes) => c.userId === Number(userId)
        );

        if (!userCandidature) throw new Error("Aucune candidature trouvée");

        // Si accepté, rediriger vers l'espace étudiant
        if (userCandidature.etat === "accepte") {
          navigate("/espace-etudiant");
          return;
        }

        setCandidature(userCandidature);
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidature();
  }, [navigate]);

  if (loading) {
    return <p className="text-center mt-10 text-[#1D6F6B] font-semibold">Chargement...</p>;
  }

  if (!candidature) {
    return <p className="text-center mt-10 text-red-600">Aucune candidature trouvée</p>;
  }

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-[#DFF6F5]">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-3xl font-bold text-[#1D6F6B] mb-6">Suivi de votre candidature</h1>
        <p><b>Nom :</b> {candidature.nom}</p>
        <p><b>Prénom :</b> {candidature.prenom}</p>
        <p><b>Filière :</b> {candidature.filiere}</p>
        <p><b>Niveau :</b> {candidature.niveau}</p>
        <p className="mt-4">
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(candidature.etat)}`}>
            {badgeLabel(candidature.etat)}
          </span>
        </p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => openSheet(candidature)}
            className="bg-[#7ED4D1] text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FiEye /> Détails
          </button>
        </div>
      </div>

      {/* Détails du candidat */}
      {sheetOpen && candidature && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setSheetOpen(false)} />
          <div className="w-full sm:w-[380px] bg-white h-full p-6 animate-slide-in">
            <h2 className="text-xl font-bold mb-4 text-[#1D6F6B]">Détails du candidat</h2>
            <p><b>User ID :</b> {candidature.userId}</p>
            <p><b>Nom :</b> {candidature.nom}</p>
            <p><b>Prénom :</b> {candidature.prenom}</p>
            <p><b>Filière :</b> {candidature.filiere}</p>
            <p><b>Niveau :</b> {candidature.niveau}</p>
            <p><b>État :</b> {badgeLabel(candidature.etat)}</p>
            <button
              onClick={() => setSheetOpen(false)}
              className="mt-6 bg-gray-200 px-4 py-2 rounded-lg w-full"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
