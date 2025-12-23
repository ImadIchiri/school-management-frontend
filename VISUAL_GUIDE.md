
# 📊 VISUAL ARCHITECTURE GUIDE

## Component Hierarchy

```
App
│
├── Router
│   ├── Route: /absences → AbsencesPage
│   ├── Route: /cours → CoursPage
│   ├── Route: /etudiants → EtudiantsPage
│   └── ...
│
└── Each Page uses Components
    │
    ├── AbsencesPage
    │   ├── AbsenceForm (create/edit)
    │   └── AbsenceList
    │       └── Maps to table rows
    │
    ├── CoursPage
    │   ├── CoursForm
    │   └── CoursList
    │
    └── ...
```

---

## File Organization

```
📁 src/
│
├── 📁 components/
│   ├── 📁 absences/
│   │   ├── 📄 AbsenceList.tsx      (Display all)
│   │   ├── 📄 AbsenceForm.tsx      (Create/Edit)
│   │   ├── 📄 AbsenceCard.tsx      (Optional - single item)
│   │   └── 📄 index.tsx            (Exports)
│   │
│   ├── 📁 cours/
│   │   ├── 📄 CoursList.tsx
│   │   ├── 📄 CoursForm.tsx
│   │   └── 📄 index.tsx
│   │
│   ├── 📁 etudiants/
│   │   ├── 📄 EtudiantList.tsx
│   │   ├── 📄 EtudiantForm.tsx
│   │   └── 📄 index.tsx
│   │
│   ├── 📁 enseignants/
│   │   └── ...
│   │
│   ├── 📁 examens/
│   │   └── ...
│   │
│   ├── 📁 events/
│   ├── 📁 opportunites/
│   ├── 📁 filieres/
│   ├── 📁 groupes/
│   ├── 📁 modules/
│   │
│   └── 📁 shared/
│       ├── 📄 Button.tsx
│       ├── 📄 Input.tsx
│       ├── 📄 Modal.tsx
│       └── ...
│
├── 📁 pages/
│   ├── 📁 absences/
│   │   ├── 📄 AbsencesPage.tsx     (Full page)
│   │   └── 📄 index.ts             (Export)
│   │
│   ├── 📁 cours/
│   │   ├── 📄 CoursPage.tsx
│   │   └── 📄 index.ts
│   │
│   ├── 📁 etudiants/
│   │   └── ...
│   │
│   ├── 📁 enseignants/
│   ├── 📁 examens/
│   └── ...
│
├── 📁 api/
│   ├── 📄 absence.api.ts           (API calls)
│   ├── 📄 cours.api.ts
│   ├── 📄 examen.api.ts
│   ├── 📄 axiosInstance.ts
│   └── 📄 index.ts
│
├── 📁 router/
│   └── 📄 index.tsx                (Route definitions)
│
├── 📁 types/
│   ├── 📄 common.ts
│   └── 📄 index.ts
│
├── 📁 store/
│   ├── 📄 auth.ts
│   └── 📄 ui.ts
│
└── 📁 lib/
    └── ...
```

---

## Data Flow Example: Absence Management

```
┌─────────────────────────────────────────────────────────┐
│                    ABSENCE PAGE                          │
│  (src/pages/absences/AbsencesPage.tsx)                 │
│  - Title: "Gestion des Absences"                        │
│  - Button: "+ Ajouter une absence"                      │
│  - State: showForm (true/false)                         │
└──────────────┬──────────────────────────────────────────┘
               │
        ┌──────┴──────┐
        │             │
        ▼             ▼
   ┌─────────┐   ┌──────────┐
   │ FORM    │   │  LIST    │
   │ Hidden  │   │ Visible  │
   └────┬────┘   └────┬─────┘
        │             │
        │          (useEffect runs once)
        │             │
        │             ▼
        │        ┌─────────────────┐
        │        │ loadAbsences()  │
        │        │ (async)         │
        │        └────────┬────────┘
        │                 │
        │                 ▼
        │        ┌─────────────────────┐
        │        │ getAbsences() API   │
        │        │ (from backend)      │
        │        └────────┬────────────┘
        │                 │
        │                 ▼
        │        ┌──────────────────┐
        │        │ setAbsences(data)│
        │        │ (update state)   │
        │        └────────┬─────────┘
        │                 │
        │                 ▼
        │        ┌──────────────────┐
        │        │ Table re-renders │
        │        └──────────────────┘
        │
        │  User clicks "+ Ajouter"
        │  │
        │  ▼
        │  setShowForm(true)
        │  │
        │  ▼
   ┌─────────────────────────────────┐
   │ FORM NOW VISIBLE                │
   │ User fills form                 │
   │ User clicks "Sauvegarder"       │
   │ handleSubmit() runs             │
   │         │                       │
   │         ▼                       │
   │  createAbsence(data)            │
   │  (API call)                     │
   │         │                       │
   │         ▼                       │
   │  onSuccess() callback           │
   │  - setShowForm(false)           │
   │  - loadAbsences() (refresh)     │
   └─────────────────────────────────┘
```

