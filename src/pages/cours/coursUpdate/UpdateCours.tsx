import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCoursById, updateCours } from "@/services/cours";

type UpdateCoursDto = {
  titre: string;
  description?: string;
  dateDebut: string;
  dateFin: string;
  moduleId: number;
  enseignantId?: number;
  salleId?: number;
};

function CoursUpdate() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<UpdateCoursDto>({
    titre: "",
    description: "",
    dateDebut: "",
    dateFin: "",
    moduleId: 0,
    enseignantId: 0,
    salleId: 0,
  });

  const [loading, setLoading] = useState(true);

  // ===== Charger le cours =====
  useEffect(() => {
    const fetchCours = async () => {
      try {
        if (!id) return;
        const response = await getCoursById(Number(id));
        const c = response.data;

        setForm({
          titre: c.titre,
          description: c.description || "",
          dateDebut: c.dateDebut.slice(0, 10),
          dateFin: c.dateFin.slice(0, 10),
          moduleId: c.moduleId,
          enseignantId: c.enseignantId || 0,
          salleId: c.salleId || 0,
        });
      } catch (error) {
        console.error("Erreur chargement cours :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCours();
  }, [id]);

  // ===== Submit =====
  const handleUpdate = async () => {
    try {
      if (!id) return;

      if (!form.titre || !form.moduleId) {
        alert("Titre et module obligatoires");
        return;
      }

      await updateCours(Number(id), form);
      navigate("/Cours");
    } catch (error) {
      console.error("Erreur mise à jour :", error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#DFF6F5] min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#DFF6F5] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-[#1D6F6B]">
          Modifier le Cours #{id}
        </h3>
        <button onClick={() => navigate(-1)} className="text-xl font-bold">
          ✕
        </button>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Titre */}
        <div>
          <label className="text-sm font-semibold text-[#1D6F6B]">Titre</label>
          <input
            type="text"
            value={form.titre}
            onChange={(e) => setForm({ ...form, titre: e.target.value })}
            className="w-full h-11 border bg-white rounded-lg px-4"
          />
        </div>

        {/* Module */}
        <div>
          <label className="text-sm font-semibold text-[#1D6F6B]">Module</label>
          <select
            value={form.moduleId}
            onChange={(e) =>
              setForm({ ...form, moduleId: Number(e.target.value) })
            }
            className="w-full h-11 border bg-white rounded-lg px-4"
          >
            <option value={0}>Choisir</option>
            <option value={1}>Module 1</option>
            <option value={2}>Module 2</option>
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-[#1D6F6B]">
            Description
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="w-full border bg-white rounded-lg px-4 py-2"
          />
        </div>

        {/* Dates */}
        <input
          type="date"
          value={form.dateDebut}
          onChange={(e) =>
            setForm({ ...form, dateDebut: e.target.value })
          }
          className="border rounded-lg bg-white px-4 h-11"
        />

        <input
          type="date"
          value={form.dateFin}
          onChange={(e) =>
            setForm({ ...form, dateFin: e.target.value })
          }
          className="border rounded-lg bg-white px-4 h-11"
        />
      </div>

      {/* BUTTONS */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="border px-6 py-2 rounded"
        >
          Annuler
        </button>
        <button
          onClick={handleUpdate}
          className="bg-[#30B2AC] text-white px-6 py-2 rounded"
        >
          Mettre à jour
        </button>
      </div>
    </div>
  );
}

export default CoursUpdate;
