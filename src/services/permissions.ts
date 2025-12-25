import axiosInstance from "@/api";

export type PermissionCreateType = {
  name: string;
  description?: string | null;
};

export type PermissionUpdateType = PermissionCreateType & {
  id: number;
};

export const getPermissions = () => axiosInstance.get("/permissions");
export const getPermissionById = (permissionId: number) =>
  axiosInstance.get(`/permissions/${permissionId}`);
export const createPermission = (permission: PermissionCreateType) =>
  axiosInstance.post("/permissions", permission);
export const updatePermission = (permission: PermissionUpdateType) =>
  axiosInstance.put(`/permissions/${permission.id}`, permission);
export const deletePermission = (permissionId: number) =>
  axiosInstance.delete(`/permissions/${permissionId}`);
