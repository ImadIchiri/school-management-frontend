import { createBrowserRouter } from "react-router";
import adminRoutes from "./AdminRoutes";
import { LoginForm } from "@/pages/auth";
import userRoutes from "./userRoutes";
import eventRoutes from "./eventRoutes";

const mainRouter = createBrowserRouter([
  ...adminRoutes,
  ...userRoutes,
  ...eventRoutes,
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
