import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import RessourceStyle from "@/components/ressource";
import RessourceUpdate from "@/pages/ressource/updateRessource/UpdateRessource";
import RessourceDetails from "@/pages/ressource/displayRessource/DisplayRessource";
const ressourceRoutes: RouteObject[]=[
    {
        path:"ressources",
        element:<DashboardLayout/>,
        children:[
            {
                index:true,
                element:(
                    <RessourceStyle/>
                ),
            },
            {
                path: "update/:id",
                element: <RessourceUpdate />
            },
            {
                path: "display/:id",
                element: <RessourceDetails />
            },
        ],
    },
];

export default ressourceRoutes;