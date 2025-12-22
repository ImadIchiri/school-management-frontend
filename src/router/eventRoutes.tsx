import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import { AllEventsPage } from "@/pages/evenements";

const eventRoutes: RouteObject[] = [
  {
    path: "evenements",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AllEventsPage />,
      },
      {
        path: ":id",
        element: <AllEventsPage />,
      },
    ],
  },
];

export default eventRoutes;
