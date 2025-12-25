import type { Dispatch, SetStateAction } from "react";

type PermissionType = {
  id: number;
  name: string;
  description: string | null;
  isDeleted: boolean;
};

type CreatePermissionModalProps = {
  setShowCreateModal: Dispatch<SetStateAction<boolean>>;
};

const CreatePermissionModal = ({
  setShowCreateModal,
}: CreatePermissionModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 border border-school-accent shadow-2xl mx-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-school-primaryDark">
            Ajouter une permission
          </h3>
          <button
            onClick={() => setShowCreateModal(false)}
            className="text-school-primary text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-school-primaryDark">
              Nom
            </label>
            <input
              type="text"
              placeholder="ex: event_read"
              className="w-full h-11 border border-school-accent rounded-lg px-4 focus:ring-2 focus:ring-school-primary outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-sm font-semibold text-school-primaryDark">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Description de la permission"
              className="w-full border border-school-accent rounded-lg px-4 py-2 focus:ring-2 focus:ring-school-primary outline-none resize-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={() => setShowCreateModal(false)}
            className="border-2 border-school-accent px-6 py-2 rounded-lg text-school-primaryDark hover:bg-school-surface transition"
          >
            Annuler
          </button>
          <button className="bg-school-primary text-white px-6 py-2 rounded-lg hover:bg-school-primaryDark transition">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePermissionModal;
