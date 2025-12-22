import { createBrowserRouter } from "react-router";
import adminRoutes from "./AdminRoutes";
import filieresRoutes from "./filiereRoutes";
import niveauxRoutes from "./niveauxRoutes";
import groupesRoutes from "./groupeRoutes";

const mainRouter = createBrowserRouter([
  ...adminRoutes,
  ...filieresRoutes,
  ...niveauxRoutes,
  ...groupesRoutes,
  {
    path: "/",
    element: (
      <div>
        <h2>This Our LandingPage ...</h2>
      </div>
    ),
  },
]);

export default mainRouter;
