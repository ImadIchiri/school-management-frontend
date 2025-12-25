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

const PermissionsGridView = ({
  permissions,
  handleFormatTitle,
  handleEdit,
  handleDelete,
}: PermissionsListViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {permissions.map((permission) => (
        <div
          key={permission.id}
          className={`border rounded-xl p-5 shadow ${
            permission.isDeleted ? "bg-red-50 border-red-200" : "bg-white"
          }`}
        >
          <div className="flex justify-between mb-2">
            <h3 className="font-semibold">
              {PERMISSION_LABELS_FR[permission.name] ||
                handleFormatTitle(permission.name)}
            </h3>
            {permission.isDeleted ? (
              <span className="text-xs text-red-600">Supprimée</span>
            ) : (
              <span className="text-xs text-green-600">Active</span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {permission.description || "—"}
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => handleEdit(permission)}
              className="text-blue-600 text-sm"
            >
              <PencilSquareIcon className="w-5 h-5 text-school-primaryDark" />
            </button>
            <button
              onClick={() => handleDelete(permission)}
              className="text-red-600 text-sm"
            >
              <TrashIcon className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionsGridView;
