
# ⚡ QUICK START - BEGINNER CODE TEMPLATE

This is the **standard pattern** for EVERY component. Copy and adapt!

---

## 📋 PATTERN 1: LIST COMPONENT

Use this for displaying all items of a model.

```typescript
// src/components/[model]/[Model]List.tsx

import { useState, useEffect } from 'react';
import { get[Models] } from '@/api/[model].api'; // Your API function
import type { [Model] } from '@/types'; // Your type

export function [Model]List() {
  // STATE
  const [[models], set[Models]] = useState<[Model][]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // EFFECT - Load data on mount
  useEffect(() => {
    load[Models]();
  }, []);

  // FUNCTION - Load from API
  const load[Models] = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await get[Models]();
      set[Models](data);
    } catch (err: any) {
      setError(err.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };

  // RENDER
  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">[Models]</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Colonne 1</th>
            <th className="border p-2">Colonne 2</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[models].map(([model]) => (
            <tr key={[model].id} className="hover:bg-gray-50">
              <td className="border p-2">{[model].field1}</td>
              <td className="border p-2">{[model].field2}</td>
              <td className="border p-2">
                <button>Éditer</button>
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

---

## 📝 PATTERN 2: FORM COMPONENT

Use this for creating and editing items.

```typescript
// src/components/[model]/[Model]Form.tsx

import { useState } from 'react';
import { create[Model], update[Model] } from '@/api/[model].api';
import type { [Model] } from '@/types';

interface [Model]FormProps {
  [model]?: [Model]; // undefined = create, defined = edit
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function [Model]Form({ [model], onSuccess, onCancel }: [Model]FormProps) {
  // STATE
  const [formData, setFormData] = useState({
    field1: [model]?.field1 || '',
    field2: [model]?.field2 || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // FUNCTION - Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // FUNCTION - Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if ([model]?.id) {
        await update[Model]([model].id, formData);
      } else {
        await create[Model](formData);
      }
      onSuccess?.();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // RENDER
  return (
    <form onSubmit={handleSubmit} className="max-w-md p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">
        {[model] ? 'Modifier' : 'Créer'} [Model]
      </h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-4">
        <label className="block text-sm font-medium">Field 1 *</label>
        <input
          type="text"
          name="field1"
          value={formData.field1}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Field 2</label>
        <input
          type="text"
          name="field2"
          value={formData.field2}
          onChange={handleChange}
          className="w-full border px-2 py-1"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 px-4 py-2 rounded"
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
```

---

## 📄 PATTERN 3: PAGE COMPONENT

Use this to create a full page.

```typescript
// src/pages/[model]/[Model]sPage.tsx

import { useState } from 'react';
import { [Model]List, [Model]Form } from '@/components/[model]';

export default function [Model]sPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">[Models]</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showForm ? 'Annuler' : '+ Ajouter'}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-gray-50 p-4 rounded">
          <[Model]Form
            onSuccess={() => setShowForm(false)}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <[Model]List />
    </div>
  );
}
```

---

## 📤 PATTERN 4: INDEX FILES (EXPORTS)

```typescript
// src/components/[model]/index.tsx
export { [Model]List } from './[Model]List';
export { [Model]Form } from './[Model]Form';

// src/pages/[model]/index.ts
export { default as [Model]sPage } from './[Model]sPage';
```

---

## 🎯 REPLACEMENTS FOR YOUR CODE

Just find and replace:
- `[model]` → Your model name (lowercase, singular): `absence`, `cours`, `etudiant`
- `[Model]` → Your model name (PascalCase): `Absence`, `Cours`, `Etudiant`
- `[Models]` → Your model name (lowercase, plural): `absences`, `cours`, `etudiants`
- `field1, field2` → Your actual fields from Prisma

---

## ✅ EXAMPLE: Filiere

```typescript
// Component
const [filieres, setFilieres] = useState<Filiere[]>([]);

// Form
const [formData, setFormData] = useState({
  nom: filiere?.nom || '',
  description: filiere?.description || '',
});

// Button
{showForm ? 'Annuler' : '+ Ajouter une Filière'}
```

---

## 🚀 STEPS TO ADD A NEW MODEL

1. **Create folders**
   ```
   src/components/[model]/
   src/pages/[model]/
   ```

2. **Create component files** (copy patterns 1 & 2)
   - `[Model]List.tsx`
   - `[Model]Form.tsx`
   - `index.tsx`

3. **Create page file** (copy pattern 3)
   - `[Model]sPage.tsx`
   - `index.ts`

4. **Create API file** (if not exists)
   - `src/api/[model].api.ts`

5. **Add to router**
   ```typescript
   import { [Model]sPage } from '@/pages/[model]';
   // Add route: <Route path="/[model]s" element={<[Model]sPage />} />
   ```

Done! 🎉

---

## 💡 TIPS

✅ **Do this:**
- Simple components (one responsibility)
- Handle errors with try/catch/finally
- Show loading indicators
- Use descriptive names

❌ **Don't do this:**
- Complex nested logic
- Forget error handling
- Leave spinners out
- Use abbreviations (Btn, Lst, Frm)

---

## 📞 CHEAT SHEET

```typescript
// Import
import { useState, useEffect } from 'react';

// State
const [value, setValue] = useState<Type>(initialValue);

// Effect (run once)
useEffect(() => {
  doSomething();
}, []);

// Effect (run on change)
useEffect(() => {
  doSomething();
}, [dependency]);

// Async function
const loadData = async () => {
  try {
    const result = await fetchAPI();
    setValue(result);
  } catch (err) {
    setError(err.message);
  }
};

// Render
if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
return <div>{data}</div>;
```

Good luck! 🚀
