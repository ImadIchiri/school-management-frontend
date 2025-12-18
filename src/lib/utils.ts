import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utilitaires généraux
 */

/**
 * Génère un UUID simple
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Clone profond un objet
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Vérifie si un objet est vide
 */
export const isEmpty = (obj: any): boolean => {
  return !obj || Object.keys(obj).length === 0;
};

/**
 * Filtre un tableau d'objets par critères
 */
export const filterBy = <T extends Record<string, any>>(
  items: T[],
  criteria: Partial<T>
): T[] => {
  return items.filter((item) =>
    Object.entries(criteria).every(
      ([key, value]) => item[key as keyof T] === value
    )
  );
};

/**
 * Trie un tableau d'objets
 */
export const sortBy = <T extends Record<string, any>>(
  items: T[],
  key: keyof T,
  order: 'asc' | 'desc' = 'asc'
): T[] => {
  const sorted = [...items].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
};

/**
 * Groupe un tableau par clé
 */
export const groupBy = <T extends Record<string, any>>(
  items: T[],
  key: keyof T
): Record<string, T[]> => {
  return items.reduce(
    (acc, item) => {
      const groupKey = String(item[key]);
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
};

/**
 * Mappe une valeur enum en label lisible
 */
export const enumToLabel = (enumValue: string): string => {
  return enumValue
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Truncate un texte
 */
export const truncate = (text: string, length: number = 50): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Format un nombre
 */
export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

/**
 * Formate un pourcentage
 */
export const formatPercent = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(1)}%`;
};
