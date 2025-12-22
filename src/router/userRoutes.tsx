import DashboardLayout from "@/layouts/DashboardLayout";
import UsersPage from "@/pages/users";
import type { RouteObject } from "react-router";

const userRoutes: RouteObject[] = [
  {
    path: "users",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <UsersPage />,
      },
    ],
  },
];

export default userRoutes;
