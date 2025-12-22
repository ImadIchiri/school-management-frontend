import axiosInstance from "@/api";

type PermissionAttributesTypes = {
  id?: number;
  titre: string;
  date: Date;
  employeId: number;
};

export const getPermissions = () => axiosInstance.get("/permissions");
export const getPermissionById = (permissionId: number) =>
  axiosInstance.get(`/permissions/${permissionId}`);
export const createPermission = (permission: PermissionAttributesTypes) =>
  axiosInstance.post("/permissions", permission);
export const updatePermission = (permission: PermissionAttributesTypes) =>
  axiosInstance.put("/permissions", permission);
export const deletePermission = () => axiosInstance.delete("/permissions");
