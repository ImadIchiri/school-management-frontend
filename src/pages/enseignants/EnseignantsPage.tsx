import { EnseignantList } from '@/components/enseignants';

export default function EnseignantsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Enseignants</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          + Ajouter un Enseignant
        </button>
      </div>
      <EnseignantList />
    </div>
  );
}
