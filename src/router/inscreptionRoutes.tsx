import type { RouteObject } from "react-router";
import InscreptionPage from "@/pages/candidature/inscreptions/index";



const inscreptionRoutes: RouteObject[] = [
    {
        path: "inscreption",
        element: <InscreptionPage />,
    },
];

export default inscreptionRoutes;