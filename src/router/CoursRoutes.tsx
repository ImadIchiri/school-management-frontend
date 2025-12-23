import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import Cours from "@/pages/cours";
import CoursUpdate from "@/pages/cours/coursUpdate/UpdateCours";
import CoursDetails from "@/pages/cours/coursDisplay/DisplayCours";

const coursRoutes: RouteObject[] = [
    {
        path:"Cours",
        element:<DashboardLayout/>,
        children:[
            {
                index:true,
                element:(
                    <Cours />
                ),
            },
            {
                path:"update/:id",
                element:<CoursUpdate />
            },
            {
                path:"display/:id",
                element:<CoursDetails />
            },
        ],
    },
];

export default coursRoutes;