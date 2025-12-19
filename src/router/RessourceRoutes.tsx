import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import RessourceStyle from "@/components/ressource";
import RessourceUpdate from "@/pages/ressource/updateRessource/UpdateRessource";
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
            // {
            //     path: "display/:id",
            //     element: <ModuleDetails />
            // },
        ],
    },
];

export default ressourceRoutes;