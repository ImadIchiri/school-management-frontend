import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import Module from "../components/modules/index";
import ModuleUpdate from "@/pages/modules/moduleUpdate/UpdateModule";
import ModuleDetails from "@/pages/modules/moduleDisplay/DisplayModule";
const moduleRoutes: RouteObject[]=[
    {
        path:"Modules",
        element:<DashboardLayout/>,
        children:[
            {
                index:true,
                element:(
                    <Module/>
                ),
            },
            {
                path: "update/:id",
                element: <ModuleUpdate />
            },
            {
                path: "display/:id",
                element: <ModuleDetails />
            },
        ],
    },
];

export default moduleRoutes;