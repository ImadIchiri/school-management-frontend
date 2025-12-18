import React, { useState } from 'react';
import { Trash2, Edit2, FileText } from 'lucide-react';
import type { Absence, AbsenceFilters } from '@/features/absences/types';
import { StatutPresence } from '@/features/absences/types';
import { Select } from '@/shared/components/Select';

interface AbsenceListProps {
  absences: Absence[];
  loading: boolean;
  onEdit: (absence: Absence) => void;
  onDelete: (id: string) => void;
  onJustify: (absence: Absence) => void;
  onFiltersChange: (filters: AbsenceFilters) => void;
}

export const AbsenceList: React.FC<AbsenceListProps> = ({
  absences,
  loading,
  onEdit,
  onDelete,
  onJustify,
  onFiltersChange,
}) => {
  const [filters, setFilters] = useState<AbsenceFilters>({});

  const handleFilterChange = (key: keyof AbsenceFilters, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const getStatutColor = (statut: StatutPresence) => {
    switch (statut) {
      case StatutPresence.PRESENT:
        return 'bg-green-100 text-green-800';
      case StatutPresence.ABSENT:
        return 'bg-red-100 text-red-800';
      case StatutPresence.RETARD:
        return 'bg-yellow-100 text-yellow-800';
      case StatutPresence.JUSTIFIE:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Filtrer par étudiant..."
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
          onChange={(e) => handleFilterChange('etudiantId', e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrer par cours..."
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
          onChange={(e) => handleFilterChange('coursId', e.target.value)}
        />
        <Select
          options={Object.values(StatutPresence).map((s) => ({
            value: s,
            label: s,
          }))}
          onChange={(e) => handleFilterChange('statut', e.target.value as StatutPresence)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">
                Étudiant
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Cours
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Date
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Statut
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Motif
              </th>
              <th className="px-6 py-4 text-right font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Chargement...
                </td>
              </tr>
            ) : absences.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Aucune absence trouvée
                </td>
              </tr>
            ) : (
              absences.map((absence) => (
                <tr key={absence.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-gray-900 font-medium">
                    {absence.etudiant?.user.prenom}{' '}
                    {absence.etudiant?.user.nom}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {absence.cours?.nom || '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(absence.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getStatutColor(
                        absence.statut
                      )}`}
                    >
                      {absence.statut}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {absence.motif || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {absence.statut !== StatutPresence.JUSTIFIE && (
                        <button
                          onClick={() => onJustify(absence)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Justifier"
                        >
                          <FileText size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => onEdit(absence)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(absence.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
