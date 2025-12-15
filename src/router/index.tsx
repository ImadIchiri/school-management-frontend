import { createBrowserRouter } from "react-router";
import adminRoutes from "./AdminRoutes";

const mainRouter = createBrowserRouter([
  ...adminRoutes,
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
