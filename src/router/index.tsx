import { createBrowserRouter } from "react-router";
import adminRoutes from "./AdminRoutes";
import AbsenceRouter from "./AbsenceRouter";
import PlanningRouter from "./PlanningRouter";


const mainRouter = createBrowserRouter([
  ...adminRoutes,
  ...AbsenceRouter,
  ...PlanningRouter,
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
