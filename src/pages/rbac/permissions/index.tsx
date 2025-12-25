import { createPermission, getPermissions } from "@/services/permissions";
import { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import PermissionsListView from "@/components/rbac/permissions/ListView";
import PermissionsGridView from "@/components/rbac/permissions/GridView";
import CreatePermissionModal from "@/components/rbac/permissions/CreateModal";
import UpdatePermissionModal from "@/components/rbac/permissions/UpdateModal";

type PermissionType = {
  id: number;
  name: string;
  description: string | null;
  isDeleted: boolean;
};

type PermissionsResponseType = {
  data: {
    success: boolean;
    data: PermissionType[];
    length: number;
  };
};

const ITEMS_PER_PAGE = 10;

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState<PermissionType[]>([]);
  const [view, setView] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPermission, setSelectedPermission] =
    useState<PermissionType | null>(null);

  // exp: IN: title: event_read - OUT: Read Event
  const handleFormatTitle = (title: string): string => {
    const splitedTitle = title.split("_");
    const firstWord =
      splitedTitle[1].slice(0, 1).toUpperCase() + splitedTitle[1].slice(1);
    const secondWord =
      splitedTitle[0].slice(0, 1).toUpperCase() + splitedTitle[0].slice(1);

    return `${firstWord} ${secondWord}`;
  };

  // Pagination logic
  const totalPages = Math.ceil(permissions.length / ITEMS_PER_PAGE);
  const paginatedPermissions = permissions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [permissions]);

  useEffect(() => {
    // Function which handles the fetch
    const fetchPermissions = async () => {
      try {
        const { data } = await getPermissions();
        setPermissions(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPermissions();
  }, []);
  return (
    <div className="container mx-auto px-6 py-10">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Permissions</h1>

        <div className="flex gap-3">
          {/* View Switch */}
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg border ${
              view === "list"
                ? "bg-[#30B2AC] text-white"
                : "border-[#7ED4D1] text-[#1D6F6B]"
            }`}
          >
            Liste
          </button>
          <button
            onClick={() => setView("grid")}
            className={`px-4 py-2 rounded-lg border ${
              view === "grid"
                ? "bg-[#30B2AC] text-white"
                : "border-[#7ED4D1] text-[#1D6F6B]"
            }`}
          >
            Grille
          </button>

          {/* Add */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#30B2AC] text-white px-5 py-2 rounded-lg hover:bg-[#1D6F6B]"
          >
            + Ajouter permission
          </button>
        </div>
      </div>

      {/* ===== LIST VIEW ===== */}
      {view === "list" && (
        <PermissionsListView
          permissions={paginatedPermissions}
          handleFormatTitle={handleFormatTitle}
          handleEdit={(permission) => {
            setSelectedPermission(permission);
            setShowEditModal(true);
          }}
          handleDelete={(permission) => {
            setSelectedPermission(permission);
            setShowDeleteModal(true);
          }}
        />
      )}

      {/* ===== GRID VIEW ===== */}
      {view === "grid" && (
        <PermissionsGridView
          permissions={paginatedPermissions}
          handleFormatTitle={handleFormatTitle}
          handleEdit={(permission) => {
            setSelectedPermission(permission);
            setShowEditModal(true);
          }}
          handleDelete={(permission) => {
            setSelectedPermission(permission);
            setShowDeleteModal(true);
          }}
        />
      )}

      {/* ===== Pagination ===== */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-lg border ${
              page === i + 1
                ? "bg-[#30B2AC] text-white"
                : "border-[#7ED4D1] text-[#1D6F6B]"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ===== ADD MODAL ===== */}
      {showCreateModal && <CreatePermissionModal {...{ setShowCreateModal }} />}

      {/* ===== UPDATE MODAL ===== */}
      {showEditModal && selectedPermission && (
        <UpdatePermissionModal {...{ selectedPermission, setShowEditModal }} />
      )}

      {/* ===== CONFIRM DELETE MODAL ===== */}
      {showDeleteModal && selectedPermission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-red-600 mb-4">
              Supprimer la permission
            </h3>

            <p className="text-gray-700">
              Êtes-vous sûr de vouloir supprimer{" "}
              <strong>{selectedPermission.name}</strong> ?
            </p>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 border rounded-lg"
              >
                Annuler
              </button>
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionsPage;
