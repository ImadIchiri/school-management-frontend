import type { Dispatch, SetStateAction } from "react";

type PermissionType = {
  id: number;
  name: string;
  description: string | null;
  isDeleted: boolean;
};

type UpdatePermissionModalProps = {
  selectedPermission: PermissionType;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
};

const UpdatePermissionModal = ({
  selectedPermission,
  setShowEditModal,
}: UpdatePermissionModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 border border-school-accent shadow-2xl mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-school-primaryDark">
            Modifier la permission
          </h3>
          <button
            onClick={() => setShowEditModal(false)}
            className="text-school-primary text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <input
            defaultValue={selectedPermission.name}
            className="w-full h-11 border border-school-accent rounded-lg px-4"
          />
          <textarea
            defaultValue={selectedPermission.description ?? ""}
            rows={4}
            className="w-full border border-school-accent rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => setShowEditModal(false)}
            className="border-2 border-school-accent px-6 py-2 rounded-lg"
          >
            Annuler
          </button>
          <button className="bg-school-primary text-white px-6 py-2 rounded-lg hover:bg-school-primaryDark">
            Mettre à jour
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePermissionModal;
