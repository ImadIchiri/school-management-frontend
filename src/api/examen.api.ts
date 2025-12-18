import axiosInstance from '@/services/axios';
import { ENDPOINTS } from '@/config/api';
import type {
  Examen,
  CreateExamenDTO,
  UpdateExamenDTO,
  ExamenFilters,
} from '@/features/examens/types';

/**
 * Récupère la liste des examens avec filtres optionnels
 */
export const getExamens = async (filters?: ExamenFilters): Promise<Examen[]> => {
  const params = new URLSearchParams();

  if (filters?.moduleId) params.append('moduleId', filters.moduleId);
  if (filters?.enseignantId) params.append('enseignantId', filters.enseignantId);
  if (filters?.from) params.append('from', filters.from);
  if (filters?.to) params.append('to', filters.to);

  const response = await axiosInstance.get<Examen[]>(
    `${ENDPOINTS.EXAMENS}?${params.toString()}`
  );
  return response.data;
};

/**
 * Récupère les détails d'un examen par ID
 */
export const getExamenById = async (id: string): Promise<Examen> => {
  const response = await axiosInstance.get<Examen>(
    ENDPOINTS.EXAMEN_DETAIL(id)
  );
  return response.data;
};

/**
 * Crée un nouvel examen
 */
export const createExamen = async (data: CreateExamenDTO): Promise<Examen> => {
  const response = await axiosInstance.post<Examen>(ENDPOINTS.EXAMENS, data);
  return response.data;
};

/**
 * Met à jour un examen (y compris notes des étudiants)
 */
export const updateExamen = async (
  id: string,
  data: UpdateExamenDTO
): Promise<Examen> => {
  const response = await axiosInstance.put<Examen>(
    ENDPOINTS.EXAMEN_DETAIL(id),
    data
  );
  return response.data;
};

/**
 * Supprime un examen (soft-delete)
 */
export const deleteExamen = async (id: string): Promise<void> => {
  await axiosInstance.delete(ENDPOINTS.EXAMEN_DETAIL(id));
};
