import axiosInstance from '@/services/axios';
import { ENDPOINTS } from '@/config/api';
import type {
  Absence,
  CreateAbsenceDTO,
  UpdateAbsenceDTO,
  AbsenceFilters,
} from '@/features/absences/types';

/**
 * Récupère la liste des absences avec filtres optionnels
 */
export const getAbsences = async (filters?: AbsenceFilters): Promise<Absence[]> => {
  const params = new URLSearchParams();

  if (filters?.etudiantId) params.append('etudiantId', filters.etudiantId);
  if (filters?.coursId) params.append('coursId', filters.coursId);
  if (filters?.from) params.append('from', filters.from);
  if (filters?.to) params.append('to', filters.to);
  if (filters?.statut) params.append('statut', filters.statut);

  const response = await axiosInstance.get<Absence[]>(
    `${ENDPOINTS.ABSENCES}?${params.toString()}`
  );
  return response.data;
};

/**
 * Récupère les détails d'une absence par ID
 */
export const getAbsenceById = async (id: string): Promise<Absence> => {
  const response = await axiosInstance.get<Absence>(
    ENDPOINTS.ABSENCE_DETAIL(id)
  );
  return response.data;
};

/**
 * Crée une nouvelle absence
 */
export const createAbsence = async (
  data: CreateAbsenceDTO
): Promise<Absence> => {
  const response = await axiosInstance.post<Absence>(ENDPOINTS.ABSENCES, data);
  return response.data;
};

/**
 * Met à jour une absence (statut, motif, justification)
 */
export const updateAbsence = async (
  id: string,
  data: UpdateAbsenceDTO
): Promise<Absence> => {
  const response = await axiosInstance.put<Absence>(
    ENDPOINTS.ABSENCE_DETAIL(id),
    data
  );
  return response.data;
};

/**
 * Supprime une absence (soft-delete)
 */
export const deleteAbsence = async (id: string): Promise<void> => {
  await axiosInstance.delete(ENDPOINTS.ABSENCE_DETAIL(id));
};
