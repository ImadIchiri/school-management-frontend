import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import Ressource from "@/pages/ressource";
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
                    <Ressource/>
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