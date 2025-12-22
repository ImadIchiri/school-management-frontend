# Team Instructions

## docker build -t school-management-app . (crée une image basée sur notre Dockerfile DEV)

##  

## docker run -p 5173:5173 -v .:/app school-management-app (Run with live code updates)

# React + TypeScript + Vite

📌 Project Overview

This project is a modern frontend web application for a school management system, built with React + TypeScript.
It supports role & permission-based access control, modular architecture, and clean API communication.

The application is designed for:

Administrators

Administrative staff

Teachers

Students

Parents

🧰 Tech Stack

Vite + React + TypeScript

TailwindCSS

shadcn/ui

React Router v7

Axios (centralized instance + interceptors)

Zustand (auth & permissions state)

Docker (optional, for testing only)

📁 Project Structure
src/
├── api/
│ ├── axiosInstance.ts
│ ├── interceptors.ts
│ └── index.ts
│
├── components/
│ ├── ui/ # Shadcn UI components
│ ├── Button.tsx
│ ├── Input.tsx
│ ├── Modal.tsx
│ └── Table.tsx
│  
├──layout/
│ ├── Sidebar.tsx
│ └── Navbar.tsx
│
├── routes/
│ ├── routes.tsx
│ └── ProtectedRoute.tsx
│
├── store/
│ ├── auth.store.ts
│ └── permissions.store.ts
│
├── pages/
│ └── Login.tsx
│
├── App.tsx
└── main.tsx

🔐 Authentication & Permissions

Authentication is handled via JWT tokens

Permissions are stored in Zustand

Sidebar menu and routes are generated based on permissions, not roles

Example permission: cours_read, cours_create

🌐 Axios Setup (Centralized)
src/api/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
baseURL: import.meta.env.VITE_API_BASE_URL,
timeout: 10000,
headers: {
"Content-Type": "application/json",
},
withCredentials: false,
});

export default axiosInstance;

src/api/interceptors.ts
import axiosInstance from "./axiosInstance";

axiosInstance.interceptors.request.use((config) => {
const token = localStorage.getItem("access_token");
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
});

axiosInstance.interceptors.response.use(
(response) => response,
(error) => {
if (error.response?.status === 401) {
localStorage.clear();
window.location.href = "/login";
}
return Promise.reject(error);
}
);

⚠️ Interceptors are executed automatically on every request once imported.

📦 API Usage Example
src/modules/events/events.api.ts
import axiosInstance from "@/api";

export type EventAttributesTypes = {
id?: number;
titre: string;
date: Date;
employeId: number;
};

export const getEvents = () => axiosInstance.get("/events");
export const getEventById = (id: number) =>
axiosInstance.get(`/events/${id}`);
export const createEvent = (event: EventAttributesTypes) =>
axiosInstance.post("/events", event);
export const updateEvent = (event: EventAttributesTypes) =>
axiosInstance.put(`/events/${event.id}`, event);
export const deleteEvent = (id: number) =>
axiosInstance.delete(`/events/${id}`);

🧩 How to Create a New Module (Feature)

Example: Cours

src/modules/cours/
├── cours.api.ts
├── cours.permissions.ts
├── CoursList.tsx
├── CoursCreate.tsx
├── CoursEdit.tsx

Steps:

Create API file

Create pages

Add permissions

Add route

Sidebar auto-updates via permissions

🛡️ Protected Routes
<ProtectedRoute permissions={["cours_read"]}>
<CoursList />
</ProtectedRoute>

🧭 Navigation (Permission-Based)
{
name: "Cours",
href: "/cours",
icon: BookOpenIcon,
permissions: ["cours_read"]
}

Buttons (Create / Delete / Edit) use:

cours_create

cours_update

cours_delete

▶️ Run Project Locally
npm install
npm run dev

🐳 Docker (Optional)

Docker is not required. Only for testing.

docker build -t school-frontend .
docker run -p 5173:5173 school-frontend

👥 Team Workflow

Feature-based branches

Pull Requests required

PM reviews & validates

Permissions tested per module

📋 Task Distribution (Summary)

Ichiri Imad (PM): Architecture, Auth, Permissions, Layout, Review

Ayad Anwar: Auth, Users, Roles UI

Maftah Imane: Filières, Niveaux, Groups

Radouani Oumaima: Modules, Cours, Upload

Belbard Mouna: Examens, Notes, Absences

✅ Best Practices

No direct Axios usage (use axiosInstance)

No hardcoded permissions

One module = one folder

Clean commits & PRs

# Vite Content

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
