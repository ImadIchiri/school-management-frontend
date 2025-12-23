import { useState, useEffect } from 'react';

/**
 * 👨‍🎓 ETUDIANT LIST COMPONENT
 * 
 * TEMPLATE pour afficher une liste d'étudiants
 * À adapter selon vos besoins
 */
export function EtudiantList() {
  const [etudiants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEtudiants();
  }, []);

  const loadEtudiants = async () => {
    setLoading(true);
    setError(null);
    try {
      // À implémenter: const data = await getEtudiants();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Étudiants</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Matricule</th>
            <th className="border p-2">Nom</th>
            <th className="border p-2">Prénom</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Filière</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {etudiants.map((etudiant: any) => (
            <tr key={etudiant.id} className="hover:bg-gray-50">
              <td className="border p-2">{etudiant.matricule}</td>
              <td className="border p-2">{etudiant.user?.nom}</td>
              <td className="border p-2">{etudiant.user?.prenom}</td>
              <td className="border p-2">{etudiant.user?.email}</td>
              <td className="border p-2">{etudiant.filiere?.nom}</td>
              <td className="border p-2">
                <button className="text-blue-500 mr-2">Voir</button>
                <button className="text-red-500">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
