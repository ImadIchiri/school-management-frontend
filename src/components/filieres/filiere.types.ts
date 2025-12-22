export interface Filiere {
  id: number;
  nom: string;
  description?: string;
}

export interface FilierePayload {
  nom: string;
  description?: string;
}
