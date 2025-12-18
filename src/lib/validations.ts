/**
 * Validations métier pour formulaires
 */

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Valide qu'une date début est avant date fin
 */
export const validateDateRange = (
  dateDebut: string,
  dateFin: string
): ValidationError | null => {
  if (!dateDebut || !dateFin) return null;

  const start = new Date(dateDebut);
  const end = new Date(dateFin);

  if (start >= end) {
    return {
      field: 'dateFin',
      message: 'La date fin doit être après la date début',
    };
  }

  return null;
};

/**
 * Valide une note (0-20)
 */
export const validateNote = (note: number | undefined): ValidationError | null => {
  if (note === undefined || note === null) return null;

  if (note < 0 || note > 20) {
    return {
      field: 'note',
      message: 'La note doit être entre 0 et 20',
    };
  }

  return null;
};

/**
 * Valide un coefficient
 */
export const validateCoefficient = (
  coeff: number | undefined
): ValidationError | null => {
  if (coeff === undefined || coeff === null) return null;

  if (coeff <= 0) {
    return {
      field: 'coeff',
      message: 'Le coefficient doit être supérieur à 0',
    };
  }

  return null;
};

/**
 * Valide une durée en minutes
 */
export const validateDuration = (
  duration: number | undefined
): ValidationError | null => {
  if (duration === undefined || duration === null) return null;

  if (duration <= 0) {
    return {
      field: 'dureeMinutes',
      message: 'La durée doit être supérieure à 0 minutes',
    };
  }

  return null;
};

/**
 * Valide un champ requis
 */
export const validateRequired = (
  value: string | undefined | null,
  fieldName: string
): ValidationError | null => {
  if (!value || !value.trim()) {
    return {
      field: fieldName,
      message: `${fieldName} est requis`,
    };
  }

  return null;
};

/**
 * Valide un email
 */
export const validateEmail = (email: string): ValidationError | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return {
      field: 'email',
      message: 'Email invalide',
    };
  }

  return null;
};

/**
 * Valide une liste n'est pas vide
 */
export const validateListNotEmpty = <T>(
  list: T[] | undefined,
  fieldName: string
): ValidationError | null => {
  if (!list || list.length === 0) {
    return {
      field: fieldName,
      message: `Au moins un(e) ${fieldName} est requis`,
    };
  }

  return null;
};

/**
 * Combine plusieurs validations
 */
export const validateAll = (
  ...validations: (ValidationError | null)[]
): ValidationError[] => {
  return validations.filter((v) => v !== null) as ValidationError[];
};
