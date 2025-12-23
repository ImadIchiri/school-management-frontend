
# 📚 NEW CODE STRUCTURE GUIDE - BEGINNER FRIENDLY

## Overview
This project has been reorganized from a **feature-based** structure to a **component-based** structure that's cleaner and more beginner-friendly.

---

## 📁 NEW FOLDER STRUCTURE

```
src/
├── components/          # Réutilisable UI components
│   ├── absences/       # Component for Absence model
│   │   ├── AbsenceList.tsx      # Affiche la liste
│   │   ├── AbsenceForm.tsx      # Formulaire créer/modifier
│   │   └── index.tsx            # Export des composants
│   ├── cours/          # Components for Cours model
│   ├── etudiants/      # Components for Etudiant model
│   ├── enseignants/    # Components for Enseignant model
│   ├── examens/        # Components for Examen model
│   ├── events/         # Components for Event model
│   ├── opportunites/   # Components for Opportunite model
│   ├── filieres/       # Components for Filiere model
│   ├── groupes/        # Components for Groupe model
│   ├── modules/        # Components for Module model
│   └── shared/         # Components réutilisables (Button, Input, etc)
│
├── pages/              # Pages complètes (une par modèle)
│   ├── absences/
│   │   ├── AbsencesPage.tsx     # Page principale
│   │   └── index.ts             # Export
│   ├── cours/
│   ├── etudiants/
│   ├── enseignants/
│   ├── examens/
│   └── ...
│
├── api/                # API calls (unchanged)
│   ├── absence.api.ts
│   ├── cours.api.ts
│   ├── examen.api.ts
│   ├── axiosInstance.ts
│   └── ...
│
└── ...
```

---

## 🎯 KEY CONCEPTS FOR BEGINNERS

### 1. Components vs Pages
- **Components** (`src/components`) = réutilisables, comme des briques
- **Pages** (`src/pages`) = écrans complets qui utilisent les composants

### 2. Simple State Management (useState)
Instead of complex hooks from `src/features`, we use **simple useState**:

```typescript
// SIMPLE - Beginner friendly ✅
const [absences, setAbsences] = useState<Absence[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Set values
setAbsences(data);
setLoading(true);
```

### 3. Component Naming
- **List Component** = `AbsenceList.tsx` (affiche une liste)
- **Form Component** = `AbsenceForm.tsx` (créer/modifier)
- **Card Component** = `AbsenceCard.tsx` (affiche une seule absence)
- **Page Component** = `AbsencesPage.tsx` (page complète)

---

## ✨ HOW TO ADD A NEW MODEL

Let's say you want to add **Filiere** (following Prisma model):

### Step 1: Create Component Files
```bash
# Create folder
src/components/filieres/
  ├── FiliereList.tsx
  ├── FiliereForm.tsx
  ├── FiliereCard.tsx
  └── index.tsx
```

### Step 2: Create Page File
```bash
src/pages/filieres/
  ├── FilieresPage.tsx
  └── index.ts
```

### Step 3: Component Example (FiliereList.tsx)

```typescript
import { useState, useEffect } from 'react';
import { getFilieres } from '@/api/filiere.api'; // API you'll create
import type { Filiere } from '@/types'; // Your type

export function FiliereList() {
  // 1️⃣ STATE
  const [filieres, setFilieres] = useState<Filiere[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2️⃣ EFFECT - Run once on mount
  useEffect(() => {
    loadFilieres();
  }, []);

  // 3️⃣ FUNCTION - Load data from API
  const loadFilieres = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFilieres();
      setFilieres(data);
    } catch (err: any) {
      setError(err.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  // 4️⃣ RENDER
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Filières</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nom</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filieres.map((filiere) => (
            <tr key={filiere.id}>
              <td className="border p-2">{filiere.nom}</td>
              <td className="border p-2">{filiere.description}</td>
              <td className="border p-2">
                <button>Modifier</button>
                <button>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

### Step 4: Form Component (FiliereForm.tsx)

```typescript
import { useState } from 'react';
import { createFiliere, updateFiliere } from '@/api/filiere.api';
import type { Filiere } from '@/types';

