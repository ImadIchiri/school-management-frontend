import React from "react";

export interface CandidatForm {
  userId: number;
  filiere: string;
  niveau: string;
  etat?: "en_attente" | "accepté" | "refusé";
}

type ModalCandidatProps = {
  title: string;
  candidat: CandidatForm;
  setCandidat: React.Dispatch<React.SetStateAction<CandidatForm>>;
  onConfirm: () => void;
  onClose: () => void;
  errors?: Record<string, string>;
};

export default function ModalCandidat({
  title,
  candidat,
  setCandidat,
  onConfirm,
  onClose,
  errors = {},
}: ModalCandidatProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        <div className="flex flex-col gap-3">
          <input
            type="number"
            placeholder="User ID"
            value={candidat.userId}
            onChange={(e) => setCandidat({ ...candidat, userId: Number(e.target.value) })}
            className="border p-2 rounded"
          />
          {errors.userId && <span className="text-red-600">{errors.userId}</span>}

          <input
            type="text"
            placeholder="Filière"
            value={candidat.filiere}
            onChange={(e) => setCandidat({ ...candidat, filiere: e.target.value })}
            className="border p-2 rounded"
          />
          {errors.filiere && <span className="text-red-600">{errors.filiere}</span>}

          <input
            type="text"
            placeholder="Niveau"
            value={candidat.niveau}
            onChange={(e) => setCandidat({ ...candidat, niveau: e.target.value })}
            className="border p-2 rounded"
          />
          {errors.niveau && <span className="text-red-600">{errors.niveau}</span>}

          <select
            value={candidat.etat}
            onChange={(e) => setCandidat({ ...candidat, etat: e.target.value as any })}
            className="border p-2 rounded"
          >
            <option value="en_attente">En attente</option>
            <option value="accepté">Accepté</option>
            <option value="refusé">Refusé</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Annuler
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-[#30B2AC] text-white rounded">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
