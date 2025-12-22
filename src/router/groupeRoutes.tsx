import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import GroupesDisplay from "@/pages/groupes/index";


const groupesRoutes: RouteObject[] = [
    {
        path: "groupes",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: (
                    <GroupesDisplay />
                ),
            },
        ],
    },
];

export default groupesRoutes;