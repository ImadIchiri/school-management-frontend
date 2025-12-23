
# 🗂️ FOLDER STRUCTURE SUMMARY

This is your new, clean, beginner-friendly project structure.

---

## BEFORE (Complex - Not recommended)
```
src/
  features/
    absences/
      hooks.ts (Custom hooks - too complex)
      store.ts
      types.ts
      services.ts
    cours/
    etudiants/
    ...
```

## AFTER (Clean & Simple - Recommended)
```
src/
  components/           ← Reusable UI components
    absences/
      AbsenceList.tsx   ← Display list of absences
      AbsenceForm.tsx   ← Form to create/edit
      index.tsx         ← Exports all components
    cours/
      CoursList.tsx
      index.tsx
    etudiants/
      EtudiantList.tsx
      index.tsx
    enseignants/
      EnseignantList.tsx
      index.tsx
    examens/
      ExamenList.tsx
      index.tsx
    events/
      EventList.tsx
      index.tsx
    opportunites/
      OpportuniteList.tsx
      index.tsx
    filieres/
    groupes/
    modules/
    shared/            ← Shared components (Button, Input, etc)
  
  pages/                ← Full page components
    absences/
      AbsencesPage.tsx  ← Full page (uses components)
      index.ts          ← Export
    cours/
      CoursPage.tsx
      index.ts
    etudiants/
      EtudiantsPage.tsx
      index.ts
    enseignants/
      EnseignantsPage.tsx
      index.ts
    examens/
      ExamensPage.tsx
      index.ts
    ... (other pages)

  api/                  ← API calls (unchanged)
    absence.api.ts      ← Functions to call API
    cours.api.ts
    examen.api.ts
    axiosInstance.ts
    index.ts

  types/                ← TypeScript types (if needed)
    common.ts
    absences.ts
    ... (other types)

  router/               ← Routes (unchanged)
    index.tsx

  store/                ← Global state (if needed)
    auth.ts
    ui.ts

  ...other files
```

---

## 🎯 WHAT GOES WHERE?

### `src/components/` - Reusable UI Blocks
- **List components**: Show data in table/list
- **Form components**: Create/edit single items
- **Card components**: Show single item nicely
- **Shared components**: Buttons, Inputs, etc

**Example:**
```
components/absences/
├── AbsenceList.tsx    ← Shows all absences
├── AbsenceForm.tsx    ← Form to add/edit
└── index.tsx          ← Export

components/examens/
├── ExamenList.tsx     ← Shows all exams
├── ExamenForm.tsx
└── index.tsx
```

### `src/pages/` - Full Pages
- **One page per model**
- Use components to build the page
- Handle page-level state (showing/hiding form, etc)

**Example:**
```
pages/absences/
├── AbsencesPage.tsx   ← Full page with title + buttons + components
└── index.ts           ← Export

pages/examens/
├── ExamensPage.tsx
└── index.ts
```

### `src/api/` - API Calls
- Functions that call your backend
- Handle HTTP requests
- One file per model (usually)

**Example:**
```
api/
├── absence.api.ts     ← getAbsences(), createAbsence(), etc
├── cours.api.ts
├── examen.api.ts
└── axiosInstance.ts   ← Setup (auth, base URL, etc)
```

---

## 📚 HOW COMPONENTS USE EACH OTHER

### Simple Flow:
```
Page
├── Component 1 (List)
│   └── Uses API to get data
└── Component 2 (Form)
    └── Uses API to save data
```

### Real Example (Absence Page):
```
AbsencesPage.tsx
├── Button "+ Ajouter"
│   └── Shows/hides form
├── AbsenceForm.tsx
│   └── Calls createAbsence() API
└── AbsenceList.tsx
    ├── Calls getAbsences() API
    └── Shows table with data
```

---

## 🔄 DATA FLOW

### Reading Data
```
1. Page mounts → AbsenceList mounts
2. AbsenceList useEffect runs
3. Calls API: getAbsences()
4. API returns data
5. setAbsences(data) → component re-renders
6. Table shows data
```

### Creating Data
```
1. User clicks "+ Ajouter"
2. showForm state becomes true
3. AbsenceForm appears
4. User fills form
5. User clicks "Sauvegarder"
6. handleSubmit() runs
7. Calls API: createAbsence(formData)
8. API returns new item
9. onSuccess() callback runs
10. Form hides
11. List refreshes automatically (or you refresh it)
```

---

## 🏗️ EVERY MODEL NEEDS

### 1. Components (`src/components/[model]/`)
- `[Model]List.tsx` - Display list
- `[Model]Form.tsx` - Create/edit form
- `index.tsx` - Export both

### 2. Page (`src/pages/[model]/`)
- `[Model]sPage.tsx` - Full page
- `index.ts` - Export

### 3. API (`src/api/`) - If not exists
- `[model].api.ts` - API functions
  - `get[Models]()` - Get all
  - `get[Model]ById(id)` - Get one
  - `create[Model](data)` - Create
  - `update[Model](id, data)` - Edit
  - `delete[Model](id)` - Delete

---

## 📝 PRISMA → COMPONENTS MAPPING

Based on your Prisma schema:

| Prisma Model | Component Path | Page Path |
|---|---|---|
| `Absence` | `components/absences/` | `pages/absences/` |
| `Cours` | `components/cours/` | `pages/cours/` |
| `Etudiant` | `components/etudiants/` | `pages/etudiants/` |
| `Enseignant` | `components/enseignants/` | `pages/enseignants/` |
| `Examen` | `components/examens/` | `pages/examens/` |
| `Filiere` | `components/filieres/` | `pages/filieres/` |
| `Groupe` | `components/groupes/` | `pages/groupes/` |
| `Module` | `components/modules/` | `pages/modules/` |
| `Event` | `components/events/` | `pages/events/` |
| `Opportunite` | `components/opportunites/` | `pages/opportunites/` |
| `Planning` | `components/plannings/` | `pages/plannings/` |
| `Salle` | `components/salles/` | `pages/salles/` |

---

## ✨ BENEFITS OF THIS STRUCTURE

✅ **Easy to find things** - Everything in one place
✅ **Beginner friendly** - Simple patterns you can copy
✅ **Scalable** - Add new models = copy a folder
✅ **Reusable** - Components can be used elsewhere
✅ **Testable** - Each component is independent
✅ **No complexity** - Just `useState` + `useEffect` + API calls

---

## 🚀 QUICK CHECKLIST

Adding a new model (e.g., `Planning`):

- [ ] Create `src/components/plannings/` folder
- [ ] Create `PlanningList.tsx` (copy template from `QUICK_REFERENCE.md`)
- [ ] Create `PlanningForm.tsx` (copy template)
- [ ] Create `index.tsx` (export both)
- [ ] Create `src/pages/plannings/` folder
- [ ] Create `PlanningsPage.tsx` (copy template)
- [ ] Create `index.ts` (export)
- [ ] Create/Update `src/api/planning.api.ts`
- [ ] Add route in router
- [ ] Done! 🎉

---

## 📞 QUESTIONS?

Refer to:
- **`NEW_STRUCTURE_GUIDE.md`** - Detailed explanation + examples
- **`QUICK_REFERENCE.md`** - Copy-paste templates
- **Example files** - Look at `AbsenceList.tsx`, `AbsenceForm.tsx`, etc.

Good luck! 🚀
