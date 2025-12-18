/**
 * Utilitaires pour manipulation des dates
 */

/**
 * Formate une date ISO en format local français
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('fr-FR');
};

/**
 * Formate une date ISO en format complet (date + heure)
 */
export const formatDateTime = (dateString: string): string => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString('fr-FR');
};

/**
 * Formate une date pour input datetime-local
 */
export const formatDateTimeLocal = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Formate une date pour input date
 */
export const formatDateInput = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Calcule la différence en jours entre deux dates
 */
export const daysBetween = (date1: string, date2: string): number => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Vérifie si une date est dans le passé
 */
export const isPastDate = (dateString: string): boolean => {
  return new Date(dateString) < new Date();
};

/**
 * Vérifie si une date est dans le futur
 */
export const isFutureDate = (dateString: string): boolean => {
  return new Date(dateString) > new Date();
};

/**
 * Obtient la date d'aujourd'hui au format ISO
 */
export const getTodayISO = (): string => {
  return new Date().toISOString().split('T')[0];
};

/**
 * Ajoute des jours à une date
 */
export const addDays = (dateString: string, days: number): string => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

/**
 * Formate une plage de dates
 */
export const formatDateRange = (from: string, to: string): string => {
  return `${formatDate(from)} au ${formatDate(to)}`;
};
