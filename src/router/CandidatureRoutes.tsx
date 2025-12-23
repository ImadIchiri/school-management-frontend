import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import CandidaturesPage from "@/pages/candidature/index";



const candidatRoutes: RouteObject[] = [
    {
        path: "candidats",
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: (
                    <CandidaturesPage />
                ),
            },
        ],
    },
];

export default candidatRoutes;