---

## Component Pattern - SIMPLE 4 STEPS

```
┌─────────────────────────────────────────┐
│  1️⃣ STATE                               │
│  const [absences, setAbsences] = ...   │
│  const [loading, setLoading] = ...     │
│  const [error, setError] = ...         │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│  2️⃣ EFFECT (runs on mount)              │
│  useEffect(() => {                     │
│    loadAbsences();                     │
│  }, []);                               │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│  3️⃣ FUNCTION (get data)                 │
│  const loadAbsences = async () => {    │
│    setLoading(true);                   │
│    const data = await getAbsences();   │
│    setAbsences(data);                  │
│  };                                    │
└─────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────┐
│  4️⃣ RENDER (display)                    │
│  return (                              │
│    <div>                               │
│      {loading && <div>Loading</div>}  │
│      {error && <div>Error</div>}      │
│      {absences.map(...)}               │
│    </div>                              │
│  );                                    │
└─────────────────────────────────────────┘
```

---

## API Call Flow

```
Component                API                 Backend
    │                     │                     │
    ├─ Call API ────────➤ │                     │
    │ getAbsences()       │ HTTP GET            │
    │                     ├──────────────────➤ │
    │                     │   /api/absences    │
    │                     │                 [Process]
    │                     │◀──────────────────┤
    │                     │   JSON Response    │
    │◀─ Promise resolved ─┤                    │
    │ [data]              │                    │
    │                     │                    │
  [Handle]                │                    │
  setAbsences(data)       │                    │
    │                    │                    │
    ▼                    ▼                    ▼
[Re-render]            [Done]                [Done]
```

---

## State Management - Simple vs Complex

```
SIMPLE (✅ Current approach)
┌─────────────────────────────────┐
│ Component                        │
│ ├── const [items, setItems]     │
│ ├── const [loading, ...]        │
│ ├── const [error, ...]          │
│ │                               │
│ └── useEffect(() => {           │
│     loadItems();                │
│     }, [])                      │
└─────────────────────────────────┘
     │
     └── Render with state


COMPLEX (❌ Old approach - avoid)
┌─────────────────────────┐
│  src/features/absences  │
├── hooks.ts              │
├── store.ts (Zustand)    │
├── services.ts           │
├── types.ts              │
└── reducer.ts (Redux)    │
     │
     └── Over-engineered!
         Too many files!
```

---

## Adding a New Model - Visual Checklist

```
1️⃣ CREATE FOLDERS
   ├── src/components/[model]/
   └── src/pages/[model]/

2️⃣ COPY TEMPLATES (from QUICK_REFERENCE.md)
   ├── [Model]List.tsx
   ├── [Model]Form.tsx
   ├── [Model]sPage.tsx

3️⃣ REPLACE NAMES
   ├── absence → [model]
   ├── Absence → [Model]
   ├── absences → [models]

4️⃣ UPDATE FIELDS
   ├── id → your primary key
   ├── field1 → your Prisma fields
   └── field2 → your Prisma fields

5️⃣ CREATE API (if needed)
   └── src/api/[model].api.ts

6️⃣ ADD ROUTE
   └── src/router/index.tsx
      <Route path="/[models]" element={<[Model]sPage />} />

7️⃣ DONE! 🎉
```

---

## Model Priority (Implementation Order)

```
HIGH PRIORITY (Start here)
├── Absence (✅ Already done!)
├── Cours
├── Etudiant
├── Enseignant
└── Examen

MEDIUM PRIORITY (Next)
├── Filiere
├── Groupe
├── Module
└── Planning

LOW PRIORITY (Later)
├── Event
├── Opportunite
├── Salle
├── RolePermission
└── Other admin models
```

---

## Folder Naming Convention

```
MODELS (Prisma)         FOLDERS (Components)    PAGES
─────────────           ────────────────────    ─────
Absence                 absences/               pages/absences/
Cours                   cours/                  pages/cours/
Etudiant                etudiants/              pages/etudiants/
Enseignant              enseignants/            pages/enseignants/
Examen                  examens/                pages/examens/
Filiere                 filieres/               pages/filieres/
Groupe                  groupes/                pages/groupes/
Module                  modules/                pages/modules/
Event                   events/                 pages/events/
Opportunite             opportunites/           pages/opportunites/
Planning                plannings/              pages/plannings/
Salle                   salles/                 pages/salles/
```

---

## Quick Decision Tree

```
QUESTION: Where should I put this code?

Is it reusable?
├─ YES → components/
│       └─ Is it a full page?
│           ├─ YES → pages/
│           └─ NO → components/[model]/
│
└─ NO → pages/ (page-specific logic)


Is it an API call?
├─ YES → api/
└─ NO → continue above

Is it a type/interface?
├─ YES → types/
└─ NO → continue above

Is it global state?
├─ YES → store/
└─ NO → continue above
```

---

## Done! 🎉

You now understand:
✅ The folder structure
✅ How data flows
✅ The simple 4-step component pattern
✅ How to add new models
✅ The naming conventions

Ready to build! 🚀
