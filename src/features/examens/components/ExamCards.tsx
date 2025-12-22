import React, { useState } from 'react';
import { CalendarDays, MapPin, Clock } from 'lucide-react';
import type { Examen, ExamenFilters } from '@/features/examens/types';
import { formatDate } from '@/lib/dateUtils';

interface ExamCardsProps {
  examens: Examen[];
  loading: boolean;
  onEdit: (examen: Examen) => void;
  onView: (id: string) => void;
  onDelete: (id: string) => void;
  onFiltersChange: (filters: ExamenFilters) => void;
}

export const ExamCards: React.FC<ExamCardsProps> = ({
  examens,
  loading,
  onEdit,
  onView,
  onDelete,
  onFiltersChange,
}) => {
  const [filters, setFilters] = useState<ExamenFilters>({});

  const handleFilterChange = (key: keyof ExamenFilters, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-6">
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

      {/* Cards Grid */}
      {loading ? (
        <div className="text-center text-gray-600 py-8">Chargement...</div>
      ) : examens.length === 0 ? (
        <div className="text-center text-gray-600 py-8">Aucun examen trouvé</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {examens.map((examen) => (
            <div
              key={examen.id}
              className="rounded-xl bg-teal-50/70 border border-teal-200 p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-teal-700">
                  {examen.titre}
                </h3>
                <p className="text-teal-800/80">
                  {examen.module?.nom || '-'}
                </p>
              </div>

              <div className="mt-4 space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <CalendarDays className="text-teal-600" size={18} />
                  <span>{formatDate(examen.dateDebut)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="text-teal-600" size={18} />
                  <span>{examen.salle?.nom || examen.salleId || '—'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="text-teal-600" size={18} />
                  <span>
                    {examen.dureeMinutes ? `${Math.floor(examen.dureeMinutes / 60)}h${examen.dureeMinutes % 60 ? examen.dureeMinutes % 60 : ''}` : '—'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => onView(examen.id)}
                  className="px-4 py-2 bg-white border-2 border-teal-600 text-teal-700 rounded-lg hover:bg-teal-50 transition"
                >
                  Détails
                </button>
                <button
                  onClick={() => onEdit(examen)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                >
                  Modifier
                </button>
                <button
                  onClick={() => onDelete(examen.id)}
                  className="ml-auto px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
