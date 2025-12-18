import { useState, useCallback } from 'react';
import {
  getAbsences,
  getAbsenceById,
  createAbsence,
  updateAbsence,
  deleteAbsence,
} from '@/api/absence.api';
import type {
  Absence,
  CreateAbsenceDTO,
  UpdateAbsenceDTO,
  AbsenceFilters,
} from '@/features/absences/types';

interface UseAbsencesReturn {
  absences: Absence[];
  loading: boolean;
  error: string | null;
  fetchAbsences: (filters?: AbsenceFilters) => Promise<void>;
}

interface UseAbsenceByIdReturn {
  absence: Absence | null;
  loading: boolean;
  error: string | null;
  fetchAbsence: (id: string) => Promise<void>;
}

interface UseMutationReturn<T = Absence> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<void>;
}

/**
 * Hook pour récupérer la liste des absences
 */
export const useAbsences = (): UseAbsencesReturn => {
  const [absences, setAbsences] = useState<Absence[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAbsences = useCallback(async (filters?: AbsenceFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAbsences(filters);
      setAbsences(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des absences');
    } finally {
      setLoading(false);
    }
  }, []);

  return { absences, loading, error, fetchAbsences };
};

/**
 * Hook pour récupérer une absence par ID
 */
export const useAbsenceById = (
  initialId?: string
): UseAbsenceByIdReturn => {
  const [absence, setAbsence] = useState<Absence | null>(null);
  const [loading, setLoading] = useState(!!initialId);
  const [error, setError] = useState<string | null>(null);

  const fetchAbsence = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAbsenceById(id);
      setAbsence(data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement de l\'absence');
    } finally {
      setLoading(false);
    }
  }, []);

  if (initialId && !absence && !loading) {
    fetchAbsence(initialId);
  }

  return { absence, loading, error, fetchAbsence };
};

/**
 * Hook pour créer une absence
 */
export const useCreateAbsence = (): UseMutationReturn => {
  const [data, setData] = useState<Absence | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (dto: CreateAbsenceDTO) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createAbsence(dto);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de l\'absence');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};

/**
 * Hook pour mettre à jour une absence
 */
export const useUpdateAbsence = (): UseMutationReturn => {
  const [data, setData] = useState<Absence | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (id: string, dto: UpdateAbsenceDTO) => {
      setLoading(true);
      setError(null);
      try {
        const result = await updateAbsence(id, dto);
        setData(result);
      } catch (err: any) {
        setError(
          err.message || 'Erreur lors de la mise à jour de l\'absence'
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, execute };
};

/**
 * Hook pour supprimer une absence
 */
export const useDeleteAbsence = (): Omit<UseMutationReturn<void>, 'data'> & { execute: (id: string) => Promise<void> } => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await deleteAbsence(id);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression de l\'absence');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, execute };
};
