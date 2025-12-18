import React, { useState, useEffect } from 'react';
import type { Absence, CreateAbsenceDTO, UpdateAbsenceDTO } from '@/features/absences/types';
import { StatutPresence } from '@/features/absences/types';
import { Select } from '@/shared/components/Select';
import type { Etudiant, Cours } from '@/types/common';

interface AbsenceFormProps {
  absence?: Absence;
  onSubmit: (data: CreateAbsenceDTO | UpdateAbsenceDTO) => Promise<void>;
  loading: boolean;
  etudiants?: Etudiant[];
  cours?: Cours[];
  isJustification?: boolean;
}

export const AbsenceForm: React.FC<AbsenceFormProps> = ({
  absence,
  onSubmit,
  loading,
  etudiants = [],
  cours = [],
  isJustification = false,
}) => {
  const [formData, setFormData] = useState<
    CreateAbsenceDTO | UpdateAbsenceDTO
  >({
    date: '',
    motif: '',
    statut: StatutPresence.ABSENT,
    etudiantId: '',
    coursId: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (absence) {
      setFormData({
        date: absence.date,
        motif: absence.motif,
        statut: absence.statut,
        etudiantId: absence.etudiantId,
        coursId: absence.coursId,
      });
    }
  }, [absence]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.date) newErrors.date = 'Date requise';
    if (!formData.etudiantId) newErrors.etudiantId = 'Étudiant requis';
    if (!formData.coursId) newErrors.coursId = 'Cours requis';

    if (
      formData.statut === StatutPresence.JUSTIFIE &&
      !formData.motif?.trim()
    ) {
      newErrors.motif = 'Motif requis pour justification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={formData.date ? formData.date.split('T')[0] : ''}
          onChange={(e) =>
            setFormData({ ...formData, date: e.target.value })
          }
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition ${
            errors.date ? 'border-red-500' : 'border-gray-300'
          }`}
          disabled={!!(isJustification && absence)}
        />
        {errors.date && (
          <p className="text-sm text-red-500 mt-1">{errors.date}</p>
        )}
      </div>

      {/* Étudiant */}
      <Select
        label="Étudiant"
        value={formData.etudiantId}
        onChange={(e) =>
          setFormData({ ...formData, etudiantId: e.target.value })
        }
        options={etudiants.map((e) => ({
          value: e.idEtudiant,
          label: `${e.user.prenom} ${e.user.nom}`,
        }))}
        error={errors.etudiantId}
        required
        disabled={!!(isJustification && absence)}
      />

      {/* Cours */}
      <Select
        label="Cours"
        value={formData.coursId}
        onChange={(e) => setFormData({ ...formData, coursId: e.target.value })}
        options={cours.map((c) => ({
          value: c.idCours,
          label: c.nom,
        }))}
        error={errors.coursId}
        required
        disabled={!!(isJustification && absence)}
      />

      {/* Statut */}
      <Select
        label="Statut"
        value={formData.statut || StatutPresence.ABSENT}
        onChange={(e) =>
          setFormData({
            ...formData,
            statut: e.target.value as StatutPresence,
          })
        }
        options={Object.values(StatutPresence).map((s) => ({
          value: s,
          label: s,
        }))}
        required
      />

      {/* Motif */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Motif
          {formData.statut === StatutPresence.JUSTIFIE && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
        <textarea
          value={formData.motif || ''}
          onChange={(e) =>
            setFormData({ ...formData, motif: e.target.value })
          }
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition ${
            errors.motif ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Entrer le motif de l'absence (certificat médical, etc.)"
          rows={4}
        />
        {errors.motif && (
          <p className="text-sm text-red-500 mt-1">{errors.motif}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          disabled={loading}
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading
            ? 'Chargement...'
            : absence
              ? isJustification
                ? 'Justifier'
                : 'Modifier'
              : 'Ajouter'}
        </button>
      </div>
    </form>
  );
};
