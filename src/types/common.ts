// Common Types & Interfaces

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface FilterOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface User {
  id: string;
  idEtudiant?: string;
  nom: string;
  prenom: string;
  email?: string;
  role?: string;
}

export interface Etudiant {
  idEtudiant: string;
  user: User;
  filiere?: string;
  groupe?: string;
}

export interface Enseignant {
  idEnseignant: string;
  user: User;
  specialite?: string;
}

export interface Module {
  idModule: string;
  nom: string;
  code?: string;
}

export interface Cours {
  idCours: string;
  nom: string;
  moduleId: string;
  module?: Module;
  enseignantId?: string;
  enseignant?: Enseignant;
  salleId?: string;
}

export interface Salle {
  idSalle: string;
  nom: string;
  capacite?: number;
}

// Error handling
export class ApiError extends Error {
  status: number;
  message: string;
  data?: any;

  constructor(
    status: number,
    message: string,
    data?: any
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
