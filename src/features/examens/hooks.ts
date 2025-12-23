import { useState, useCallback } from 'react';
import {
  getExamens,
  getExamenById,
  createExamen,
  updateExamen,
  deleteExamen,
} from '@/services/examens';
import type {
  Examen,
  CreateExamenDTO,
} from '@/features/examens/types';

interface UseExamensReturn {
  examens: Examen[];
  loading: boolean;
  error: string | null;
  fetchExamens: () => Promise<void>;
}

interface UseExamenByIdReturn {
  examen: Examen | null;
  loading: boolean;
  error: string | null;
  fetchExamen: (id: number) => Promise<void>;
}

interface UseMutationReturn<T = Examen> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<void>;
}

/**
 * Hook pour récupérer la liste des examens
 */
export const useExamens = (): UseExamensReturn => {
  const [examens, setExamens] = useState<Examen[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExamens = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getExamens();
      console.log(response.data);
      
      setExamens(response.data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement des examens');
    } finally {
      setLoading(false);
    }
  }, []);

  return { examens, loading, error, fetchExamens };
};

/**
 * Hook pour récupérer un examen par ID
 */
export const useExamenById = (
  initialId?: number
): UseExamenByIdReturn => {
  const [examen, setExamen] = useState<Examen | null>(null);
  const [loading, setLoading] = useState(!!initialId);
  const [error, setError] = useState<string | null>(null);

  const fetchExamen = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getExamenById(id);
      setExamen(response.data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors du chargement de l\'examen');
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch si initialId fourni
  if (initialId && !examen && !loading) {
    fetchExamen(initialId);
  }

  return { examen, loading, error, fetchExamen };
};

/**
 * Hook pour créer un examen
 */
export const useCreateExamen = (): UseMutationReturn => {
  const [data, setData] = useState<Examen | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (dto: CreateExamenDTO) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createExamen(dto as any);
      setData(result.data);
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la création de l\'examen');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};

/**
 * Hook pour mettre à jour un examen
 */
export const useUpdateExamen = (): UseMutationReturn => {
  const [data, setData] = useState<Examen | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (examen: Examen) => {
      setLoading(true);
      setError(null);
      try {
        const result = await updateExamen(examen as any);
        setData(result.data);
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la mise à jour de l\'examen');
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
 * Hook pour supprimer un examen
 */
export const useDeleteExamen = (): Omit<UseMutationReturn<void>, 'data'> & { execute: () => Promise<void> } => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await deleteExamen();
    } catch (err: any) {
      setError(err.message || 'Erreur lors de la suppression de l\'examen');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, execute };
};
