// ============================================
// GUIDE POUR DÉBUTANTS - CUSTOM HOOKS REACT
// ============================================
// Ce fichier contient des "hooks" personnalisés pour gérer les absences.
// Un "hook" est une fonction spéciale React qui commence par "use"
// et permet de réutiliser de la logique dans plusieurs composants.

// Import des fonctions React nécessaires
import { useState, useCallback } from 'react';

// Import des fonctions API qui communiquent avec le serveur
import {
  getAbsences,      // Récupère toutes les absences
  getAbsenceById,   // Récupère une absence spécifique
  createAbsence,    // Crée une nouvelle absence
  updateAbsence,    // Modifie une absence existante
  deleteAbsence,    // Supprime une absence
} from '@/api/absence.api';

// Import des types TypeScript pour la validation
import type {
  Absence,
  CreateAbsenceDTO,
  UpdateAbsenceDTO,
  AbsenceFilters,
} from '@/features/absences/types';

// ============================================
// 1️⃣ HOOK: Récupérer la liste des absences
// ============================================
/**
 * Ce hook permet de récupérer et afficher une liste d'absences
 * 
 * COMMENT L'UTILISER:
 * const { absences, loading, error, fetchAbsences } = useAbsences();
 * 
 * RETOUR:
 * - absences: tableau contenant toutes les absences
 * - loading: true pendant le chargement, false sinon
 * - error: message d'erreur s'il y a un problème
 * - fetchAbsences: fonction pour charger/recharger les données
 */
export const useAbsences = () => {
  // État pour stocker la liste des absences (initialement vide)
  const [absences, setAbsences] = useState<Absence[]>([]);
  
  // État pour savoir si on est en train de charger (initialement non)
  const [loading, setLoading] = useState(false);
  
  // État pour stocker un message d'erreur (initialement null = pas d'erreur)
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les absences depuis le serveur
  const fetchAbsences = useCallback(async (filters?: AbsenceFilters) => {
    // ÉTAPE 1: On indique qu'on commence le chargement
    setLoading(true);
    setError(null); // On réinitialise les erreurs précédentes
    
    try {
      // ÉTAPE 2: On appelle l'API pour récupérer les données
      const data = await getAbsences(filters);
      
      // ÉTAPE 3: Si tout va bien, on met à jour la liste des absences
      setAbsences(data);
    } catch (err: any) {
      // ÉTAPE 4: Si une erreur se produit, on l'affiche et on stocke le message
      console.error('Erreur lors du chargement des absences:', err);
      setError(err.message || 'Erreur lors du chargement des absences');
    } finally {
      // ÉTAPE 5: Dans tous les cas, on arrête le chargement
      setLoading(false);
    }
  }, []); // [] signifie que cette fonction ne change jamais

  // On retourne tout ce dont le composant a besoin
  return { absences, loading, error, fetchAbsences };
};

// ============================================
// 2️⃣ HOOK: Récupérer UNE absence par son ID
// ============================================
/**
 * Ce hook permet de récupérer une seule absence spécifique
 * 
 * COMMENT L'UTILISER:
 * const { absence, loading, error, fetchAbsence } = useAbsenceById();
 * fetchAbsence('123'); // Pour charger l'absence avec l'ID '123'
 * 
 * RETOUR:
 * - absence: l'absence récupérée (ou null si pas encore chargée)
 * - loading: true pendant le chargement
 * - error: message d'erreur
 * - fetchAbsence: fonction pour charger une absence par son ID
 */
export const useAbsenceById = () => {
  // État pour stocker UNE absence (initialement null = rien)
  const [absence, setAbsence] = useState<Absence | null>(null);
  
  // État de chargement
  const [loading, setLoading] = useState(false);
  
  // État d'erreur
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer une absence par son ID
  const fetchAbsence = useCallback(async (id: string) => {
    // ÉTAPE 1: On commence le chargement
    setLoading(true);
    setError(null);
    
    try {
      // ÉTAPE 2: On appelle l'API avec l'ID
      const data = await getAbsenceById(id);
      
      // ÉTAPE 3: On stocke l'absence récupérée
      setAbsence(data);
    } catch (err: any) {
      // ÉTAPE 4: Gestion de l'erreur
      setError(err.message || 'Erreur lors du chargement de l\'absence');
    } finally {
      // ÉTAPE 5: On arrête le chargement
      setLoading(false);
    }
  }, []); // La fonction ne change jamais

  return { absence, loading, error, fetchAbsence };
};

// ============================================
// 3️⃣ HOOK: Créer une nouvelle absence
// ============================================
/**
 * Ce hook permet de créer une nouvelle absence
 * 
 * COMMENT L'UTILISER:
 * const { data, loading, error, execute } = useCreateAbsence();
 * execute({ etudiantId: '1', coursId: '2', date: '2025-01-15' });
 * 
 * RETOUR:
 * - data: l'absence créée (retournée par le serveur)
 * - loading: true pendant la création
 * - error: message d'erreur
 * - execute: fonction à appeler pour créer l'absence
 */
