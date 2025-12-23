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
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl
                   animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-[#1D6F6B] mb-6 text-center">
          {title}
        </h2>

        {/* Nom */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Nom <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            placeholder="Nom"
            value={filiere.nom}
            onChange={(e) =>
              setFiliere({ ...filiere, nom: e.target.value })
            }
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none
              focus:ring-2 focus:ring-[#30B2AC]
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
          <label className="block text-sm font-semibold mb-1">
            Description
          </label>

          <textarea
            placeholder="Description"
            value={filiere.description ?? ""}
            onChange={(e) =>
              setFiliere({ ...filiere, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-300
                       focus:outline-none focus:ring-2 focus:ring-[#30B2AC]"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 rounded-lg bg-gray-200
                       hover:bg-gray-300 transition-colors"
          >
            Annuler
          </button>

          <button
            onClick={onConfirm}
            className="cursor-pointer px-5 py-2 rounded-lg bg-[#30B2AC]
                       text-white font-semibold hover:bg-[#279E99]
                       transition-colors"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
