# School Management Frontend - Documentation

## Architecture Implémentée

### 1. Infrastructure API
- **`src/config/api.ts`** : Configuration des endpoints API
- **`src/services/axios.ts`** : Instance Axios avec configuration
- **`src/services/interceptors.ts`** : Intercepteurs (auth, error handling)
- **`src/types/common.ts`** : Types globaux (ApiResponse, User, etc.)

### 2. APIs
- **`src/api/examen.api.ts`** : API calls pour examens
- **`src/api/absence.api.ts`** : API calls pour absences
- **`src/api/planning.api.ts`** : API calls pour planning (in-memory warning)

### 3. Features

#### Examens (`src/features/examens/`)
- **types.ts** : Interfaces Examen, EtudiantExamen, DTOs
- **hooks.ts** : useExamens, useExamenById, useCreateExamen, useUpdateExamen, useDeleteExamen
- **components/**
  - `ExamTable.tsx` : Tableau liste examens + filtres
  - `ExamForm.tsx` : Formulaire création/édition examen
  - `StudentExamTable.tsx` : Table gestion notes étudiants
- **pages/**
  - `ExamListPage.tsx` : Listing + CRUD
  - `ExamCreatePage.tsx` : Création examen
  - `ExamEditPage.tsx` : Édition examen

#### Notes (`src/features/notes/`)
- **types.ts** : Types Note (alias EtudiantExamen)
- **pages/**
  - `NotesPage.tsx` : Gestion notes par examen (édition inline)

#### Absences (`src/features/absences/`)
- **types.ts** : Interfaces Absence, StatutPresence enum, DTOs
- **hooks.ts** : useAbsences, useAbsenceById, useCreateAbsence, useUpdateAbsence, useDeleteAbsence
- **components/**
  - `AbsenceForm.tsx` : Formulaire création/édition/justification
  - `AbsenceList.tsx` : Tableau liste absences + filtres + actions
- **pages/**
  - `AbsencePage.tsx` : Gestion absences (Create, Edit, Justify, Delete)

### 4. Composants Partagés (`src/shared/components/`)
- **Modal.tsx** : Modal réutilisable (Create, Edit, Confirm)
- **Select.tsx** : Composant Select avec validation
- **DatePicker.tsx** : Input date/datetime-local
- **Toast.tsx** : Toast notifications + useToast hook
- **Loading.tsx** : Spinner + Skeleton loading

### 5. Router
- **`src/router/index.tsx`** : Configuration routes
  - `/` : Dashboard
  - `/exams` : Liste examens
  - `/exams/create` : Créer examen
  - `/exams/:id/edit` : Éditer examen
  - `/exams/:examenId/notes` : Gestion notes
  - `/absences` : Gestion absences

## Configuration

### Variables d'environnement
Créer `.env` à partir de `.env.example` :
```env
VITE_API_URL=http://localhost:3000
```

### Installation
```bash
npm install
```

### Démarrage
```bash
npm run dev
```

## Points d'Attention

### ⚠️ Mock Data
Actuellement, les listes (modules, enseignants, salles, étudiants, cours) sont en mock :
- `ExamForm.tsx` (mockModules, mockEnseignants, etc.)
- `AbsenceForm.tsx` (mockEtudiants, mockCours)

**À faire** : Remplacer par appels API réels
```typescript
// Exemple : créer des API calls pour récupérer modules
const getModules = async () => {
  const response = await axiosInstance.get('/modules');
  return response.data;
};
```

### ⚠️ Planning In-Memory
Le planning est actuellement non persisté (seed data). Si vous souhaitez le rendre persistant :
1. Remplacer les appels in-memory par des appels Prisma backend
2. Ajouter les routes backend manquantes

### ⚠️ Upload Justificatifs
La justification d'absence accepte actuellement un simple texte (motif). Pour ajouter upload fichier :
1. Modifier `AbsenceForm.tsx` : ajouter `<input type="file" />`
2. Backend : ajouter endpoint `/upload` ou modifier PUT /absence/:id pour FormData

### ✅ Auth Token
Les intercepteurs cherchent le token dans `localStorage.getItem('auth_token')`. Assurez-vous qu'après login, le token est stocké :
```typescript
localStorage.setItem('auth_token', token);
```

## Workflow Recommandé

### Phase 1 : Test avec Mock Data
1. `npm run dev`
2. Vérifier que les modals s'ouvrent et ferment
3. Valider les formulaires

### Phase 2 : Intégration Backend
1. Démarrer backend sur port 3000
2. Remplacer mock data par appels API réels
3. Tester chaque CRUD

### Phase 3 : Optimisations
1. Ajouter pagination si listes volumineuses
2. Ajouter validations métier additionnelles
3. Améliorer UX (skeletons, optimistic updates)

## Structure de Fichiers Complète

```
src/
├── api/
│   ├── examen.api.ts
│   ├── absence.api.ts
│   └── planning.api.ts
│
├── config/
│   └── api.ts
│
├── features/
│   ├── examens/
│   │   ├── components/
│   │   │   ├── ExamTable.tsx
│   │   │   ├── ExamForm.tsx
│   │   │   └── StudentExamTable.tsx
│   │   ├── pages/
│   │   │   ├── ExamListPage.tsx
│   │   │   ├── ExamCreatePage.tsx
│   │   │   └── ExamEditPage.tsx
│   │   ├── hooks.ts
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── notes/
│   │   ├── pages/
│   │   │   └── NotesPage.tsx
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   └── absences/
│       ├── components/
│       │   ├── AbsenceForm.tsx
│       │   └── AbsenceList.tsx
│       ├── pages/
│       │   └── AbsencePage.tsx
│       ├── hooks.ts
│       ├── types.ts
│       └── index.ts
│
├── services/
│   ├── axios.ts
│   └── interceptors.ts
│
├── shared/
│   └── components/
│       ├── Modal.tsx
│       ├── Select.tsx
│       ├── DatePicker.tsx
│       ├── Toast.tsx
│       ├── Loading.tsx
│       └── index.ts
│
├── types/
│   └── common.ts
│
├── router/
│   └── index.tsx
│
├── App.tsx
└── main.tsx
```

## Prochaines Étapes

1. **Récupérer master data depuis API** :
   - Modules, Enseignants, Cours, Salles, Étudiants
   - Créer des hooks / services dédiés

2. **Ajouter pagination** sur les listes (examens, absences)

3. **Upload fichiers** pour justifications

4. **Statistiques/Dashboard** :
   - Graphiques taux absence par étudiant
   - Histogramme notes par examen
   - Top performers

5. **Export données** (CSV, PDF)

6. **Notifications temps réel** (WebSocket)

---

**Créé avec ❤️ pour school-management**