export const useCreateAbsence = () => {
  // État pour stocker l'absence créée
  const [data, setData] = useState<Absence | null>(null);
  
  // État de chargement
  const [loading, setLoading] = useState(false);
  
  // État d'erreur
  const [error, setError] = useState<string | null>(null);

  // Fonction pour créer une absence
  const execute = useCallback(async (absenceData: CreateAbsenceDTO) => {
    // ÉTAPE 1: On commence l'opération
    setLoading(true);
    setError(null);
    
    try {
      // ÉTAPE 2: On envoie les données au serveur
      const result = await createAbsence(absenceData);
      
      // ÉTAPE 3: On stocke l'absence créée
      setData(result);
    } catch (err: any) {
      // ÉTAPE 4: Gestion de l'erreur
      setError(err.message || 'Erreur lors de la création de l\'absence');
      throw err; // On relance l'erreur pour que le composant puisse la gérer
    } finally {
      // ÉTAPE 5: On arrête le chargement
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};

// ============================================
// 4️⃣ HOOK: Mettre à jour une absence
// ============================================
/**
 * Ce hook permet de modifier une absence existante
 * 
 * COMMENT L'UTILISER:
 * const { data, loading, error, execute } = useUpdateAbsence();
 * execute('123', { statut: 'JUSTIFIE', motif: 'Certificat médical' });
 * 
 * RETOUR:
 * - data: l'absence mise à jour
 * - loading: true pendant la modification
 * - error: message d'erreur
 * - execute: fonction à appeler (avec ID et nouvelles données)
 */
export const useUpdateAbsence = () => {
  // État pour stocker l'absence mise à jour
  const [data, setData] = useState<Absence | null>(null);
  
  // État de chargement
  const [loading, setLoading] = useState(false);
  
  // État d'erreur
  const [error, setError] = useState<string | null>(null);

  // Fonction pour mettre à jour une absence
  // Elle prend 2 paramètres: l'ID et les nouvelles données
  const execute = useCallback(async (id: string, updatedData: UpdateAbsenceDTO) => {
    // ÉTAPE 1: On commence l'opération
    setLoading(true);
    setError(null);
    
    try {
      // ÉTAPE 2: On envoie la mise à jour au serveur
      const result = await updateAbsence(id, updatedData);
      
      // ÉTAPE 3: On stocke l'absence mise à jour
      setData(result);
    } catch (err: any) {
      // ÉTAPE 4: Gestion de l'erreur
      setError(err.message || 'Erreur lors de la mise à jour de l\'absence');
      throw err;
    } finally {
      // ÉTAPE 5: On arrête le chargement
      setLoading(false);
    }
  }, []);

  return { data, loading, error, execute };
};

// ============================================
// 5️⃣ HOOK: Supprimer une absence
// ============================================
/**
 * Ce hook permet de supprimer une absence
 * 
 * COMMENT L'UTILISER:
 * const { loading, error, execute } = useDeleteAbsence();
 * execute('123'); // Pour supprimer l'absence avec l'ID '123'
 * 
 * RETOUR:
 * - loading: true pendant la suppression
 * - error: message d'erreur
 * - execute: fonction à appeler avec l'ID à supprimer
 * 
 * NOTE: Pas de "data" car la suppression ne retourne rien
 */
export const useDeleteAbsence = () => {
  // État de chargement
  const [loading, setLoading] = useState(false);
  
  // État d'erreur
  const [error, setError] = useState<string | null>(null);

  // Fonction pour supprimer une absence
  const execute = useCallback(async (id: string) => {
    // ÉTAPE 1: On commence l'opération
    setLoading(true);
    setError(null);
    
    try {
      // ÉTAPE 2: On demande au serveur de supprimer
      await deleteAbsence(id);
      
      // ÉTAPE 3: Si succès, il n'y a rien à retourner
    } catch (err: any) {
      // ÉTAPE 4: Gestion de l'erreur
      setError(err.message || 'Erreur lors de la suppression de l\'absence');
      throw err;
    } finally {
      // ÉTAPE 5: On arrête le chargement
      setLoading(false);
    }
  }, []);

  return { loading, error, execute };
};

// ============================================
// 📚 CONCEPTS IMPORTANTS POUR LES DÉBUTANTS
// ============================================
//
// 1. useState: Crée une "variable spéciale" qui déclenche un re-render quand elle change
//    Exemple: const [count, setCount] = useState(0);
//
// 2. useCallback: "Mémorise" une fonction pour éviter de la recréer à chaque render
//    Exemple: const myFunc = useCallback(() => {...}, []);
//
// 3. async/await: Permet d'attendre le résultat d'une promesse (API call)
//    Exemple: const data = await fetchData();
//
// 4. try/catch/finally:
//    - try: Code à essayer
//    - catch: Code si erreur
//    - finally: Code qui s'exécute dans tous les cas
//
// 5. TypeScript types:
//    - string: texte
//    - boolean: true/false
//    - null: valeur vide
//    - ?: paramètre optionnel
//    - []: tableau
//
// ============================================
