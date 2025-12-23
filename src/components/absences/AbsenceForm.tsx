import { useState } from 'react';
import { createAbsence, updateAbsence } from '@/services/absences';
// import type { Absence } from '@/api/absence.api';

interface AbsenceFormProps {
  absence?: any; // undefined = créer, sinon = modifier
  onSuccess?: () => void; // Callback après succès
  onCancel?: () => void;
}

/**
 * 📝 ABSENCE FORM COMPONENT
 * 
 * Formulaire pour créer ou modifier une absence
 * 
 * PROPS (Paramètres):
 * - absence: l'absence à modifier (optionnel)
 * - onSuccess: fonction à appeler après succès
 * - onCancel: fonction à appeler pour annuler
 */
export function AbsenceForm({ absence, onSuccess, onCancel }: AbsenceFormProps) {
  // 1️⃣ STATE: Variables du formulaire
  const [formData, setFormData] = useState({
    etudiantId: absence?.etudiantId || '',
    coursId: absence?.coursId || '',
    date: absence?.date ? new Date(absence.date).toISOString().split('T')[0] : '',
    statut: absence?.statut || 'PRESENT',
    motif: absence?.motif || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2️⃣ FONCTION: Gère les changements de formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Mise à jour du state avec les nouvelles valeurs
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3️⃣ FONCTION: Soumet le formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    setLoading(true);
    setError(null);

    try {
      // Convertir les chaînes en nombres si nécessaire
      const data = {
        etudiantId: parseInt(formData.etudiantId),
        coursId: parseInt(formData.coursId),
        date: new Date(formData.date),
        statut: formData.statut,
        motif: formData.motif || null,
      };

      if (absence?.id) {
        // Modifier une absence existante
        await updateAbsence({id: absence.id, ...data});
      } else {
        // Créer une nouvelle absence
        await createAbsence(data);
      }

      // Si succès, appeler la fonction callback
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  // 4️⃣ RENDU: Affichage du formulaire
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">
        {absence ? 'Modifier une absence' : 'Créer une absence'}
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block text-sm font-medium">Étudiant ID *</label>
        <input
          type="number"
          name="etudiantId"
          value={formData.etudiantId}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1"
          placeholder="ID de l'étudiant"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Cours ID *</label>
        <input
          type="number"
          name="coursId"
          value={formData.coursId}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1"
          placeholder="ID du cours"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Date *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Statut *</label>
        <select
          name="statut"
          value={formData.statut}
          onChange={handleChange}
          className="w-full border px-2 py-1"
        >
          <option value="PRESENT">Présent</option>
          <option value="ABSENT">Absent</option>
          <option value="RETARD">Retard</option>
          <option value="JUSTIFIE">Justifié</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Motif (optionnel)</label>
        <textarea
          name="motif"
          value={formData.motif}
          onChange={handleChange}
          className="w-full border px-2 py-1"
          placeholder="Raison de l'absence..."
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
