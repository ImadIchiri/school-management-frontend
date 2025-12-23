import DashboardLayout from "@/layouts/DashboardLayout";
import ExamensPage from "@/pages/examens";
import { ExamEditPage } from "@/features/examens/pages/ExamEditPage";
import { ExamCreatePage } from "@/features/examens/pages/ExamCreatePage";
import type { RouteObject } from "react-router";

const adminRoutes: RouteObject[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <div>
            <h2>This should Redirect To Dashboard</h2>
          </div>
        ),
      },
      {
        path: "dashboard",
        element: (
          <div>
            <h2>Welcome To dashboard</h2>
          </div>
        ),
      },
      {
        path: "filieres",
        element: (
          <div>
            <h2>Welcome To filieres</h2>
          </div>
        ),
      },
      {
        path: "niveaux",
        element: (
          <div>
            <h2>Welcome To niveaux</h2>
          </div>
        ),
      },
      {
        path: "groupes",
        element: (
          <div>
            <h2>Welcome To groupes</h2>
          </div>
        ),
      },
      {
        path: "modules",
        element: (
          <div>
            <h2>Welcome To modules</h2>
          </div>
        ),
      },
      {
        path: "cours",
        element: (
          <div>
            <h2>Welcome To cours</h2>
          </div>
        ),
      },
      {
        path: "examens",
        element: <ExamensPage />,
      },
      {
        path: "examens/create",
        element: <ExamCreatePage />,
      },
      {
        path: "examens/:id/edit",
        element: <ExamEditPage />,
      },
      {
        path: "notes",
        element: (
          <div>
            <h2>Welcome To notes</h2>
          </div>
        ),
      },
      {
        path: "absences",
        element: (
          <div>
            <h2>Welcome To absences</h2>
          </div>
        ),
      },
      {
        path: "opportunites",
        element: (
          <div>
            <h2>Welcome To opportunites</h2>
          </div>
        ),
      },{
        path: "ressources",
        element: (
          <div>
            <h2>Welcome To ressource</h2>
          </div>
        ),
      },
    ],
  },
];

export default adminRoutes;
