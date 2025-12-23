import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import PlanningPage from "@/pages/planning";

const planningRouter: RouteObject[] = [
    {
        path: "planning",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <PlanningPage />,
            },
        ],
    },
];

export default planningRouter;