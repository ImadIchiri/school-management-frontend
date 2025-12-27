import { useNavigate } from "react-router-dom";

type Permission = {
  permission: {
    id: number;
    name: string;
  };
};

type PermissionsPopupProps = {
  permissions: Permission[];
  roleId: number;
  onClose: () => void;
};

const PermissionsPopup = ({
  permissions,
  roleId,
  onClose,
}: PermissionsPopupProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-school-primaryDark">
            Permissions du rôle
          </h3>
          <button onClick={onClose} className="text-xl font-bold">
            ✕
          </button>
        </div>

        {/* Content */}
        {permissions.length === 0 ? (
          <p className="text-gray-500 text-center">Aucune permission</p>
        ) : (
          <ul className="space-y-2 max-h-64 overflow-y-auto">
            {permissions.map((p) => (
              <li
                key={p.permission.id}
                className="px-3 py-2 bg-gray-100 rounded text-sm"
              >
                {p.permission.name}
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Fermer
          </button>

          <button
            onClick={() => navigate(`/rbac/roles/${roleId}/permissions`)}
            className="px-4 py-2 bg-school-primary text-white rounded-lg hover:bg-school-primaryDark"
          >
            Gérer les permissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionsPopup;
