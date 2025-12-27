import axiosInstance from "@/api";

export type RoleAttributes = {
  id?: number;
  name: string;
  description?: string;
};

// GET all roles
export const getRoles = () => axiosInstance.get("/roles");

// GET role by ID
export const getRoleById = (roleId: number) =>
  axiosInstance.get(`/roles/${roleId}`);

// CREATE role
export const createRole = (role: RoleAttributes) =>
  axiosInstance.post("/roles", role);

// UPDATE role
export const updateRole = (role: RoleAttributes) =>
  axiosInstance.put(`/roles/${role?.id}`, role);

// ASIGN permissions to role
export const assignPermissions = ({
  roleId,
  permissionIds,
}: {
  roleId: number;
  permissionIds: number[];
}) => axiosInstance.put(`/roles/${roleId}/permissions`, { permissionIds });

// DELETE role
export const deleteRole = (roleId: number) =>
  axiosInstance.delete(`/roles/${roleId}`, { data: { roleId } });
