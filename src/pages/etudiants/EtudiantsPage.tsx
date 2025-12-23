import { EtudiantList } from '@/components/etudiants';

export default function EtudiantsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Étudiants</h1>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          + Ajouter un Étudiant
        </button>
      </div>
      <EtudiantList />
    </div>
  );
}
