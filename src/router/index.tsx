import { createBrowserRouter } from "react-router";
import adminRoutes from "./AdminRoutes";
import moduleRoutes from "./ModuleRouter";
import coursRoutes from "./CoursRoutes";
import ressourceRoutes from "./RessourceRoutes";
import eventRoutes from "./eventRoutes";

const mainRouter = createBrowserRouter([
  ...adminRoutes,
  ...moduleRoutes,
  ...coursRoutes,
  ...ressourceRoutes,
  ...eventRoutes,
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
