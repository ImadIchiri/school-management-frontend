import { useState } from "react";
import { useCandidats, type CandidatAttributes } from "@/components/candidature";
import { FiUser, FiMail, FiLock, FiPhone, FiMapPin, FiCalendar } from "react-icons/fi";

export default function InscriptionPage() {
  const { create } = useCandidats();

  const [form, setForm] = useState<CandidatAttributes>({
    nom: "",
    prenom: "",
    dateNaissance: "",
    adresse: "",
    telephone: "",
    email: "",
    password: "",
    filiere: "",
    niveau: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    console.log("FORM DATA:", form); // debug

    try {
      await create({
        ...form,
        telephone: String(form.telephone),
        niveau: form.niveau.trim(), // supprime les espaces
      });
      setSuccessMsg("Inscription réussie !");
      setForm({
        nom: "",
        prenom: "",
        dateNaissance: "",
        adresse: "",
        telephone: "",
        email: "",
        password: "",
        filiere: "",
        niveau: "",
      });
    } catch (error: any) {
      setErrorMsg(error?.response?.data?.message || error?.message || "Erreur lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DFF6F5] p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-bold text-[#1D6F6B] text-center mb-6">Inscription Candidat</h1>

        {successMsg && <p className="text-green-600 font-semibold">{successMsg}</p>}
        {errorMsg && <p className="text-red-600 font-semibold">{errorMsg}</p>}

        {/* Nom / Prénom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 border p-2 rounded-lg">
            <FiUser className="text-gray-400" />
            <input type="text" name="nom" placeholder="Nom" value={form.nom} onChange={handleChange} className="flex-1 outline-none" required />
          </div>
          <div className="flex items-center gap-2 border p-2 rounded-lg">
            <FiUser className="text-gray-400" />
            <input type="text" name="prenom" placeholder="Prénom" value={form.prenom} onChange={handleChange} className="flex-1 outline-none" required />
          </div>
        </div>

        {/* Date de naissance */}
        <div className="flex items-center gap-2 border p-2 rounded-lg">
          <FiCalendar className="text-gray-400" />
          <input type="date" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} className="flex-1 outline-none" required />
        </div>

        {/* Adresse */}
        <div className="flex items-center gap-2 border p-2 rounded-lg">
          <FiMapPin className="text-gray-400" />
          <input type="text" name="adresse" placeholder="Adresse" value={form.adresse} onChange={handleChange} className="flex-1 outline-none" required />
        </div>

        {/* Téléphone */}
        <div className="flex items-center gap-2 border p-2 rounded-lg">
          <FiPhone className="text-gray-400" />
          <input type="tel" name="telephone" placeholder="Téléphone" value={form.telephone} onChange={handleChange} className="flex-1 outline-none" required />
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 border p-2 rounded-lg">
          <FiMail className="text-gray-400" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="flex-1 outline-none" required />
        </div>

        {/* Password */}
        <div className="flex items-center gap-2 border p-2 rounded-lg">
          <FiLock className="text-gray-400" />
          <input type="password" name="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} className="flex-1 outline-none" required />
        </div>

        {/* Filière */}
        <div className="flex items-center gap-2 border p-2 rounded-lg">
          <input type="text" name="filiere" placeholder="Filière" value={form.filiere} onChange={handleChange} className="flex-1 outline-none" required />
        </div>

        {/* Niveau (select pour enum) */}
        <div className="flex items-center gap-2 border p-2 rounded-lg">
          <select name="niveau" value={form.niveau} onChange={handleChange} className="flex-1 outline-none" required>
            <option value="">Choisir un niveau</option>
            <option value="BACHELOR_1">Bachelor 1</option>
            <option value="BACHELOR_2">Bachelor 2</option>
            <option value="MASTER_1">Master 1</option>
            <option value="MASTER_2">Master 2</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-[#30B2AC] text-white py-2 rounded-lg font-semibold hover:bg-[#1D6F6B] transition">
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}
