import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Grid3x3 } from 'lucide-react';
import { useExamenById, useUpdateExamen } from '@/features/examens/hooks';
import { StudentExamTable } from '@/features/examens/components/StudentExamTable';
import { useToast } from '@/shared/components/Toast';
import { Loading } from '@/shared/components/Loading';
import type { EtudiantExamen } from '@/features/examens/types';

export const NotesPage: React.FC = () => {
  const { examenId } = useParams<{ examenId: string }>();
  const { examen, loading: loadingExamen, fetchExamen } = useExamenById(examenId);
  const { execute: updateExamen, loading: loadingUpdate } = useUpdateExamen();
  const { showToast } = useToast();

  useEffect(() => {
    if (examenId && !examen) {
      fetchExamen(examenId);
    }
  }, [examenId]);

  const handleSaveNotes = async (etudiants: EtudiantExamen[]) => {
    if (!examenId) return;

    try {
      // Mapper les étudiants pour le PUT request
      const updateData = {
        etudiants: etudiants.map((e) => ({
          etudiantId: e.etudiantId,
          present: e.present,
          note: e.note,
          mention: e.mention,
          dateEvaluation: e.dateEvaluation,
        })),
      };

      await updateExamen(examenId, updateData);
      showToast('success', 'Notes enregistrées avec succès');
      fetchExamen(examenId); // Refresh
    } catch (err: any) {
      showToast('error', err.message || 'Erreur lors de la sauvegarde des notes');
    }
  };

  if (loadingExamen) {
    return <Loading fullPage text="Chargement de l'examen..." />;
  }

  if (!examen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <p className="text-center text-gray-500">Examen non trouvé</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-700 mb-2">Notes des étudiants</h1>
          <p className="text-gray-600 text-lg">{examen.titre} - {examen.type}</p>
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2">
              <button className="p-2 bg-white border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition">
                <Grid3x3 size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <StudentExamTable
          examen={examen}
          onSave={handleSaveNotes}
          loading={loadingUpdate}
        />
      </div>
    </div>
  );
};
