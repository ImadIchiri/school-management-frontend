import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import FiliereDisplay from "@/pages/filieres/index";


const filieresRoutes: RouteObject[] = [
    {
        path: "filieres",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: (
                    <FiliereDisplay />
                ),
            },
        ],
    },
];

export default filieresRoutes;