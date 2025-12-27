import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assignPermissions, getRoleById } from "@/services/roles";
import { getPermissions } from "@/services/permissions";
import { X } from "lucide-react";

type Permission = {
  id: number;
  name: string;
};

type RolePermission = {
  permission: Permission;
};

type Role = {
  id: number;
  name: string;
  permissions: RolePermission[];
};

const AffectPermissionsToRole = () => {
  const { roleId } = useParams();

  const [role, setRole] = useState<Role | null>(null);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );
  const [search, setSearch] = useState("");

  const isSelected = (id: number) =>
    selectedPermissions.some((p) => p.id === id);

  const addPermission = (perm: Permission) => {
    if (!isSelected(perm.id)) {
      setSelectedPermissions((prev) => [...prev, perm]);
    }
  };

  const removePermission = (id: number) => {
    setSelectedPermissions((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredPermissions = allPermissions.filter((perm) =>
    perm.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAffectPermissions = async () => {
    if (!role) return;

    try {
      const { data } = await assignPermissions({
        roleId: role.id,
        permissionIds: selectedPermissions.map((p) => p.id),
      });
      setSelectedPermissions(
        data.data.permissions.map(
          (p: { permission: { id: number; name: string } }) => p.permission
        )
      );
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const roleRes = await getRoleById(Number(roleId));
      const permissionsRes = await getPermissions();

      setRole(roleRes.data.data);
      setAllPermissions(permissionsRes.data.data);

      // Convert role.permissions → Permission[]
      const mappedPermissions = roleRes.data.data.permissions.map(
        (p: RolePermission) => p.permission
      );

      setSelectedPermissions(mappedPermissions);
    };

    fetchData();
  }, [roleId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        Gestion des permissions: ({role?.name})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Permissions actuelles */}
        <section className="bg-white rounded-lg shadow p-4 flex flex-col">
          <h2 className="font-semibold mb-3 text-green-700">
            Permissions actuelles
          </h2>

          {role?.permissions.length ? (
            <ul className="space-y-2 overflow-y-auto max-h-[420px]">
              {role.permissions.map((p) => (
                <li
                  key={p.permission.id}
                  className="px-3 py-2 bg-gray-100 rounded"
                >
                  {p.permission.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune permission assignée</p>
          )}
        </section>

        {/* Permissions sélectionnées */}
        <section className="bg-white rounded-lg shadow p-4 flex flex-col">
          <h2 className="font-semibold mb-3 text-blue-600">
            Permissions sélectionnées
          </h2>

          {selectedPermissions.length === 0 ? (
            <p className="text-sm text-gray-500">
              Aucune permission sélectionnée
            </p>
          ) : (
            <div className="space-y-2 overflow-y-auto max-h-[420px]">
              {selectedPermissions.map((perm) => (
                <div
                  key={perm.id}
                  className="flex justify-between items-center border px-3 py-2 rounded"
                >
                  <span className="text-sm">{perm.name}</span>
                  <button
                    onClick={() => removePermission(perm.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Toutes les permissions */}
        <section className="bg-white rounded-lg shadow p-4 flex flex-col col-span-1 md:col-span-2 lg:col-span-1">
          <h2 className="font-semibold mb-3 text-gray-700">
            Toutes les permissions
          </h2>

          <input
            name="search-permission"
            type="text"
            placeholder="Rechercher une permission..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-3 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-school-primary"
          />

          <div className="space-y-2 overflow-y-auto max-h-[420px]">
            {filteredPermissions.length === 0 ? (
              <p className="text-sm text-gray-500">Aucune permission trouvée</p>
            ) : (
              filteredPermissions.map((perm) => (
                <div
                  key={perm.id}
                  className="flex items-center justify-between border rounded px-3 py-2 hover:bg-gray-50"
                >
                  <span className="text-sm">{perm.name}</span>

                  <button
                    onClick={() => addPermission(perm)}
                    disabled={isSelected(perm.id)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full transition
                      ${
                        isSelected(perm.id)
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600 text-white"
                      }`}
                  >
                    +
                  </button>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end gap-4 mt-8">
        <button className="px-6 py-2 border rounded-lg">Annuler</button>
        <button
          onClick={handleAffectPermissions}
          className="px-6 py-2 bg-school-primary text-white rounded-lg hover:bg-school-primaryDark"
        >
          Enregistrer
        </button>
      </div>
    </div>
  );
};

export default AffectPermissionsToRole;
