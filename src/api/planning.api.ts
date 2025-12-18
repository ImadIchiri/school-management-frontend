import axiosInstance from '@/services/axios';
import { ENDPOINTS } from '@/config/api';

export interface NewPlanning {
  dateDebut: string;
  dateFin: string;
  description: string;
  coursId: string;
  enseignantId: string;
  salleId?: string;
}

export interface ExistingPlanning extends NewPlanning {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * ⚠️ ATTENTION: Planning est actuellement in-memory (seed)
 * Pas persisté en base de données - rafraîchir page = reset
 */

/**
 * Récupère la liste des plannings (in-memory seed)
 */
export const getPlannings = async (): Promise<ExistingPlanning[]> => {
  const response = await axiosInstance.get<ExistingPlanning[]>(
    ENDPOINTS.PLANNING
  );
  return response.data;
};

/**
 * Récupère les détails d'un planning par ID
 */
export const getPlanningById = async (id: string): Promise<ExistingPlanning> => {
  const response = await axiosInstance.get<ExistingPlanning>(
    ENDPOINTS.PLANNING_DETAIL(id)
  );
  return response.data;
};

/**
 * Crée un nouveau planning
 */
export const createPlanning = async (
  data: NewPlanning
): Promise<ExistingPlanning> => {
  const response = await axiosInstance.post<ExistingPlanning>(
    ENDPOINTS.PLANNING,
    data
  );
  return response.data;
};

/**
 * Met à jour un planning
 */
export const updatePlanning = async (
  id: string,
  data: Partial<NewPlanning>
): Promise<ExistingPlanning> => {
  const response = await axiosInstance.put<ExistingPlanning>(
    ENDPOINTS.PLANNING_DETAIL(id),
    data
  );
  return response.data;
};

/**
 * Supprime un planning
 */
export const deletePlanning = async (id: string): Promise<void> => {
  await axiosInstance.delete(ENDPOINTS.PLANNING_DETAIL(id));
};
