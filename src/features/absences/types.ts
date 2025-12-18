import type { Etudiant, Cours } from '@/types/common';

// Enums
export const StatutPresence = {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  RETARD: 'RETARD',
  JUSTIFIE: 'JUSTIFIE',
} as const;

export type StatutPresence = typeof StatutPresence[keyof typeof StatutPresence];

// Types de base
export interface Absence {
  id: string;
  date: string;
  motif?: string;
  statut: StatutPresence;
  etudiantId: string;
  etudiant?: Etudiant;
  coursId: string;
  cours?: Cours;
  isDeleted: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// DTOs
export interface CreateAbsenceDTO {
  date: string; // ISO date
  motif?: string;
  statut?: StatutPresence; // default: PRESENT
  etudiantId: string;
  coursId: string;
}

export interface UpdateAbsenceDTO extends Partial<CreateAbsenceDTO> {}

export interface AbsenceFilters {
  etudiantId?: string;
  coursId?: string;
  from?: string; // ISO date
  to?: string; // ISO date
  statut?: StatutPresence;
  page?: number;
  pageSize?: number;
}
