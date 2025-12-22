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
      console.error('Erreur lors du chargement des absences:', err);
      setError(err.message || 'Erreur lors du chargement des absences');
      // Données de test en cas d'erreur
      setAbsences([
        {
          id: '1',
          date: '2025-12-16',
          motif: '',
          statut: 'ABSENT',
          etudiantId: '1',
          etudiant: {
            idEtudiant: '1',
            user: { prenom: 'Ahmed', nom: 'El Idrissi', id: '1', email: '', role: 'ETUDIANT' },
          } as any,
          coursId: '1',
          cours: { idCours: '1', nom: 'Algorithmes' } as any,
          isDeleted: false,
          createdAt: '2025-12-16',
          updatedAt: '2025-12-16',
        },
        {
          id: '2',
          date: '2025-12-17',
          motif: 'Certificat médical',
          statut: 'JUSTIFIE',
          etudiantId: '2',
          etudiant: {
            idEtudiant: '2',
            user: { prenom: 'Fatima Zahra', nom: 'Benali', id: '2', email: '', role: 'ETUDIANT' },
          } as any,
          coursId: '2',
          cours: { idCours: '2', nom: 'Base de Données' } as any,
          isDeleted: false,
          createdAt: '2025-12-17',
          updatedAt: '2025-12-17',
        },
        {
          id: '3',
          date: '2025-12-18',
          motif: '',
          statut: 'ABSENT',
          etudiantId: '3',
          etudiant: {
            idEtudiant: '3',
            user: { prenom: 'Youssef', nom: 'Alami', id: '3', email: '', role: 'ETUDIANT' },
          } as any,
          coursId: '3',
          cours: { idCours: '3', nom: 'Réseaux' } as any,
          isDeleted: false,
          createdAt: '2025-12-18',
          updatedAt: '2025-12-18',
        },
        {
          id: '4',
          date: '2025-12-19',
          motif: '',
          statut: 'RETARD',
          etudiantId: '4',
          etudiant: {
            idEtudiant: '4',
            user: { prenom: 'Salma', nom: 'Benjelloun', id: '4', email: '', role: 'ETUDIANT' },
          } as any,
          coursId: '4',
          cours: { idCours: '4', nom: 'Programmation Web' } as any,
          isDeleted: false,
          createdAt: '2025-12-19',
          updatedAt: '2025-12-19',
        },
        {
          id: '5',
          date: '2025-12-20',
          motif: '',
          statut: 'RETARD',
          etudiantId: '5',
          etudiant: {
            idEtudiant: '5',
            user: { prenom: 'Omar', nom: 'Tazi', id: '5', email: '', role: 'ETUDIANT' },
          } as any,
          coursId: '5',
          cours: { idCours: '5', nom: 'Architecture' } as any,
          isDeleted: false,
          createdAt: '2025-12-20',
          updatedAt: '2025-12-20',
        },
        {
          id: '6',
          date: '2025-12-20',
          motif: '',
          statut: 'ABSENT',
          etudiantId: '6',
          etudiant: {
            idEtudiant: '6',
            user: { prenom: 'Leila', nom: 'Mansouri', id: '6', email: '', role: 'ETUDIANT' },
          } as any,
          coursId: '6',
          cours: { idCours: '6', nom: 'Sécurité' } as any,
          isDeleted: false,
          createdAt: '2025-12-20',
          updatedAt: '2025-12-20',
        },
      ]);
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
