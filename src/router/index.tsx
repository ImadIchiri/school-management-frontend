import { createBrowserRouter } from "react-router";
import adminRoutes from "./AdminRoutes";
import { LoginForm } from "@/pages/auth";
import userRoutes from "./userRoutes";
import moduleRoutes from "./ModuleRouter";
import coursRoutes from "./CoursRoutes";
import ressourceRoutes from "./RessourceRoutes";
import eventRoutes from "./eventRoutes";
import rbacRoutes from "./rbac";
import filieresRoutes from "./filiereRoutes";
import niveauxRoutes from "./niveauxRoutes";
import groupesRoutes from "./groupeRoutes";
import candidatRoutes from "./CandidatureRoutes";
import inscreptionRoutes from "./inscreptionRoutes";
import suivieRoutes from "./SuiviCandidature";
const mainRouter = createBrowserRouter([
  ...adminRoutes,
  ...userRoutes,
  ...moduleRoutes,
  ...coursRoutes,
  ...ressourceRoutes,
  ...eventRoutes,
  ...rbacRoutes,
   ...filieresRoutes,
  ...niveauxRoutes,
  ...groupesRoutes,
  ...candidatRoutes,
  ...inscreptionRoutes,
  ...suivieRoutes,
  {
    path: "/",
    element: (
      <div>
        <h2>This Our LandingPage ...</h2>
      </div>
    ),
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);

export default mainRouter;
