import { useState } from 'react';

export interface ExamenCard {
  id: string;
  titre: string;
  module: string;
  enseignant: string;
  surveillant: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
  coeff: number;
  type: string;
  statut: 'Planifié' | 'En cours' | 'Clôturé';
  description?: string;
}

interface ExamenListProps {
  onPlanExam?: () => void;
  onViewExam?: (exam: ExamenCard) => void;
  onEditExam?: (exam: ExamenCard) => void;
}

/**
 * 📝 EXAMEN LIST COMPONENT
 *
 * Présente une grille de cartes afin d'inspirer le design final.
 * Remplacez le tableau examCards par vos données lorsqu'elles seront prêtes.
 */
export function ExamenList({ onPlanExam, onViewExam, onEditExam }: ExamenListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const examCards: ExamenCard[] = [
    {
      id: '1',
      titre: 'Algorithmes - Partiel',
      module: 'Algorithmes Avancés',
      enseignant: 'Pr. Hamid El Idrissi',
      surveillant: 'Mme. Nadia Lahlou',
      date: '2025-12-16',
      heureDebut: '09:00',
      heureFin: '11:00',
      salle: 'B201',
      coeff: 2,
      type: 'Partiel',
      statut: 'Planifié',
      description: 'Épreuve écrite portant sur la complexité des algorithmes et les structures avancées.',
    },
    {
      id: '2',
      titre: 'Base de Données - Final',
      module: 'Systèmes d’Information',
      enseignant: 'Pr. Sara Benali',
      surveillant: 'M. Rachid Tazi',
      date: '2025-12-18',
      heureDebut: '14:30',
      heureFin: '16:30',
      salle: 'Amphi A',
      coeff: 3,
      type: 'Final',
      statut: 'Clôturé',
      description: 'Évaluation de fin de semestre sur la modélisation et l’optimisation SQL.',
    },
    {
      id: '3',
      titre: 'Réseaux - TP noté',
      module: 'Administration Réseau',
      enseignant: 'Pr. Youssef Alami',
      surveillant: 'Mme. Leila Mansouri',
      date: '2025-12-20',
      heureDebut: '11:00',
      heureFin: '12:30',
      salle: 'Lab R1',
      coeff: 1,
      type: 'TP',
      statut: 'En cours',
      description: 'Configuration d’un réseau local sécurisé et tests de performance.',
    },
  ];

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">Examens</h2>
          <p className="text-sm text-slate-500">
            Visualisez rapidement les examens programmés, leurs coefficients et les salles.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setViewMode((mode) => (mode === 'grid' ? 'list' : 'grid'))}
            className={`rounded-md border px-3 py-2 text-sm font-medium transition ${viewMode === 'list' ? 'border-teal-500 bg-teal-500 text-white hover:bg-teal-600' : 'border-teal-500 text-teal-600 hover:bg-teal-50'}`}
          >
            {viewMode === 'grid' ? 'Mode liste' : 'Mode cartes'}
          </button>
          <button
            onClick={() => onPlanExam?.()}
            className="rounded-md bg-teal-500 px-3 py-2 text-sm font-medium text-white hover:bg-teal-600"
          >
            + Planifier un examen
          </button>
        </div>
      </header>

      {viewMode === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {examCards.map((exam) => (
            <article
              key={exam.id}
              className="flex h-full flex-col rounded-2xl border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-teal-500">
                {exam.module}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-slate-800">{exam.titre}</h3>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Date</span>
                  <span>
                    {new Date(exam.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}{' '}
                    · {exam.heureDebut} - {exam.heureFin}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Enseignant</span>
                  <span>{exam.enseignant}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Salle</span>
                  <span>{exam.salle}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Coefficient</span>
                  <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">
                    x{exam.coeff}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                  {exam.type}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                    exam.statut === 'Planifié'
                      ? 'bg-teal-100 text-teal-600'
                      : exam.statut === 'En cours'
                      ? 'bg-amber-100 text-amber-600'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {exam.statut}
                </span>
              </div>

              <div className="mt-auto flex gap-3 pt-5">
                <button
                  type="button"
                  onClick={() => onViewExam?.(exam)}
                  className="flex-1 rounded-md border border-teal-500 px-3 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50"
                >
                  Détails
                </button>
                <button
                  type="button"
                  onClick={() => onEditExam?.(exam)}
                  className="flex-1 rounded-md bg-teal-500 px-3 py-2 text-sm font-medium text-white hover:bg-teal-600"
                >
                  Modifier
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {examCards.map((exam) => (
            <article
              key={exam.id}
              className="flex flex-col gap-4 rounded-xl border border-teal-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center"
            >
              <div className="sm:w-1/3">
                <p className="text-xs font-semibold uppercase text-teal-600">{exam.module}</p>
                <h3 className="text-base font-semibold text-slate-800">{exam.titre}</h3>
                <p className="text-xs text-slate-500">{exam.type}</p>
              </div>
              <div className="grid flex-1 gap-2 text-sm text-slate-600 sm:grid-cols-3">
                <div>
                  <p className="font-medium text-slate-700">Calendrier</p>
                  <p>
                    {new Date(exam.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <p>{exam.heureDebut} - {exam.heureFin}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Encadrement</p>
                  <p>{exam.enseignant}</p>
                  <p className="text-xs text-slate-500">Surveillant : {exam.surveillant}</p>
                </div>
                <div>
                  <p className="font-medium text-slate-700">Logistique</p>
                  <p>Salle {exam.salle}</p>
                  <p className="text-xs text-orange-500">Coefficient x{exam.coeff}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onViewExam?.(exam)}
                  className="rounded-md border border-teal-500 px-3 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50"
                >
                  Détails
                </button>
                <button
                  type="button"
                  onClick={() => onEditExam?.(exam)}
                  className="rounded-md bg-teal-500 px-3 py-2 text-sm font-medium text-white hover:bg-teal-600"
                >
                  Modifier
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
