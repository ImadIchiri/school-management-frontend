import { useState } from "react";
import { FiGrid, FiList, FiEye, FiCheck } from "react-icons/fi";
import { useCandidats } from "@/components/candidature";
import type { CandidatAttributes } from "@/components/candidature";

export default function CandidaturePage() {
  const { candidats, loading, update } = useCandidats();
  const [isGrid, setIsGrid] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [selected, setSelected] = useState<CandidatAttributes | null>(null);

  // État temporaire pour chaque card ou ligne
  const [etatSelectionne, setEtatSelectionne] = useState<{ [id: number]: CandidatAttributes["etat"] }>({});

  const openSheet = (c: CandidatAttributes) => {
    setSelected(c);
    setSheetOpen(true);
  };

  const badgeColor = (etat?: CandidatAttributes["etat"]) => {
    switch (etat) {
      case "accepte": return "bg-green-100 text-green-700";
      case "refuse": return "bg-red-100 text-red-700";
      case "en_cours": return "bg-blue-100 text-blue-700";
      case "incomplet": return "bg-orange-100 text-orange-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  const badgeLabel = (etat?: CandidatAttributes["etat"]) => {
    switch (etat) {
      case "accepte": return "Accepté";
      case "refuse": return "Refusé";
      case "en_attente": return "En attente";
      case "en_cours": return "En cours";
      case "incomplet": return "Incomplet";
      default: return "";
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-[#1D6F6B] font-semibold">Chargement...</p>;
  }

  return (
    <div className="p-4 sm:p-8 min-h-screen bg-[#DFF6F5]">
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#1D6F6B]">Candidatures</h1>
        <button
          onClick={() => setIsGrid(!isGrid)}
          className="w-10 h-10 rounded-lg bg-[#7ED4D1] flex items-center justify-center cursor-pointer"
        >
          {isGrid ? <FiList /> : <FiGrid />}
        </button>
      </div>

      {isGrid ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidats.map((c) => {
            const etatActuel = etatSelectionne[c.idCandidature!] || c.etat;
            const isDropdownVisible = etatActuel === "en_attente";

            return (
              <div key={c.idCandidature} className="relative bg-white rounded-2xl p-6 shadow group">
                <button
                  onClick={() => openSheet(c)}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition"
                >
                  <FiEye />
                </button>

                <h2 className="text-xl font-bold text-[#1D6F6B]">{c.filiere}</h2>
                <p className="text-gray-600">Niveau : {c.niveau}</p>

                {isDropdownVisible ? (
                  <div className="mt-4 flex items-center gap-2">
                    <select
                      className="border rounded-lg px-2 py-1 flex-1"
                      value={etatActuel}
                      onChange={(e) =>
                        setEtatSelectionne({ ...etatSelectionne, [c.idCandidature!]: e.target.value as CandidatAttributes["etat"] })
                      }
                    >
                      <option value="en_attente">En attente</option>
                      <option value="en_cours">En cours</option>
                      <option value="accepte">Accepté</option>
                      <option value="refuse">Refusé</option>
                      <option value="incomplet">Incomplet</option>
                    </select>
                    <button
                      onClick={() => {
                        update(c.idCandidature!, { etat: etatActuel });
                        if (etatActuel !== "en_attente") {
                          setEtatSelectionne({ ...etatSelectionne, [c.idCandidature!]: etatActuel });
                        }
                      }}
                      className="bg-[#30B2AC] text-white px-3 py-1 rounded-lg flex items-center justify-center hover:scale-110 transition"
                    >
                      <FiCheck />
                    </button>
                  </div>
                ) : (
                  <span className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(etatActuel)}`}>
                    {badgeLabel(etatActuel)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl shadow">
            <thead className="bg-[#30B2AC] text-white">
              <tr>
                <th className="p-4 text-left">Filière</th>
                <th>Niveau</th>
                <th>État</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidats.map((c) => {
                const etatActuel = etatSelectionne[c.idCandidature!] || c.etat;
                const isDropdownVisible = etatActuel === "en_attente";

                return (
                  <tr key={c.idCandidature} className="border-t">
                    <td className="p-4">{c.filiere}</td>
                    <td>{c.niveau}</td>
                    <td>
                      {isDropdownVisible ? (
                        <div className="flex items-center gap-2">
                          <select
                            className="border rounded-lg px-2 py-1"
                            value={etatActuel}
                            onChange={(e) =>
                              setEtatSelectionne({ ...etatSelectionne, [c.idCandidature!]: e.target.value as CandidatAttributes["etat"] })
                            }
                          >
                            <option value="en_attente">En attente</option>
                            <option value="en_cours">En cours</option>
                            <option value="accepte">Accepté</option>
                            <option value="refuse">Refusé</option>
                            <option value="incomplet">Incomplet</option>
                          </select>
                          <button
                            onClick={() => {
                              update(c.idCandidature!, { etat: etatActuel });
                              if (etatActuel !== "en_attente") {
                                setEtatSelectionne({ ...etatSelectionne, [c.idCandidature!]: etatActuel });
                              }
                            }}
                            className="bg-[#30B2AC] text-white px-3 py-1 rounded-lg flex items-center justify-center hover:scale-110 transition"
                          >
                            <FiCheck />
                          </button>
                        </div>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor(etatActuel)}`}>
                          {badgeLabel(etatActuel)}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <FiEye className="cursor-pointer hover:scale-125 transition" onClick={() => openSheet(c)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {sheetOpen && selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setSheetOpen(false)} />
          <div className="w-full sm:w-[380px] bg-white h-full p-6 animate-slide-in">
            <h2 className="text-xl font-bold mb-4 text-[#1D6F6B]">Détails du candidat</h2>
            <p><b>User ID :</b> {selected.userId}</p>
            <p><b>Filière :</b> {selected.filiere}</p>
            <p><b>Niveau :</b> {selected.niveau}</p>
            <p><b>État :</b> {badgeLabel(selected.etat)}</p>

            <button
              onClick={() => setSheetOpen(false)}
              className="mt-6 bg-gray-200 px-4 py-2 rounded-lg w-full"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
