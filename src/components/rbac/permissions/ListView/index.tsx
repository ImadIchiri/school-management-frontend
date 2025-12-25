import { PERMISSION_LABELS_FR } from "@/utils/permissionLabels";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

type PermissionType = {
  id: number;
  name: string;
  description: string | null;
  isDeleted: boolean;
};

type PermissionsListViewProps = {
  permissions: PermissionType[];
  handleFormatTitle: (title: string) => string;
  handleEdit: (permission: PermissionType) => void;
  handleDelete: (permission: PermissionType) => void;
};

const PermissionsListView = ({
  permissions,
  handleFormatTitle,
  handleEdit,
  handleDelete,
}: PermissionsListViewProps) => {
  return (
    <div className="bg-white rounded-xl shadow border">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left">Titre</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-center">Statut</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr
              key={permission.id}
              className={`border-t ${
                permission.isDeleted ? "bg-red-50" : "hover:bg-gray-50"
              }`}
            >
              <td className="px-4 py-3 font-medium">
                {PERMISSION_LABELS_FR[permission.name] ||
                  handleFormatTitle(permission.name)}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {permission.description || "—"}
              </td>
              <td className="px-4 py-3 text-center">
                {permission.isDeleted ? (
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                    Supprimée
                  </span>
                ) : (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                    Active
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-center space-x-2">
                <button
                  onClick={() => handleEdit(permission)}
                  className="p-2 rounded hover:bg-school-accent"
                >
                  <PencilSquareIcon className="w-5 h-5 text-school-primaryDark" />
                </button>

                <button
                  onClick={() => handleDelete(permission)}
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
  );
};

export default PermissionsListView;
