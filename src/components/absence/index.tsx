import React, { useEffect, useState } from 'react';
import { Plus, Grid3x3, LayoutList } from 'lucide-react';
import { useAbsences, useDeleteAbsence, useCreateAbsence } from '@/features/absences/hooks';
import type { AbsenceFilters } from '@/features/absences/types';
import { useToast } from '@/shared/components/Toast';
import { Modal } from '@/shared/components/Modal';
import { AbsenceCards } from './AbsenceCards';
import { AbsenceList } from '@/features/absences/components/AbsenceList';
import { AbsenceForm } from '@/features/absences/components/AbsenceForm';

export const Absences: React.FC = () => {
	const { absences, loading, fetchAbsences } = useAbsences();
	const { execute: deleteAbsence, loading: loadingDelete } = useDeleteAbsence();
	const { execute: createAbsence, loading: loadingCreate } = useCreateAbsence();
	const { showToast } = useToast();
	const [showConfirm, setShowConfirm] = useState(false);
	const [showCreateModal, setShowCreateModal] = useState(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [view, setView] = useState<'grid' | 'table'>('grid');

	useEffect(() => {
		fetchAbsences();
	}, []);

	const handleFiltersChange = (filters: AbsenceFilters) => {
		fetchAbsences(filters);
	};

	const handleDelete = async (id: string) => {
		setSelectedId(id);
		setShowConfirm(true);
	};

	const confirmDelete = async () => {
		if (!selectedId) return;
		try {
			await deleteAbsence(selectedId);
			showToast('success', 'Absence supprimée avec succès');
			fetchAbsences();
			setShowConfirm(false);
			setSelectedId(null);
		} catch (err: any) {
			showToast('error', err.message || 'Erreur lors de la suppression');
		}
	};

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

	return (
		<div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-teal-700 mb-2">Absences</h1>
					<div className="flex justify-between items-center mt-6">
						<div className="flex gap-2">
							<button
								className={`p-2 bg-white border-2 rounded-lg transition ${view === 'grid' ? 'border-teal-600 text-teal-600 hover:bg-teal-50' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
								title="Vue grille"
								onClick={() => setView('grid')}
							>
								<Grid3x3 size={20} />
							</button>
							<button
								className={`p-2 bg-white border-2 rounded-lg transition ${view === 'table' ? 'border-teal-600 text-teal-600 hover:bg-teal-50' : 'border-gray-300 text-gray-600 hover:bg-gray-50'}`}
								title="Vue tableau"
								onClick={() => setView('table')}
							>
								<LayoutList size={20} />
							</button>
						</div>
						<button
							onClick={() => setShowCreateModal(true)}
							className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
						>
							<Plus size={20} />
							Ajouter
						</button>
					</div>
				</div>

				{view === 'grid' ? (
					<AbsenceCards
						absences={absences}
						loading={loading}
						onEdit={() => {}}
						onView={() => {}}
						onDelete={handleDelete}
						onFiltersChange={handleFiltersChange}
					/>
				) : (
					<AbsenceList
						absences={absences}
						loading={loading}
						onEdit={() => {}}
						onDelete={handleDelete}
						onJustify={() => {}}
						onFiltersChange={handleFiltersChange}
					/>
				)}

				{/* Create Modal */}
				<Modal
					isOpen={showCreateModal}
					onClose={() => setShowCreateModal(false)}
					size="xl"
				>
					<div className="space-y-6">
						<h2 className="text-2xl font-semibold text-teal-700">Ajouter une absence</h2>
						<AbsenceForm 
							onSubmit={handleCreateSubmit} 
							loading={loadingCreate}
							etudiants={[]}
							cours={[]}
						/>
					</div>
				</Modal>

				{/* Confirmation Modal */}
				<Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
					<div className="space-y-4">
						<h2 className="text-xl font-semibold text-gray-900">Confirmer la suppression</h2>
						<p className="text-gray-600">Êtes-vous sûr de vouloir supprimer cette absence ?</p>
						<div className="flex justify-end gap-3">
							<button
								onClick={() => setShowConfirm(false)}
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

export default Absences;
