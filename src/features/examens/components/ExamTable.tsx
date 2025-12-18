import React, { useState } from 'react';
import { Trash2, Edit2, Eye } from 'lucide-react';
import type { Examen, ExamenFilters } from '@/features/examens/types';

interface ExamTableProps {
  examens: Examen[];
  loading: boolean;
  onEdit: (examen: Examen) => void;
  onDelete: (id: string) => void;
  onViewNotes: (id: string) => void;
  onFiltersChange: (filters: ExamenFilters) => void;
}

export const ExamTable: React.FC<ExamTableProps> = ({
  examens,
  loading,
  onEdit,
  onDelete,
  onViewNotes,
  onFiltersChange,
}) => {
  const [filters, setFilters] = useState<ExamenFilters>({});

  const handleFilterChange = (key: keyof ExamenFilters, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Filtrer par module..."
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
          onChange={(e) => handleFilterChange('moduleId', e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrer par enseignant..."
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
          onChange={(e) => handleFilterChange('enseignantId', e.target.value)}
        />
        <input
          type="date"
          placeholder="Depuis..."
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
          onChange={(e) => handleFilterChange('from', e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">
                Titre
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Type
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Module
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Date Début
              </th>
              <th className="px-6 py-4 text-left font-semibold">
                Coeff
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
            ) : examens.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                  Aucun examen trouvé
                </td>
              </tr>
            ) : (
              examens.map((examen) => (
                <tr
                  key={examen.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {examen.titre}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                      {examen.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {examen.module?.nom || '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(examen.dateDebut).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {examen.coeff || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onViewNotes(examen.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Voir les notes"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => onEdit(examen)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Modifier"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(examen.id)}
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
