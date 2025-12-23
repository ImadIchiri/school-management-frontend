import { useState } from "react";
import {
  FiGrid,
  FiList,
  FiPlus,
  FiEdit,
  FiTrash,
  FiX,
  FiEye,
} from "react-icons/fi";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";

type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: { name: string } | null;
};

export default function UsersPage() {
  const [isGrid, setIsGrid] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    id: number | null;
  }>({ open: false, id: null });

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      email: "jean@mail.com",
      role: { name: "Admin" },
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Sarah",
      email: "sarah@mail.com",
      role: { name: "Employé" },
    },
    {
      id: 3,
      nom: "Benali",
      prenom: "Youssef",
      email: "youssef@mail.com",
      role: { name: "Enseignant" },
    },
    {
      id: 4,
      nom: "Nguyen",
      prenom: "Linh",
      email: "linh@mail.com",
      role: { name: "Étudiant" },
    },
    {
      id: 5,
      nom: "Moreau",
      prenom: "Claire",
      email: "claire@mail.com",
      role: { name: "Parent" },
    },
  ]);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    roleName: "Utilisateur",
  });

  /* ---------- ACTIONS ---------- */
  const openAdd = () => {
    setEditingId(null);
    setForm({ nom: "", prenom: "", email: "", roleName: "Utilisateur" });
    setIsOpen(true);
  };

  const openEdit = (user: User) => {
    setEditingId(user.id);
    setForm({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      roleName: user.role?.name || "Utilisateur",
    });
    setIsOpen(true);
    setSheetOpen(false);
  };

  const openSheet = (user: User) => {
    setSelectedUser(user);
    setSheetOpen(true);
  };

  const saveUser = () => {
    if (!form.nom || !form.prenom || !form.email) return;
    if (editingId) {
      setUsers(
        users.map((u) =>
          u.id === editingId
            ? {
                ...u,
                nom: form.nom,
                prenom: form.prenom,
                email: form.email,
                role: { name: form.roleName },
              }
            : u
        )
      );
    } else {
      setUsers([
        ...users,
        {
          id: Date.now(),
          nom: form.nom,
          prenom: form.prenom,
          email: form.email,
          role: { name: form.roleName },
        },
      ]);
    }
    setIsOpen(false);
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    setSheetOpen(false);
    setConfirmDelete({ open: false, id: null });
  };

  /* ---------- UI ---------- */
  return (
    <div className="p-4 sm:p-8 min-h-screen bg-[#DFF6F5]">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#1D6F6B]">Utilisateurs</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsGrid(!isGrid)}
            className="cursor-pointer w-10 h-10 rounded-lg bg-[#7ED4D1] flex items-center justify-center"
          >
            {isGrid ? <FiList /> : <FiGrid />}
          </button>
          <button
            onClick={openAdd}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl bg-[#30B2AC] text-white font-semibold"
          >
            <FiPlus /> Ajouter
          </button>
        </div>
      </div>

      {/* GRID */}
      {isGrid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((u) => (
            <div
              key={u.id}
              className="group relative bg-white rounded-2xl p-6 shadow"
            >
              <button
                onClick={() => openSheet(u)}
                className="cursor-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 height=%2224%22 width=%2224%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22 stroke=%22black%22 stroke-width=%222%22 fill=%22none%22/></svg>'), pointer] absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiEye className="text-black transition-transform hover:scale-125" />
              </button>

              <h2 className="text-xl font-bold text-[#1D6F6B]">
                {u.nom} {u.prenom}
              </h2>
              <p className="text-gray-600 break-all">{u.email}</p>

              <div className="flex justify-between items-center mt-4">
                <span>{u.role?.name}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => openEdit(u)}
                    className="cursor-pointer"
                  >
                    <FiEdit className="text-blue-600 transition-transform hover:scale-125" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete({ open: true, id: u.id })}
                    className="cursor-pointer"
                  >
                    <FiTrash className="text-red-600 transition-transform hover:scale-125" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full bg-white rounded-xl shadow">
            <thead className="bg-[#30B2AC] text-white">
              <tr>
                <th className="p-4 text-left">Nom</th>
                <th className="p-4 text-left">Prénom</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-center">Rôle</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="group border-t">
                  <td className="p-4">{u.nom}</td>
                  <td className="p-4">{u.prenom}</td>
                  <td className="p-4 break-all">{u.email}</td>
                  <td className="p-4 text-center font-medium">
                    {u.role?.name}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => openSheet(u)}
                        className="cursor-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 height=%2224%22 width=%2224%22><circle cx=%2212%22 cy=%2212%22 r=%2210%22 stroke=%22black%22 stroke-width=%222%22 fill=%22none%22/></svg>'), pointer] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiEye className="text-black transition-transform hover:scale-125" />
                      </button>
                      <button
                        onClick={() => openEdit(u)}
                        className="cursor-pointer"
                      >
                        <FiEdit className="text-blue-600 transition-transform hover:scale-125" />
                      </button>
                      <button
                        onClick={() =>
                          setConfirmDelete({ open: true, id: u.id })
                        }
                        className="cursor-pointer"
                      >
                        <FiTrash className="text-red-600 transition-transform hover:scale-125" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SHEET */}
      {sheetOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSheetOpen(false)}
          />
          <div className="w-full sm:w-[380px] bg-white h-full p-6 animate-slide-in">
            <h2 className="text-xl font-bold mb-4 text-[#1D6F6B]">
              Détails de l'utilisateur
            </h2>
            <p>
              <b>Nom :</b> {selectedUser.nom}
            </p>
            <p>
              <b>Prénom :</b> {selectedUser.prenom}
            </p>
            <p>
              <b>Email :</b> {selectedUser.email}
            </p>
            <p>
              <b>Rôle :</b> {selectedUser.role?.name}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={() => openEdit(selectedUser)}
                className="cursor-pointer px-4 py-2 bg-[#30B2AC] text-white rounded-lg w-full flex justify-center gap-2 items-center"
              >
                <FiEdit /> Modifier
              </button>
              <button
                onClick={() =>
                  setConfirmDelete({ open: true, id: selectedUser.id })
                }
                className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg w-full flex justify-center gap-2 items-center"
              >
                <FiTrash /> Supprimer
              </button>
              <button
                onClick={() => setSheetOpen(false)}
                className="cursor-pointer px-4 py-2 bg-gray-200 rounded-lg w-full"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {confirmDelete.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h2 className="font-bold text-xl mb-4 text-[#1D6F6B]">
              Confirmer la suppression
            </h2>
            <p className="mb-6">
              Voulez-vous vraiment supprimer cet utilisateur?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (confirmDelete.id !== null) deleteUser(confirmDelete.id);
                }}
                className="cursor-pointer w-full bg-red-600 text-white py-2 rounded-xl"
              >
                Supprimer
              </button>
              <button
                onClick={() => setConfirmDelete({ open: false, id: null })}
                className="cursor-pointer w-full bg-gray-200 py-2 rounded-xl"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL AJOUT/MODIFICATION */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">
                {editingId ? "Modifier" : "Ajouter"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                <FiX />
              </button>
            </div>
            <div className="space-y-3">
              <input
                className="w-full border p-2 rounded cursor-pointer"
                placeholder="Nom"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
              />
              <input
                className="w-full border p-2 rounded cursor-pointer"
                placeholder="Prénom"
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              />
              <input
                className="w-full border p-2 rounded cursor-pointer"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <select
                className="w-full border p-2 rounded cursor-pointer"
                value={form.roleName}
                onChange={(e) => setForm({ ...form, roleName: e.target.value })}
              >
                <option>Utilisateur</option>
                <option>Étudiant</option>
                <option>Employé</option>
                <option>Enseignant</option>
                <option>Parent</option>
                <option>Admin</option>
              </select>
              <button
                onClick={saveUser}
                className="cursor-pointer w-full bg-[#30B2AC] text-white py-2 rounded-xl"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
