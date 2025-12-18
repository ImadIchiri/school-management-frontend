import { useState, useEffect } from "react";
import {
  Squares2X2Icon,
  TableCellsIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// SHADCN SHEET
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
  const [isGrid, setIsGrid] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // SHEET
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@mail.com",
      role: { name: "Admin" },
    },
    {
      id: 2,
      nom: "Martin",
      prenom: "Sarah",
      email: "sarah.martin@mail.com",
      role: { name: "Employe" },
    },
    {
      id: 3,
      nom: "Benali",
      prenom: "Youssef",
      email: "youssef.benali@mail.com",
      role: { name: "Enseignant" },
    },
    {
      id: 4,
      nom: "Nguyen",
      prenom: "Linh",
      email: "linh.nguyen@mail.com",
      role: { name: "Etudiant" },
    },
    {
      id: 5,
      nom: "Moreau",
      prenom: "Claire",
      email: "claire.moreau@mail.com",
      role: { name: "Parent" },
    },
  ]);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    roleName: "User",
  });

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers)
      .catch(() => {});
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
    if (!confirm("Delete this user?")) return;
    setUsers(users.filter((u) => u.id !== id));
    setSheetOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 px-4">
        <div className="mx-auto max-w-7xl rounded-lg bg-white shadow">
          {/* HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b p-4">
            <h1 className="text-xl font-bold">Users</h1>
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
          <div className="p-4">
            {!isGrid ? (
              <table className="min-w-full divide-y">
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      onClick={() => openSheet(u)}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <td className="px-4 py-3">{u.nom}</td>
                      <td className="px-4 py-3">{u.prenom}</td>
                      <td className="px-4 py-3">{u.email}</td>
                      <td className="px-4 py-3">{u.role?.name}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openEdit(u);
                            }}
                          >
                            <PencilSquareIcon className="h-5 w-5 text-blue-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteUser(u.id);
                            }}
                          >
                            <TrashIcon className="h-5 w-5 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => openSheet(u)}
                    className="cursor-pointer rounded border p-4 shadow-sm hover:bg-gray-50"
                  >
                    <h3 className="font-semibold">
                      {u.nom} {u.prenom}
                    </h3>
                    <p className="text-sm text-gray-600">{u.email}</p>

                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-sm">{u.role?.name}</span>

                      {/* BOUTONS IDENTIQUES AU TABLEAU */}
                      <div className="flex gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEdit(u);
                          }}
                        >
                          <PencilSquareIcon className="h-5 w-5 text-blue-600" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteUser(u.id);
                          }}
                        >
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
      </div>

      {/* SHEET */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right">
          {selectedUser && (
            <>
              <SheetHeader>
                <SheetTitle>Détails utilisateur</SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <div>
                  <Label>Nom</Label>
                  <p>{selectedUser.nom}</p>
                </div>
                <div>
                  <Label>Prénom</Label>
                  <p>{selectedUser.prenom}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <Label>Role</Label>
                  <p>{selectedUser.role?.name}</p>
                </div>
              </div>

              {/* BOUTONS MÊMES COULEURS */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={() => openEdit(selectedUser)}
                  className="flex items-center gap-2"
                >
                  <PencilSquareIcon className="h-5 w-5 text-blue-600" />
                  <span>Modifier</span>
                </button>

                <button
                  onClick={() => deleteUser(selectedUser.id)}
                  className="flex items-center gap-2"
                >
                  <TrashIcon className="h-5 w-5 text-red-600" />
                  <span>Supprimer</span>
                </button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* MODAL (INCHANGÉ) */}
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
    </>
  );
}
