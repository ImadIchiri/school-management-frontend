import axiosInstance from "@/api";

export type NewUser = {
  nom: string;
  prenom: string;
  dateNaissance: Date;
  adresse: string;
  telephone: string;
  email: string;
  password: string;
  roleId?: number | null;
};

export type ExistingUser = NewUser & {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isDeleted?: boolean;
  roleId?: number | null;
  role?: any;
  candidat?: any;
  etudiant?: any;
  employe?: any;
  parent?: any;
};

export const getUsers = () => axiosInstance.get("/users");
export const getUserById = (userId: number) =>
  axiosInstance.get(`/users/${userId}`);
export const createUser = (user: NewUser) => axiosInstance.post("/users", user);
export const updateUser = (user: ExistingUser) =>
  axiosInstance.put("/users", user);
export const deleteUser = () => axiosInstance.delete("/users");
