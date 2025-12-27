import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import PermissionsPopup from "../PermissionsPopup";

type Role = {
  id: number;
  name: string;
  description?: string;
  permissions: any[];
  isDeleted: boolean;
};

type RolesListViewProps = {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (roleId: number) => void;
};

const RolesListView = ({ roles, onEdit, onDelete }: RolesListViewProps) => {
  const [selectedPermissions, setSelectedPermissions] = useState<any[] | null>(
    null
  );
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const handleOpenPermissionsPopup = (role: Role) => {
    setSelectedRole(role);
    setSelectedPermissions(role.permissions);
  };

  const handleClosePermissionsPopup = () => {
    setSelectedRole(null);
    setSelectedPermissions(null);
  };

  return (
    <>
      {/* TABLE (Desktop) */}
      <div className="hidden md:block bg-white rounded-xl shadow border">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left">Nom</th>
              <th className="px-4 py-3 text-left">Permissions</th>
              <th className="px-4 py-3 text-center">Statut</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{role.name}</td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => handleOpenPermissionsPopup(role)}
                    className="text-blue-600 hover:underline"
                  >
                    {role.permissions.length} permissions
                  </button>
                </td>

                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      role.isDeleted
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {role.isDeleted ? "Désactivé" : "Actif"}
                  </span>
                </td>

                <td className="px-4 py-3 flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(role)}
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <PencilSquareIcon className="w-5 h-5 text-school-primaryDark" />
                  </button>

                  <button
                    onClick={() => setRoleToDelete(role)}
                    className="p-2 rounded hover:bg-red-100"
                  >
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* (Mobile)*/}
      <div className="md:hidden space-y-4">
        {roles.map((role) => (
          <div
            key={role.id}
            className="border rounded-lg p-4 shadow-sm space-y-2"
          >
            <div className="flex justify-between">
              <h3 className="font-semibold">{role.name}</h3>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  role.isDeleted
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {role.isDeleted ? "Désactivé" : "Actif"}
              </span>
            </div>

            <button
              onClick={() => handleOpenPermissionsPopup(role)}
              className="text-sm text-blue-600 underline"
            >
              {role.permissions.length} permissions
            </button>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onEdit(role)}
                className="flex-1 border rounded py-1"
              >
                Modifier
              </button>
              <button
                onClick={() => setRoleToDelete(role)}
                className="flex-1 border border-red-500 text-red-600 rounded py-1"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PERMISSIONS POPUP */}
      {selectedPermissions && selectedRole && (
        <PermissionsPopup
          permissions={selectedPermissions}
          roleId={selectedRole.id}
          onClose={handleClosePermissionsPopup}
        />
      )}

      {/* DELETE CONFIRMATION */}
      {roleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Supprimer le rôle
            </h3>

            <p className="text-gray-700">
              Êtes-vous sûr de vouloir supprimer{" "}
              <strong>{roleToDelete.name}</strong> ?
            </p>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setRoleToDelete(null)}
                className="px-6 py-2 border rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  onDelete(roleToDelete.id);
                  setRoleToDelete(null);
                }}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RolesListView;
