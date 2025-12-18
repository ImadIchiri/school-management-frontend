import { createBrowserRouter } from "react-router";
import adminRoutes from "./AdminRoutes";
import eventRoutes from "./eventRoutes";

const mainRouter = createBrowserRouter([
  ...adminRoutes,
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
