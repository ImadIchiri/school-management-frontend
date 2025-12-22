import { getPermissions } from "@/services/permissions";
import { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

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
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<"list" | "grid">("list");
  const [page, setPage] = useState(1);

  // exp: IN: title: event_read - OUT: Read Event
  const handleFormatTitle = (title: string): string => {
    const splitedTitle = title.split("_");
    const firstWord =
      splitedTitle[1].slice(0, 1).toUpperCase() + splitedTitle[1].slice(1);
    const secondWord =
      splitedTitle[0].slice(0, 1).toUpperCase() + splitedTitle[0].slice(1);

    return `${firstWord} ${secondWord}`;
  };

  /* Pagination logic */
  const totalPages = Math.ceil(permissions.length / ITEMS_PER_PAGE);
  const paginatedPermissions = permissions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    const fetchPermissions = async () => {
      const { data }: PermissionsResponseType = await getPermissions();
      setPermissions(data.data);
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
            onClick={() => setShowModal(true)}
            className="bg-[#30B2AC] text-white px-5 py-2 rounded-lg hover:bg-[#1D6F6B]"
          >
            + Ajouter permission
          </button>
        </div>
      </div>

      {/* ===== LIST VIEW ===== */}
      {view === "list" && (
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
              {paginatedPermissions.map((permission) => (
                <tr
                  key={permission.id}
                  className={`border-t ${
                    permission.isDeleted ? "bg-red-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 font-medium">
                    {handleFormatTitle(permission.name)}
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
                    <button className="">
                      <PencilSquareIcon className="w-5 h-5 text-school-primaryDark" />
                    </button>
                    <button className="text-red-600 hover:underline">
                      <TrashIcon className="w-5 h-5 text-red-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ===== GRID VIEW ===== */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paginatedPermissions.map((permission) => (
            <div
              key={permission.id}
              className={`border rounded-xl p-5 shadow ${
                permission.isDeleted ? "bg-red-50 border-red-200" : "bg-white"
              }`}
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">
                  {handleFormatTitle(permission.name)}
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
                <button className="text-blue-600 text-sm">
                  <PencilSquareIcon className="w-5 h-5 text-school-primaryDark" />
                </button>
                <button className="text-red-600 text-sm">
                  <TrashIcon className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
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
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6 border border-[#7ED4D1] shadow-2xl mx-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#1D6F6B]">
                Ajouter une permission
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-[#30B2AC] text-2xl font-bold"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#1D6F6B]">
                  Nom
                </label>
                <input
                  type="text"
                  className="w-full h-11 border border-[#7ED4D1] rounded-lg px-4 focus:ring-2 focus:ring-[#30B2AC]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#1D6F6B]">
                  Description
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-[#7ED4D1] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#30B2AC]"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowModal(false)}
                className="border-2 border-[#7ED4D1] px-6 py-2 rounded-lg text-[#1D6F6B]"
              >
                Annuler
              </button>
              <button className="bg-[#30B2AC] text-white px-6 py-2 rounded-lg hover:bg-[#1D6F6B]">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionsPage;
