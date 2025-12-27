import { useState } from "react";
import { createRole } from "@/services/roles";
import type { Role } from "@/pages/rbac/roles/display";

type Props = {
  onClose: () => void;
  onCreated: (role: Role) => void;
};

const CreateRoleModal = ({ onClose, onCreated }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await createRole({ name, description });
      console.log(data.data);

      onCreated(data.data);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-school-primaryDark">
            Créer un rôle
          </h3>
          <button onClick={onClose} className="text-2xl text-school-primary">
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
              placeholder="ADMIN"
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
              placeholder="Rôle administrateur"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button onClick={onClose} className="border px-5 py-2 rounded-lg">
            Annuler
          </button>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-school-primary text-white px-5 py-2 rounded-lg hover:bg-school-primaryDark opacity-80 disabled:opacity-50"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoleModal;
