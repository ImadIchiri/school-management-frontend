import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import NiveauxDisplay from "@/pages/niveaux/index";


const niveauxRoutes: RouteObject[] = [
    {
        path: "niveaux",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: (
                    <NiveauxDisplay />
                ),
            },
        ],
    },
];

export default niveauxRoutes;