import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import { AbsencePage } from "@/features/absences/pages/AbsencePage";

const AbsenceRouter: RouteObject[] = [
    {
        path:"absences",
        element:<DashboardLayout/>,
        children:[
            {
                index:true,
                element:<AbsencePage/>,
            },
        ],
    },
];







export default AbsenceRouter;
