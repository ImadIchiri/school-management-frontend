import type { RouteObject } from "react-router";
import SuiviCandidaturePage from "@/pages/candidature/SuiviCandidaturePage/SuiviCandidaturePage";




const suivieRoutes: RouteObject[] = [
    {
        path: "suivie",
        element: <SuiviCandidaturePage />,
    },
];

export default suivieRoutes;