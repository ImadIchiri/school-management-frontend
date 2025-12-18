import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useExamenById, useUpdateExamen } from '@/features/examens/hooks';
import { ExamForm } from '@/features/examens/components/ExamForm';
import { useToast } from '@/shared/components/Toast';
import { Loading } from '@/shared/components/Loading';

export const ExamEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { examen, loading: loadingExamen, fetchExamen } = useExamenById(id);
  const { execute: updateExamen, loading: loadingUpdate, error } = useUpdateExamen();
  const { showToast } = useToast();

  // TODO: Récupérer depuis API
  const mockModules = [
    { id: '1', nom: 'Mathématiques' },
    { id: '2', nom: 'Physique' },
  ];

  const mockEnseignants = [
    { id: '1', nom: 'Dr. Dubois' },
    { id: '2', nom: 'Prof. Martin' },
  ];

  const mockEtudiants: never[] = [];

  const mockSalles = [
    { id: '1', nom: 'Salle 101' },
    { id: '2', nom: 'Salle 102' },
  ];

  useEffect(() => {
    if (id && !examen) {
      fetchExamen(id);
    }
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (!id) return;
    try {
      await updateExamen(id, data);
      showToast('success', 'Examen mis à jour avec succès');
      navigate(`/exams/${id}`);
    } catch (err: any) {
      showToast('error', err.message || 'Erreur lors de la mise à jour');
    }
  };

  if (loadingExamen) return <Loading fullPage text="Chargement de l'examen..." />;

  if (!examen) {
    return (
      <div className="max-w-2xl mx-auto py-8">
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          Examen non trouvé
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Éditer l'examen : {examen.titre}
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <ExamForm
        examen={examen}
        onSubmit={handleSubmit}
        loading={loadingUpdate}
        modules={mockModules}
        enseignants={mockEnseignants}
        etudiants={mockEtudiants}
        salles={mockSalles}
      />
    </div>
  );
};
