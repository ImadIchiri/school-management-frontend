import type { Etudiant, Enseignant, Module, Salle } from '@/types/common';

// Enums - using const objects instead of enums for erasableSyntaxOnly compatibility
export const ExamenType = {
  DS: 'DS',
  EXAMEN: 'EXAMEN',
  CONTROLE: 'CONTROLE',
} as const;

export type ExamenType = typeof ExamenType[keyof typeof ExamenType];

export const Mention = {
  EXCELLENT: 'EXCELLENT',
  TRES_BIEN: 'TRES_BIEN',
  BIEN: 'BIEN',
  ASSEZ_BIEN: 'ASSEZ_BIEN',
  PASSABLE: 'PASSABLE',
  INSUFFISANT: 'INSUFFISANT',
} as const;

export type Mention = typeof Mention[keyof typeof Mention];

// EtudiantExamen - déclaré avant Examen
export interface EtudiantExamen {
  etudiantId: string;
  examenId: string;
  etudiant?: Etudiant;
  present?: boolean;
  note?: number;
  mention?: Mention;
  dateEvaluation?: string;
}

// Types de base
export interface Examen {
  id: string;
  titre: string;
  type: ExamenType;
  coeff?: number;
  dateDebut: string;
  dateFin: string;
  dureeMinutes?: number;
  moduleId: string;
  module?: Module;
  enseignantId: string;
  enseignant?: Enseignant;
  salleId?: string;
  salle?: Salle;
  etudiants: EtudiantExamen[];
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// DTOs
export interface CreateExamenDTO {
  titre: string;
  type: ExamenType;
  moduleId: string;
  enseignantId: string;
  dateDebut: string;
  dateFin: string;
  coeff?: number;
  dureeMinutes?: number;
  salleId?: string;
  etudiants?: Array<{ etudiantId: string }>;
}

export interface UpdateExamenDTO extends Partial<CreateExamenDTO> {
  etudiants?: Array<{
    etudiantId: string;
    present?: boolean;
    note?: number;
    mention?: Mention;
    dateEvaluation?: string;
  }>;
}

export interface ExamenFilters {
  moduleId?: string;
  enseignantId?: string;
  from?: string; // ISO date
  to?: string; // ISO date
  page?: number;
  pageSize?: number;
}
