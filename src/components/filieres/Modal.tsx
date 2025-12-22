import React from "react";

type FiliereBase = {
  nom: string;
  description?: string;
};

interface ModalProps<T extends FiliereBase> {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  filiere: T;
  setFiliere: React.Dispatch<React.SetStateAction<T>>;
  errors?: Record<string, string>;
}

const Modal = <T extends FiliereBase>({
  title,
  onClose,
  onConfirm,
  filiere,
  setFiliere,
  errors = {},
}: ModalProps<T>) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#1D6F6B] mb-6">
          {title}
        </h2>

        {/* Nom */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nom"
            value={filiere.nom}
            onChange={(e) =>
              setFiliere({ ...filiere, nom: e.target.value })
            }
            className={`border px-4 py-2 rounded-lg w-full
              ${errors.nom ? "border-red-500" : "border-gray-300"}`}
          />

          {errors.nom && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nom}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <textarea
            placeholder="Description"
            value={filiere.description ?? ""}
            onChange={(e) =>
              setFiliere({ ...filiere, description: e.target.value })
            }
            className="border px-4 py-2 rounded-lg w-full"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300"
          >
            Annuler
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-[#30B2AC] text-white"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
