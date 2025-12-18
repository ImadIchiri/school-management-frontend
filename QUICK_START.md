# 🚀 Quick Start - Frontend School Management

## Installation & Setup (5 min)

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env
# Éditer .env - vérifier VITE_API_URL

# 3. Démarrer
npm run dev
# Accéder à http://localhost:5173
```

## Routes Disponibles

| Route | Description | Composant |
|-------|-------------|-----------|
| `/` | Dashboard | Home |
| `/exams` | Liste examens | ExamListPage |
| `/exams/create` | Créer examen | ExamCreatePage |
| `/exams/:id/edit` | Éditer examen | ExamEditPage |
| `/exams/:examenId/notes` | Gestion notes | NotesPage |
| `/absences` | Gestion absences | AbsencePage |

## Structure API Attendue

### Backend doit exposer

```
GET  /api/v1/examen          # Liste examens (filtres: moduleId, enseignantId, from, to)
GET  /api/v1/examen/:id      # Détail examen
POST /api/v1/examen          # Créer examen
PUT  /api/v1/examen/:id      # Éditer + gérer notes
DELETE /api/v1/examen/:id    # Soft-delete

GET  /api/v1/absence         # Liste absences
GET  /api/v1/absence/:id     # Détail
POST /api/v1/absence         # Créer absence
PUT  /api/v1/absence/:id     # Éditer (justification, motif)
DELETE /api/v1/absence/:id   # Soft-delete

GET  /api/v1/plannings       # Liste planning (in-memory)
```

## Étapes Intégration Backend

### 1. Mock Data → API Réelle

**Fichiers à modifier :**
- `src/features/examens/pages/ExamCreatePage.tsx`
- `src/features/examens/pages/ExamEditPage.tsx`
- `src/features/absences/pages/AbsencePage.tsx`

**Pattern :**
```typescript
// Avant (mock)
const mockModules = [
  { id: '1', nom: 'Mathématiques' },
];

// Après (API)
const [modules, setModules] = useState([]);

useEffect(() => {
  getModules().then(setModules).catch(handleError);
}, []);
```

### 2. Créer Services pour Master Data

Créer `src/api/masterdata.api.ts` :
```typescript
export const getModules = async () => {
  const response = await axiosInstance.get('/modules');
  return response.data;
};

export const getEnseignants = async () => {
  const response = await axiosInstance.get('/enseignants');
  return response.data;
};

export const getEtudiants = async () => {
  const response = await axiosInstance.get('/etudiants');
  return response.data;
};

export const getCours = async () => {
  const response = await axiosInstance.get('/cours');
  return response.data;
};
```

### 3. Intégrer dans Composants

```typescript
// ExamCreatePage.tsx
import { getModules, getEnseignants, getEtudiants, getSalles } from '@/api/masterdata.api';

const [modules, setModules] = useState([]);
const [enseignants, setEnseignants] = useState([]);

useEffect(() => {
  Promise.all([
    getModules().then(setModules),
    getEnseignants().then(setEnseignants),
    getEtudiants().then(setEtudiants),
    getSalles().then(setSalles),
  ]).catch(err => showToast('error', 'Erreur chargement données'));
}, []);
```

## Checklist Développement

### Phase 1 : Structure ✅
- [x] Infrastructure API
- [x] Types TypeScript
- [x] Services API
- [x] Hooks React
- [x] Composants UI

### Phase 2 : Examens
- [ ] Remplacer mock modules/enseignants/étudiants/salles
- [ ] Tester CRUD examens
- [ ] Tester gestion notes (edit inline)
- [ ] Tester soft-delete

### Phase 3 : Absences
- [ ] Remplacer mock étudiants/cours
- [ ] Tester CRUD absences
- [ ] Tester justification
- [ ] Tester soft-delete

### Phase 4 : Polish
- [ ] Ajouter toasts success/error
- [ ] Ajouter validations avancées
- [ ] Ajouter pagination si nécessaire
- [ ] Améliorer UX (animations, skeletons)

## Erreurs Courantes & Solutions

### ❌ "Cannot POST /api/v1/examen"
**Cause :** Backend non démarré ou port incorrect
**Solution :** 
```bash
# Vérifier backend URL
cat .env | grep VITE_API_URL

# Vérifier backend tourne
curl http://localhost:3000/api/v1/examen
```

### ❌ "401 Unauthorized"
**Cause :** Token auth manquant/invalide
**Solution :**
```typescript
// Vérifier token stocké
localStorage.getItem('auth_token')

// Après login, stocker :
localStorage.setItem('auth_token', response.data.token);
```

### ❌ "CORS error"
**Cause :** Backend pas configuré pour accepter frontend URL
**Solution :** Backend ajouter CORS middleware :
```typescript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
```

### ❌ "Cannot find module '@/..'"
**Cause :** Alias TypeScript pas bien configuré
**Solution :**
```bash
# Vérifier tsconfig.json
cat tsconfig.json | grep paths

# Devrait contenir : "@/*": ["./src/*"]
```

## Tips Debugging

### 1. Voir requêtes API
```typescript
// Dans src/services/interceptors.ts, ajouter log:
instance.interceptors.request.use(config => {
  console.log('📤 Request:', config.method?.toUpperCase(), config.url);
  return config;
});

instance.interceptors.response.use(
  response => {
    console.log('📥 Response:', response.status, response.data);
    return response;
  }
);
```

### 2. Voir state Zustand (si utilisé)
```typescript
// Ajouter DevTools Zustand
import { devtools } from 'zustand/middleware';

export const useExamStore = create(
  devtools((set) => ({ /* ... */ }))
);
```

### 3. React DevTools
```bash
# Installer extension Chrome/Firefox
# https://react-devtools-tutorial.vercel.app/
```

## Performance Optimizations

### Lazy Loading Routes
```typescript
import { lazy, Suspense } from 'react';
import { Loading } from '@/shared/components/Loading';

const ExamListPage = lazy(() => import('@/features/examens/pages/ExamListPage'));

// Dans router :
{
  path: 'exams',
  element: (
    <Suspense fallback={<Loading fullPage />}>
      <ExamListPage />
    </Suspense>
  ),
}
```

### Memoization
```typescript
// Éviter re-renders inutiles
const ExamTable = React.memo(({ examens, onEdit }) => {
  // ...
});
```

### Pagination
```typescript
// Dans useExamens hook :
const [page, setPage] = useState(1);
const [pageSize] = useState(20);

const fetchExamens = useCallback(async () => {
  const data = await getExamens({
    page,
    pageSize,
    // ...filtres
  });
}, [page, pageSize]);
```

## Resources

- [React Router v7](https://reactrouter.com/start/library)
- [Axios Documentation](https://axios-http.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Besoin d'aide ?** Consulter `FRONTEND_STRUCTURE.md` pour détails complets.
