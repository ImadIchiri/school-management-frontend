import React, { useState, useEffect } from 'react';
import type { Examen, EtudiantExamen } from '@/features/examens/types';
import { Mention } from '@/features/examens/types';
import { Save } from 'lucide-react';

interface StudentExamTableProps {
  examen: Examen;
  onSave: (etudiants: EtudiantExamen[]) => Promise<void>;
  loading: boolean;
}

export const StudentExamTable: React.FC<StudentExamTableProps> = ({
  examen,
  onSave,
  loading,
}) => {
  const [editedEtudiants, setEditedEtudiants] = useState<EtudiantExamen[]>(
    examen.etudiants
  );

  useEffect(() => {
    setEditedEtudiants(examen.etudiants);
  }, [examen]);

  const handleFieldChange = (
    index: number,
    field: keyof EtudiantExamen,
    value: any
  ) => {
    const updated = [...editedEtudiants];
    updated[index] = { ...updated[index], [field]: value };
    setEditedEtudiants(updated);
  };

  const handleSave = async () => {
    await onSave(editedEtudiants);
  };

  return (
    <div className="space-y-4">
      {/* Header with Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
        >
          <Save size={18} />
          {loading ? 'Sauvegarde...' : 'Enregistrer'}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-600 text-white sticky top-0">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">
                Étudiant
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Présent
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Note (/20)
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Mention
              </th>
              <th className="px-6 py-4 text-center font-semibold">
                Date Éval
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {editedEtudiants.map((etudiant, index) => (
              <tr key={etudiant.etudiantId} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {etudiant.etudiant?.user.prenom}{' '}
                      {etudiant.etudiant?.user.nom}
                    </span>
                    <span className="text-xs text-gray-500">
                      {etudiant.etudiantId}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={etudiant.present || false}
                    onChange={(e) =>
                      handleFieldChange(index, 'present', e.target.checked)
                    }
                    className="rounded text-teal-600 focus:ring-teal-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.5"
                    value={etudiant.note || ''}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        'note',
                        e.target.value ? parseFloat(e.target.value) : undefined
                      )
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-teal-500 outline-none"
                    placeholder="-"
                  />
                </td>
                <td className="px-6 py-4">
                  <select
                    value={etudiant.mention || ''}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        'mention',
                        e.target.value || undefined
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="">--</option>
                    {Object.values(Mention).map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="date"
                    value={
                      etudiant.dateEvaluation
                        ? etudiant.dateEvaluation.split('T')[0]
                        : ''
                    }
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        'dateEvaluation',
                        e.target.value ? new Date(e.target.value).toISOString() : undefined
                      )
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editedEtudiants.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-center text-gray-500">
            Aucun étudiant inscrit à cet examen
          </p>
        </div>
      )}
    </div>
  );
};
