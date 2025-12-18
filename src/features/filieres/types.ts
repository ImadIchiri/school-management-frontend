// Types pour Filières
export interface Filiere {
  idFiliere: string;
  nom: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFiliereDTO {
  nom: string;
  description?: string;
}

export interface UpdateFiliereDTO {
  nom?: string;
  description?: string;
}

export interface FiliereFilters {
  search?: string;
}
