import { useState, useEffect } from "react";
import {
  Squares2X2Icon,
  TableCellsIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type User = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: { name: string } | null;
};

export default function UsersPage() {
  const [isGrid, setIsGrid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    roleName: "User",
  });

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({ nom: "", prenom: "", email: "", roleName: "User" });
    setIsOpen(true);
  };

  const openEdit = (user: User) => {
    setEditingId(user.id);
    setForm({
      nom: user.nom,
      prenom: user.prenom,
      email: user.email,
      roleName: user.role?.name || "User",
    });
    setIsOpen(true);
  };

  const saveUser = async () => {
    if (!form.nom || !form.prenom || !form.email) return;

    if (editingId) {
      const res = await fetch(`/api/users/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await res.json();
      setUsers(users.map((u) => (u.id === editingId ? updated : u)));
    } else {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const newUser = await res.json();
      setUsers([...users, newUser]);
    }

    setIsOpen(false);
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Delete this user?")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-lg bg-white shadow">
        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold">Users</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsGrid(!isGrid)}
              className="flex items-center gap-2 rounded border px-3 py-2 text-sm"
            >
              {isGrid ? (
                <>
                  <TableCellsIcon className="h-5 w-5" /> Table
                </>
              ) : (
                <>
                  <Squares2X2Icon className="h-5 w-5" /> Grid
                </>
              )}
            </button>
            <button
              onClick={openAdd}
              className="flex items-center gap-2 rounded bg-[#0abbb5] px-4 py-2 text-sm text-white"
            >
              <PlusIcon className="h-5 w-5" />
              Add User
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 sm:p-6">
          {!isGrid ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">Nom</th>
                    <th className="px-4 py-3 text-left text-sm">Prénom</th>
                    <th className="px-4 py-3 text-left text-sm">Email</th>
                    <th className="px-4 py-3 text-left text-sm">Role</th>
                    <th className="px-4 py-3 text-right text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="px-4 py-3">{u.nom}</td>
                      <td className="px-4 py-3">{u.prenom}</td>
                      <td className="px-4 py-3 text-gray-600">{u.email}</td>
                      <td className="px-4 py-3">{u.role?.name}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => openEdit(u)}>
                            <PencilSquareIcon className="h-5 w-5 text-blue-600" />
                          </button>
                          <button onClick={() => deleteUser(u.id)}>
                            <TrashIcon className="h-5 w-5 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((u) => (
                <div key={u.id} className="rounded border p-4 shadow-sm">
                  <h3 className="font-semibold">
                    {u.nom} {u.prenom}
                  </h3>
                  <p className="text-sm text-gray-600">{u.email}</p>
                  <div className="mt-3 flex justify-between">
                    <span className="text-sm">{u.role?.name}</span>
                    <div className="flex gap-3">
                      <button onClick={() => openEdit(u)}>
                        <PencilSquareIcon className="h-5 w-5 text-blue-600" />
                      </button>
                      <button onClick={() => deleteUser(u.id)}>
                        <TrashIcon className="h-5 w-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded bg-white p-6">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">
                {editingId ? "Edit User" : "Add User"}
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <input
                className="w-full rounded border p-2"
                placeholder="Nom"
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
              />
              <input
                className="w-full rounded border p-2"
                placeholder="Prénom"
                value={form.prenom}
                onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              />
              <input
                className="w-full rounded border p-2"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <select
                className="w-full rounded border p-2"
                value={form.roleName}
                onChange={(e) => setForm({ ...form, roleName: e.target.value })}
              >
                <option>User</option>
                <option>Etudiant</option>
                <option>Employe</option>
                <option>Enseignant</option>
                <option>Parent</option>
                <option>Admin</option>
              </select>
              <button
                onClick={saveUser}
                className="w-full rounded bg-[#0abbb5] py-2 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
