import { useState, useEffect } from 'react';
import { getAbsences } from '@/api/absence.api';

/**
 * 📋 ABSENCE LIST COMPONENT
 * 
 * Affiche une liste de toutes les absences
 * 
 * CONCEPTS POUR DÉBUTANTS:
 * - useState: crée des variables "spéciales" qui déclenchent un re-render
 * - useEffect: code qui s'exécute après le rendu du composant
 */
export function AbsenceList() {
  // 1️⃣ STATE: Variables pour stocker les données
  const [absences, setAbsences] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2️⃣ EFFECT: S'exécute une seule fois au chargement du composant ([] = une seule fois)
  useEffect(() => {
    loadAbsences();
  }, []); // [] = dépendances vides = s'exécute une fois au montage

  // 3️⃣ FONCTION: Récupère les absences depuis l'API
  const loadAbsences = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAbsences();
      setAbsences(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement');
    } finally {
      setLoading(false);
    }
  };

  // 4️⃣ RENDU: Affichage du composant
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Absences</h1>
      
      {absences.length === 0 ? (
        <p>Aucune absence trouvée</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Date</th>
              <th className="border p-2">Étudiant</th>
              <th className="border p-2">Cours</th>
              <th className="border p-2">Statut</th>
              <th className="border p-2">Motif</th>
            </tr>
          </thead>
          <tbody>
            {absences.map((absence) => (
              <tr key={absence.id} className="hover:bg-gray-50">
                <td className="border p-2">
                  {new Date(absence.date).toLocaleDateString()}
                </td>
                <td className="border p-2">
                  {absence.etudiant?.user?.prenom} {absence.etudiant?.user?.nom}
                </td>
                <td className="border p-2">{absence.cours?.titre}</td>
                <td className="border p-2">
                  <span className={`px-2 py-1 rounded text-sm ${
                    absence.statut === 'PRESENT' ? 'bg-green-100' :
                    absence.statut === 'ABSENT' ? 'bg-red-100' :
                    absence.statut === 'JUSTIFIE' ? 'bg-blue-100' :
                    'bg-yellow-100'
                  }`}>
                    {absence.statut}
                  </span>
                </td>
                <td className="border p-2">{absence.motif || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
