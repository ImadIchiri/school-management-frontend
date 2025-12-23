import { createBrowserRouter } from "react-router";
import adminRoutes from "./AdminRoutes";
import { LoginForm } from "@/pages/auth";
import userRoutes from "./userRoutes";
import moduleRoutes from "./ModuleRouter";
import coursRoutes from "./CoursRoutes";
import ressourceRoutes from "./RessourceRoutes";
import eventRoutes from "./eventRoutes";
import rbacRoutes from "./rbac";

const mainRouter = createBrowserRouter([
  ...adminRoutes,
  ...userRoutes,
  ...moduleRoutes,
  ...coursRoutes,
  ...ressourceRoutes,
  ...eventRoutes,
  ...rbacRoutes,
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
