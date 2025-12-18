import React, { useEffect, useState } from 'react';
import { Plus, Grid3x3 } from 'lucide-react';
import {
  useAbsences,
  useCreateAbsence,
  useUpdateAbsence,
  useDeleteAbsence,
} from '@/features/absences/hooks';
import { AbsenceList } from '@/features/absences/components/AbsenceList';
import { AbsenceForm } from '@/features/absences/components/AbsenceForm';
import type { AbsenceFilters, Absence } from '@/features/absences/types';
import { useToast } from '@/shared/components/Toast';
import { Modal } from '@/shared/components/Modal';

export const AbsencePage: React.FC = () => {
  const { absences, loading, fetchAbsences } = useAbsences();
  const { execute: createAbsence, loading: loadingCreate } =
    useCreateAbsence();
  const { execute: updateAbsence, loading: loadingUpdate } =
    useUpdateAbsence();
  const { execute: deleteAbsence, loading: loadingDelete } =
    useDeleteAbsence();
  const { showToast } = useToast();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showJustifyModal, setShowJustifyModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [selectedAbsence, setSelectedAbsence] = useState<Absence | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Mock data - TODO: Récupérer depuis API
  const mockEtudiants: never[] = [];
  const mockCours: never[] = [];

  useEffect(() => {
    fetchAbsences();
  }, []);

  const handleCreateSubmit = async (data: any) => {
    try {
      await createAbsence(data);
      showToast('success', 'Absence créée avec succès');
      setShowCreateModal(false);
      fetchAbsences();
    } catch (err: any) {
      showToast('error', err.message || 'Erreur lors de la création');
    }
  };

  const handleEditSubmit = async (data: any) => {
    if (!selectedAbsence) return;
    try {
      await updateAbsence(selectedAbsence.id, data);
      showToast('success', 'Absence mise à jour avec succès');
      setShowEditModal(false);
      setSelectedAbsence(null);
      fetchAbsences();
    } catch (err: any) {
      showToast('error', err.message || 'Erreur lors de la mise à jour');
    }
  };

  const handleJustifySubmit = async (data: any) => {
    if (!selectedAbsence) return;
    try {
      await updateAbsence(selectedAbsence.id, {
        statut: 'JUSTIFIE',
        motif: data.motif,
      });
      showToast('success', 'Absence justifiée avec succès');
      setShowJustifyModal(false);
      setSelectedAbsence(null);
      fetchAbsences();
    } catch (err: any) {
      showToast('error', err.message || 'Erreur lors de la justification');
    }
  };

  const handleDelete = async (id: string) => {
    setSelectedId(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;
    try {
      await deleteAbsence(selectedId);
      showToast('success', 'Absence supprimée avec succès');
      fetchAbsences();
      setShowConfirmModal(false);
      setSelectedId(null);
    } catch (err: any) {
      showToast('error', err.message || 'Erreur lors de la suppression');
    }
  };

  const handleFiltersChange = (filters: AbsenceFilters) => {
    fetchAbsences(filters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-teal-700 mb-2">Absences</h1>
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2">
              <button className="p-2 bg-white border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition">
                <Grid3x3 size={20} />
              </button>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              <Plus size={20} />
              Create
            </button>
          </div>
        </div>

        {/* List */}
        <AbsenceList
          absences={absences}
          loading={loading}
          onEdit={(absence) => {
            setSelectedAbsence(absence);
            setShowEditModal(true);
          }}
          onDelete={handleDelete}
          onJustify={(absence) => {
            setSelectedAbsence(absence);
            setShowJustifyModal(true);
          }}
          onFiltersChange={handleFiltersChange}
        />

        {/* Create Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          size="xl"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-teal-700">Créer une absence</h2>
            <AbsenceForm
              onSubmit={handleCreateSubmit}
              loading={loadingCreate}
              etudiants={mockEtudiants}
              cours={mockCours}
            />
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setSelectedAbsence(null);
          }}
          size="xl"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-teal-700">Modifier l'absence</h2>
            {selectedAbsence && (
              <AbsenceForm
                absence={selectedAbsence}
                onSubmit={handleEditSubmit}
                loading={loadingUpdate}
                etudiants={mockEtudiants}
                cours={mockCours}
              />
            )}
          </div>
        </Modal>

        {/* Justify Modal */}
        <Modal
          isOpen={showJustifyModal}
          onClose={() => {
            setShowJustifyModal(false);
            setSelectedAbsence(null);
          }}
          size="xl"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-teal-700">Justifier l'absence</h2>
            {selectedAbsence && (
              <AbsenceForm
                absence={selectedAbsence}
                onSubmit={handleJustifySubmit}
                loading={loadingUpdate}
                etudiants={mockEtudiants}
                cours={mockCours}
                isJustification
              />
            )}
          </div>
        </Modal>

        {/* Confirmation Modal */}
        <Modal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
        >
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Confirmer la suppression
            </h2>
            <p className="text-gray-600">
              Êtes-vous sûr de vouloir supprimer cette absence ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                disabled={loadingDelete}
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                disabled={loadingDelete}
              >
                {loadingDelete ? 'Suppression...' : 'Supprimer'}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
