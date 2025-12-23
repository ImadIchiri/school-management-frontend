import { type ChangeEvent, type FormEvent, useState } from 'react';
import { ExamenList, type ExamenCard } from '@/components/examens';
import { Modal } from '@/shared/components/Modal';

interface ExamFormState {
  titre: string;
  module: string;
  enseignant: string;
  surveillant: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
  coefficient: string;
  description: string;
}

const modules = [
  'Algorithmes Avancés',
  'Systèmes d’information',
  'Administration Réseau',
  'Architecture Logicielle',
];

const enseignants = [
  'Pr. Hamid El Idrissi',
  'Pr. Sara Benali',
  'Pr. Youssef Alami',
  'Pr. Salma Benjelloun',
];

const surveillants = [
  'Mme. Nadia Lahlou',
  'M. Rachid Tazi',
  'Mme. Leila Mansouri',
  'M. Omar Berrada',
];

const initialForm: ExamFormState = {
  titre: '',
  module: '',
  enseignant: '',
  surveillant: '',
  date: '',
  heureDebut: '',
  heureFin: '',
  salle: '',
  coefficient: '1',
  description: '',
};

export default function ExamensPage() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [selectedExam, setSelectedExam] = useState<ExamenCard | null>(null);
  const [form, setForm] = useState<ExamFormState>(initialForm);

  const handleOpenCreateModal = () => {
    setFormMode('create');
    setSelectedExam(null);
    setForm(initialForm);
    setIsFormModalOpen(true);
  };

  const handleViewExam = (exam: ExamenCard) => {
    setSelectedExam(exam);
    setIsDetailsModalOpen(true);
  };

  const handleEditExam = (exam: ExamenCard) => {
    setFormMode('edit');
    setSelectedExam(exam);
    setForm({
      titre: exam.titre,
      module: exam.module,
      enseignant: exam.enseignant,
      surveillant: exam.surveillant,
      date: exam.date,
      heureDebut: exam.heureDebut,
      heureFin: exam.heureFin,
      salle: exam.salle,
      coefficient: String(exam.coeff),
      description: exam.description ?? '',
    });
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setForm(initialForm);
    setFormMode('create');
    setSelectedExam(null);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedExam(null);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formMode === 'edit' && selectedExam) {
      console.table([{ id: selectedExam.id, ...form }]);
    } else {
      console.table([form]);
    }

    handleCloseFormModal();
  };

  return (
    <div className="p-6 space-y-6">
      <header className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6">
        <h1 className="text-3xl font-semibold text-slate-800">Gestion des Examens</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Planifiez vos examens, assignez les enseignants et surveillants, et précisez les horaires en quelques clics.
        </p>
      </header>

      <ExamenList onPlanExam={handleOpenCreateModal} onViewExam={handleViewExam} onEditExam={handleEditExam} />

      <Modal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        title={formMode === 'edit' ? 'Modifier un examen' : 'Planifier un examen'}
        size="lg"
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Nom de l’examen
              <input
                name="titre"
                value={form.titre}
                onChange={handleChange}
                placeholder="Ex: Algorithmes - Partiel"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                required
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Module
              <select
                name="module"
                value={form.module}
                onChange={handleChange}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Sélectionner un module
                </option>
                {modules.map((module) => (
                  <option key={module} value={module}>
                    {module}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Enseignant responsable
              <select
                name="enseignant"
                value={form.enseignant}
                onChange={handleChange}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Choisir l’enseignant
                </option>
                {enseignants.map((prof) => (
                  <option key={prof} value={prof}>
                    {prof}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Professeur surveillant
              <select
                name="surveillant"
                value={form.surveillant}
                onChange={handleChange}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                required
              >
                <option value="" disabled>
                  Choisir le surveillant
                </option>
                {surveillants.map((prof) => (
                  <option key={prof} value={prof}>
                    {prof}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Date
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                required
              />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Début
                <input
                  type="time"
                  name="heureDebut"
                  value={form.heureDebut}
                  onChange={handleChange}
                  className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                  required
                />
              </label>
              <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
                Fin
                <input
                  type="time"
                  name="heureFin"
                  value={form.heureFin}
                  onChange={handleChange}
                  className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
                  required
                />
              </label>
            </div>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Salle
              <input
                name="salle"
                value={form.salle}
                onChange={handleChange}
                placeholder="Ex: B201"
                className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              Coefficient
              <input
                type="number"
                name="coefficient"
                min="1"
                max="6"
                value={form.coefficient}
                onChange={handleChange}
                className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Informations supplémentaires
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Précisions sur les documents autorisés, la durée exacte, etc."
              className="rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none"
            />
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseFormModal}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="rounded-md bg-teal-500 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600"
            >
              {formMode === 'edit' ? 'Enregistrer les modifications' : 'Planifier l’examen'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isDetailsModalOpen}
        onClose={handleCloseDetailsModal}
        title="Détails de l’examen"
        size="md"
      >
        {selectedExam && (
          <div className="space-y-4 text-sm text-slate-600">
            <div className="rounded-md border border-slate-200 p-4">
              <p className="text-xs font-semibold uppercase text-teal-600">Module</p>
              <p className="text-base font-semibold text-slate-800">{selectedExam.module}</p>
              <p className="mt-1 text-sm text-slate-500">{selectedExam.titre}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-slate-200 p-3">
                <p className="text-xs font-semibold uppercase text-slate-500">Enseignant</p>
                <p className="text-sm font-medium text-slate-800">{selectedExam.enseignant}</p>
              </div>
              <div className="rounded-md border border-slate-200 p-3">
                <p className="text-xs font-semibold uppercase text-slate-500">Surveillant</p>
                <p className="text-sm font-medium text-slate-800">{selectedExam.surveillant}</p>
              </div>
              <div className="rounded-md border border-slate-200 p-3">
                <p className="text-xs font-semibold uppercase text-slate-500">Date</p>
                <p className="text-sm font-medium text-slate-800">
                  {new Date(selectedExam.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xs text-slate-500">{selectedExam.heureDebut} - {selectedExam.heureFin}</p>
              </div>
              <div className="rounded-md border border-slate-200 p-3">
                <p className="text-xs font-semibold uppercase text-slate-500">Salle</p>
                <p className="text-sm font-medium text-slate-800">{selectedExam.salle}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{selectedExam.type}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${selectedExam.statut === 'Planifié' ? 'bg-teal-100 text-teal-700' : selectedExam.statut === 'En cours' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-600'}`}>
                {selectedExam.statut}
              </span>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">Coefficient x{selectedExam.coeff}</span>
            </div>
            {selectedExam.description && (
              <p className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed">
                {selectedExam.description}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
