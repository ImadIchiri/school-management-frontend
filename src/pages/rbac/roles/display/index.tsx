import { useEffect, useState } from "react";
import RolesListView from "@/components/rbac/roles/RolesListView";
import CreateRoleModal from "@/components/rbac/roles/CreateRoleModal";
import UpdateRoleModal from "@/components/rbac/roles/UpdateRoleModal";
import { deleteRole, getRoles } from "@/services/roles";
import { FiGrid, FiList } from "react-icons/fi";

type Permission = {
  id: number;
  name: string;
};

export type Role = {
  id: number;
  name: string;
  description?: string;
  permissions: Permission[];
  isDeleted: boolean;
};

const ITEMS_PER_PAGE = 10;

const DisplayRoles = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [view, setView] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [loadingRoles, setLoadingRoles] = useState(true);

  const handleDeleteRole = async (roleId: number) => {
    try {
      const { data } = await deleteRole(roleId);
      setRoles((roles) => roles.filter((role) => role.id !== data.data.id));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoadingRoles(true);
        const { data } = await getRoles();
        setRoles(data.data);
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  const paginated = roles.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#1D6F6B]">Rôles</h1>
        <div className="flex items-center gap-3">
          {/* Toggle Grid / List avec react-icons */}
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#7ED4D1] text-[#1D6F6B] hover:bg-[#279D99] hover:text-white transition-all"
            title={view === "grid" ? "Vue liste" : "Vue grille"}
          >
            {view === "grid" ? <FiList size={20} /> : <FiGrid size={20} />}
          </button>
          {/* Create */}
          <button
            onClick={() => setShowCreate(true)}
            className="h-10 px-4 rounded-lg bg-[#30B2AC] text-white hover:bg-[#1D6F6B]"
          >
            + Ajouter rôle
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {view === "list" && loadingRoles ? (
        "Loading"
      ) : (
        <RolesListView
          roles={paginated}
          onEdit={(r) => {
            setSelectedRole(r);
            setShowEdit(true);
          }}
          onDelete={handleDeleteRole}
        />
      )}

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Précédent
        </button>

        <span className="text-sm font-medium">Page {page}</span>

        <button
          disabled={page * ITEMS_PER_PAGE >= roles.length}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Suivant
        </button>
      </div>

      {/* CREATE */}
      {showCreate && (
        <CreateRoleModal
          onClose={() => setShowCreate(false)}
          onCreated={(role) => setRoles((prev) => [...prev, role])}
        />
      )}

      {/* UPDATE */}
      {showEdit && selectedRole && (
        <UpdateRoleModal
          role={selectedRole}
          onClose={() => setShowEdit(false)}
          onUpdated={(updated) =>
            setRoles((prev) =>
              prev.map((r) => (r.id === updated.id ? updated : r))
            )
          }
        />
      )}
    </div>
  );
};

export default DisplayRoles;
