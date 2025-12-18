import React from 'react';
import { useNavigate } from 'react-router';
import { useCreateExamen } from '@/features/examens/hooks';
import { ExamForm } from '@/features/examens/components/ExamForm';
import { useToast } from '@/shared/components/Toast';

export const ExamCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { execute: createExamen, loading, error } = useCreateExamen();
  const { showToast } = useToast();

  // TODO: Récupérer depuis API
  const mockModules = [
    { id: '1', nom: 'Mathématiques' },
    { id: '2', nom: 'Physique' },
    { id: '3', nom: 'Chimie' },
    { id: '4', nom: 'Espagnole' },
  ];

  const mockEnseignants = [
    { id: '1', nom: 'Dr. Dubois' },
    { id: '2', nom: 'Prof. Martin' },
    { id: '3', nom: 'Mme. Lefevre' },
    { id: '4', nom: 'M. Garcia' },
  ];

  const mockEtudiants: never[] = [];

  const mockSalles = [
    { id: '1', nom: 'Salle 101' },
    { id: '2', nom: 'Salle 102' },
  ];

  const handleSubmit = async (data: any) => {
    try {
      await createExamen(data);
      showToast('success', 'Examen créé avec succès');
      navigate('/exams');
    } catch (err: any) {
      showToast('error', err.message || 'Erreur lors de la création');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Créer un nouvel examen
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      <ExamForm
        onSubmit={handleSubmit}
        loading={loading}
        modules={mockModules}
        enseignants={mockEnseignants}
        etudiants={mockEtudiants}
        salles={mockSalles}
      />
    </div>
  );
};
