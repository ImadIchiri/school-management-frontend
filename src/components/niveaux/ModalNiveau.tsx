interface Props {
  title: string;
  niveau: any;
  setNiveau: (n: any) => void;
  onConfirm: () => void;
  onClose: () => void;
  errors?: Record<string, string>;
}

const ModalNiveau = ({
  title,
  niveau,
  setNiveau,
  onConfirm,
  onClose,
  errors = {},
}: Props) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-6">{title}</h2>

        {/* Année */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Année</label>
          <input
            type="text"
            value={niveau.anneeLabel}
            onChange={(e) =>
              setNiveau({ ...niveau, anneeLabel: e.target.value })
            }
            className={`w-full p-2 border rounded-lg
              ${errors.anneeLabel ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.anneeLabel && (
            <p className="text-red-500 text-sm mt-1">
              {errors.anneeLabel}
            </p>
          )}
        </div>

        {/* Filière */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Filière ID</label>
          <input
            type="number"
            value={niveau.filiereId}
            onChange={(e) =>
              setNiveau({ ...niveau, filiereId: Number(e.target.value) })
            }
            className={`w-full p-2 border rounded-lg
              ${errors.filiereId ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.filiereId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.filiereId}
            </p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <input
            type="date"
            value={niveau.dateDebut}
            onChange={(e) =>
              setNiveau({ ...niveau, dateDebut: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
          <input
            type="date"
            value={niveau.dateFin}
            onChange={(e) =>
              setNiveau({ ...niveau, dateFin: e.target.value })
            }
            className="border p-2 rounded-lg"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
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

export default ModalNiveau;
