import type { EtudiantExamen } from '@/features/examens/types';
import { Mention } from '@/features/examens/types';

// Notes est un sous-ensemble de EtudiantExamen
export interface Note extends EtudiantExamen {
  // Hérité: etudiantId, note, mention, dateEvaluation
}

export interface UpdateNoteDTO {
  etudiantId: string;
  present?: boolean;
  note?: number;
  mention?: Mention;
  dateEvaluation?: string;
}

export interface NotesFilters {
  examenId: string; // Required - on récupère les notes d'un examen
  page?: number;
  pageSize?: number;
}
