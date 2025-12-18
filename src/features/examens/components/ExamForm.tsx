import React, { useState, useEffect } from 'react';
import type { Examen, CreateExamenDTO, UpdateExamenDTO } from '@/features/examens/types';
import { ExamenType } from '@/features/examens/types';
import type { Etudiant } from '@/types/common';
import { DatePicker } from '@/shared/components/DatePicker';
import { Select } from '@/shared/components/Select';

interface ExamFormProps {
  examen?: Examen;
  onSubmit: (data: CreateExamenDTO | UpdateExamenDTO) => Promise<void>;
  loading: boolean;
  modules?: Array<{ id: string; nom: string }>;
  enseignants?: Array<{ id: string; nom: string }>;
  etudiants?: Etudiant[];
  salles?: Array<{ id: string; nom: string }>;
}

export const ExamForm: React.FC<ExamFormProps> = ({
  examen,
  onSubmit,
  loading,
  modules = [],
  enseignants = [],
  etudiants = [],
  salles = [],
}) => {
  const [formData, setFormData] = useState<CreateExamenDTO>({
    titre: '',
    type: ExamenType.EXAMEN,
    moduleId: '',
    enseignantId: '',
    dateDebut: '',
    dateFin: '',
    coeff: undefined,
    dureeMinutes: undefined,
    salleId: undefined,
    etudiants: [],
  });

  const [selectedEtudiants, setSelectedEtudiants] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (examen) {
      setFormData({
        titre: examen.titre,
        type: examen.type,
        moduleId: examen.moduleId,
        enseignantId: examen.enseignantId,
        dateDebut: examen.dateDebut,
        dateFin: examen.dateFin,
        coeff: examen.coeff,
        dureeMinutes: examen.dureeMinutes,
        salleId: examen.salleId,
        etudiants: examen.etudiants.map((e) => ({ etudiantId: e.etudiantId })),
      });
      setSelectedEtudiants(examen.etudiants.map((e) => e.etudiantId));
    }
  }, [examen]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.titre.trim()) newErrors.titre = 'Titre requis';
    if (!formData.moduleId) newErrors.moduleId = 'Module requis';
    if (!formData.enseignantId)
      newErrors.enseignantId = 'Enseignant requis';
    if (!formData.dateDebut) newErrors.dateDebut = 'Date début requise';
    if (!formData.dateFin) newErrors.dateFin = 'Date fin requise';

    if (formData.dateDebut && formData.dateFin) {
      if (new Date(formData.dateDebut) >= new Date(formData.dateFin)) {
        newErrors.dateFin = 'La date fin doit être après la date début';
      }
    }

    if (formData.coeff && formData.coeff <= 0) {
      newErrors.coeff = 'Coefficient doit être > 0';
    }

    if (formData.dureeMinutes && formData.dureeMinutes <= 0) {
      newErrors.dureeMinutes = 'Durée doit être > 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = {
      ...formData,
      etudiants: selectedEtudiants.map((id) => ({ etudiantId: id })),
    };

    try {
      await onSubmit(submitData);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  const handleEtudiantToggle = (id: string) => {
    setSelectedEtudiants((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Titre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titre <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.titre}
          onChange={(e) =>
            setFormData({ ...formData, titre: e.target.value })
          }
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
            errors.titre ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ex: Examen Final Mathématiques"
        />
        {errors.titre && (
          <p className="text-sm text-red-500 mt-1">{errors.titre}</p>
        )}
      </div>

      {/* Type */}
      <div>
        <Select
          label="Type"
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value as ExamenType })
          }
          options={Object.entries(ExamenType).map(([key, value]) => ({
            value,
            label: key,
          }))}
          required
        />
      </div>

      {/* Module & Enseignant */}
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Module"
          value={formData.moduleId}
          onChange={(e) =>
            setFormData({ ...formData, moduleId: e.target.value })
          }
          options={modules.map((m) => ({ value: m.id, label: m.nom }))}
          error={errors.moduleId}
          required
        />
        <Select
          label="Enseignant"
          value={formData.enseignantId}
          onChange={(e) =>
            setFormData({ ...formData, enseignantId: e.target.value })
          }
          options={enseignants.map((e) => ({ value: e.id, label: e.nom }))}
          error={errors.enseignantId}
          required
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          label="Date Début"
          value={formData.dateDebut}
          onChange={(e) =>
            setFormData({ ...formData, dateDebut: e.target.value })
          }
          error={errors.dateDebut}
          required
        />
        <DatePicker
          label="Date Fin"
          value={formData.dateFin}
          onChange={(e) =>
            setFormData({ ...formData, dateFin: e.target.value })
          }
          error={errors.dateFin}
          required
        />
      </div>

      {/* Coeff & Durée */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coefficient (optionnel)
          </label>
          <input
            type="number"
            step="0.5"
            min="0"
            value={formData.coeff || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                coeff: e.target.value ? parseFloat(e.target.value) : undefined,
              })
            }
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
              errors.coeff ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ex: 2"
          />
          {errors.coeff && (
            <p className="text-sm text-red-500 mt-1">{errors.coeff}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Durée (minutes, optionnel)
          </label>
          <input
            type="number"
            min="0"
            value={formData.dureeMinutes || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                dureeMinutes: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition ${
              errors.dureeMinutes ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ex: 120"
          />
          {errors.dureeMinutes && (
            <p className="text-sm text-red-500 mt-1">{errors.dureeMinutes}</p>
          )}
        </div>
      </div>

      {/* Salle */}
      <Select
        label="Salle (optionnel)"
        value={formData.salleId || ''}
        onChange={(e) =>
          setFormData({ ...formData, salleId: e.target.value || undefined })
        }
        options={salles.map((s) => ({ value: s.id, label: s.nom }))}
      />

      {/* Étudiants */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionner les étudiants
        </label>
        <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3 space-y-2">
          {etudiants.length === 0 ? (
            <p className="text-gray-500 text-sm">Aucun étudiant disponible</p>
          ) : (
            etudiants.map((etudiant) => (
              <label
                key={etudiant.idEtudiant}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
              >
                <input
                  type="checkbox"
                  checked={selectedEtudiants.includes(
                    etudiant.idEtudiant
                  )}
                  onChange={() =>
                    handleEtudiantToggle(etudiant.idEtudiant)
                  }
                  className="rounded"
                />
                <span className="text-sm text-gray-700">
                  {etudiant.user.prenom} {etudiant.user.nom}
                </span>
              </label>
            ))
          )}
        </div>
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
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Chargement...' : examen ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
};