interface FiliereFormProps {
  filiere?: Filiere;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function FiliereForm({ filiere, onSuccess, onCancel }: FiliereFormProps) {
  const [formData, setFormData] = useState({
    nom: filiere?.nom || '',
    description: filiere?.description || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (filiere?.id) {
        await updateFiliere(filiere.id, formData);
      } else {
        await createFiliere(formData);
      }
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">
        {filiere ? 'Modifier Filière' : 'Créer Filière'}
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block text-sm font-medium">Nom *</label>
        <input
          type="text"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-2 py-1"
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="flex-1 bg-gray-300 px-4 py-2 rounded">
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
```

### Step 5: Page (FilieresPage.tsx)

```typescript
import { useState } from 'react';
import { FiliereList, FiliereForm } from '@/components/filieres';

export default function FilieresPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Filières</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {showForm ? 'Annuler' : '+ Ajouter'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-gray-50 p-4 rounded">
          <FiliereForm 
            onSuccess={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <FiliereList />
    </div>
  );
}
```

### Step 6: Export (index files)

```typescript
// src/components/filieres/index.tsx
export { FiliereList } from './FiliereList';
export { FiliereForm } from './FiliereForm';

// src/pages/filieres/index.ts
export { default as FilieresPage } from './FilieresPage';
```

---

## 📝 useState PATTERN

Every component follows this simple pattern:

```typescript
// 1️⃣ Import
import { useState, useEffect } from 'react';

// 2️⃣ Component
export function MyComponent() {
  // STATE: All your variables
  const [data, setData] = useState<Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // EFFECT: Load data when component mounts
  useEffect(() => {
    loadData();
  }, []); // Empty [] = run once on mount

  // FUNCTION: Load from API
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFromAPI();
      setData(result);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // RENDER: Display
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{/* Your JSX */}</div>;
}
```

---

## 🔗 IMPORT PATHS

Use `@/` alias (configured in tsconfig):

```typescript
// ✅ Good
import { AbsenceList } from '@/components/absences';
import { AbsencesPage } from '@/pages/absences';
import { getAbsences } from '@/api/absence.api';

// ❌ Bad
import { AbsenceList } from '../../../components/absences';
```

---

## 📋 PRISMA MODELS → COMPONENTS MAPPING

Based on your Prisma schema:

| Model | Component Path | Page Path |
|-------|----------------|-----------|
| Absence | `src/components/absences/` | `src/pages/absences/` |
| Cours | `src/components/cours/` | `src/pages/cours/` |
| Etudiant | `src/components/etudiants/` | `src/pages/etudiants/` |
| Enseignant | `src/components/enseignants/` | `src/pages/enseignants/` |
| Examen | `src/components/examens/` | `src/pages/examens/` |
| Filiere | `src/components/filieres/` | `src/pages/filieres/` |
| Groupe | `src/components/groupes/` | `src/pages/groupes/` |
| Module | `src/components/modules/` | `src/pages/modules/` |
| Event | `src/components/events/` | `src/pages/events/` |
| Opportunite | `src/components/opportunites/` | `src/pages/opportunites/` |

---

## ⚠️ WHAT TO AVOID

```typescript
// ❌ DON'T: Complex logic in components
const handleComplexLogic = useCallback(() => {
  // 100 lines of logic here
}, [dependencies...]);

// ✅ DO: Simple, readable code
const handleClick = async () => {
  setLoading(true);
  try {
    await doSomething();
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

```typescript
// ❌ DON'T: Deeply nested conditionals
return isLoading ? (
  <div>{isError ? <div>Error</div> : <div>Loading</div>}</div>
) : (
  <div>{data ? <div>{data.map(...)} </div> : <div>Empty</div>}</div>
);

// ✅ DO: Early returns
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
return <div>{data.map(...)}</div>;
```

---

## 🚀 GETTING STARTED

1. Follow the "HOW TO ADD A NEW MODEL" section above
2. Create component files (List, Form, Card)
3. Create page file
4. Create API file (if not exists)
5. Add route to your router

---

## 💡 TIPS

- **Keep components small**: One component = one responsibility
- **Use props**: Pass data via props, not via context/store (unless necessary)
- **Error handling**: Always have try/catch/finally
- **Loading states**: Always show loading indicator
- **Naming**: Be explicit (AbsenceList not List, DeleteButton not Btn)

---

## 📞 QUESTIONS?

This is a beginner-friendly structure. Focus on:
1. Understanding the component pattern
2. Using useState for local state
3. Using API calls in useEffect
4. Passing data via props

Good luck! 🎉
