import { useState } from 'react';
import { AbsenceList, AbsenceForm } from '@/components/absences';

/**
 * 📄 ABSENCES PAGE
 * 
 * Page principale pour gérer les absences
 * Affiche la liste et permet de créer/modifier
 */
export default function AbsencesPage() {
  // Contrôle l'affichage du formulaire
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Absences</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showForm ? 'Annuler' : '+ Ajouter une absence'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-gray-50 p-4 rounded">
          <AbsenceForm 
            onSuccess={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <AbsenceList />
    </div>
  );
}
