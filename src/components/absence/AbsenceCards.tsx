import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import type { Absence, AbsenceFilters, StatutPresence } from '@/features/absences/types';
import { formatDate } from '@/lib/dateUtils';

interface AbsenceCardsProps {
  absences: Absence[];
  loading: boolean;
  onEdit: (absence: Absence) => void;
  onView: (id: string) => void;
  onDelete?: (id: string) => void;
  onFiltersChange: (filters: AbsenceFilters) => void;
}

const getStatutStyle = (statut: StatutPresence) => {
  switch (statut) {
    case 'PRESENT':
      return 'bg-green-100 text-green-700';
    case 'ABSENT':
      return 'bg-red-100 text-red-700';
    case 'RETARD':
      return 'bg-yellow-100 text-yellow-700';
    case 'JUSTIFIE':
      return 'bg-blue-100 text-blue-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

export const AbsenceCards: React.FC<AbsenceCardsProps> = ({
  absences,
  loading,
  onEdit,
  onView,
  onDelete,
  onFiltersChange,
}) => {
  const [filters, setFilters] = useState<AbsenceFilters>({});

  const handleFilterChange = (key: keyof AbsenceFilters, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <input
          type="date"
          placeholder="Date début..."
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
          onChange={(e) => handleFilterChange('from', e.target.value)}
        />
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none bg-white"
          onChange={(e) => handleFilterChange('statut', e.target.value as any)}
        >
          <option value="">Tous les statuts</option>
          <option value="PRESENT">Présent</option>
          <option value="ABSENT">Absent</option>
          <option value="RETARD">Retard</option>
          <option value="JUSTIFIE">Justifié</option>
        </select>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="text-center text-gray-600 py-8">Chargement...</div>
      ) : absences.length === 0 ? (
        <div className="text-center text-gray-600 py-8">Aucune absence trouvée</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {absences.map((absence) => (
            <div
              key={absence.id}
              className="rounded-xl bg-white border border-teal-200 p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Nom de l'étudiant */}
              <h3 className="text-xl font-semibold text-teal-700 mb-1">
                {absence.etudiant?.user?.prenom} {absence.etudiant?.user?.nom}
              </h3>
              
              {/* Cours */}
              <p className="text-teal-800/80 text-sm mb-4">
                {absence.cours?.nom || '-'}
              </p>

              {/* Date */}
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <CalendarDays className="text-teal-600" size={18} />
                <span className="text-sm">{formatDate(absence.date)}</span>
              </div>

              {/* Statut badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {absence.statut === 'ABSENT' && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutStyle('ABSENT')}`}>
                    Absent
                  </span>
                )}
                {absence.statut === 'RETARD' && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutStyle('RETARD')}`}>
                    Retard
                  </span>
                )}
                {absence.statut === 'JUSTIFIE' && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutStyle('JUSTIFIE')}`}>
                    Justifié
                  </span>
                )}
                {absence.statut === 'PRESENT' && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatutStyle('PRESENT')}`}>
                    Présent
                  </span>
                )}
              </div>

              {/* Boutons d'action */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => onView(absence.id)}
                  className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition"
                >
                  Détails
                </button>
                <button
                  onClick={() => onEdit(absence)}
                  className="px-4 py-2 bg-teal-600 text-white text-sm rounded-lg hover:bg-teal-700 transition"
                >
                  Modifier
                </button>
                {onDelete && (
                  <button
                    onClick={() => onDelete(absence.id)}
                    className="ml-auto px-4 py-2 border border-red-300 text-red-700 text-sm rounded-lg hover:bg-red-50 transition"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
