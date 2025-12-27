import { useEffect, useState } from "react";
import { updateRole } from "@/services/roles";
import type { Role } from "@/pages/rbac/roles/display";

type Props = {
  role: {
    id: number;
    name: string;
    description?: string;
  };
  onClose: () => void;
  onUpdated: (role: Role) => void;
};

const UpdateRoleModal = ({ role, onClose, onUpdated }: Props) => {
  const [name, setName] = useState(role.name);
  const [description, setDescription] = useState(role.description || "");

  const handleUpdate = async () => {
    try {
      const { data } = await updateRole({
        id: role.id,
        name,
        description,
      });

      // UPDATE LISTE OF DATA
      onUpdated(data.data);
      onClose();
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    setName(role.name);
    setDescription(role.description ?? "");
  }, [role]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-school-primaryDark">
            Modifier le rôle
          </h3>
          <button onClick={onClose} className="text-school-primary text-2xl">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-school-primaryDark">
              Nom du rôle
            </label>
            <input
              className="w-full h-11 border border-school-accent rounded-lg px-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-school-primaryDark">
              Description
            </label>
            <textarea
              className="w-full border border-school-accent rounded-lg px-4 py-2"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="border px-5 py-2 rounded-lg">
            Annuler
          </button>
          <button
            onClick={handleUpdate}
            className="bg-school-primary text-white px-5 py-2 rounded-lg hover:bg-school-primaryDark"
          >
            Mettre à jour
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoleModal;
