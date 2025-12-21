import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import RolesPage from "@/pages/rbac/roles";
import PermissionsPage from "@/pages/rbac/permissions";

const rbacRoutes: RouteObject[] = [
  {
    // Role Bsed Access Control
    path: "rbac",
    element: <DashboardLayout />,
    children: [
      {
        path: "roles",
        children: [
          {
            index: true,
            element: <RolesPage />,
          },
          {
            path: ":id",
            element: (
              <h2>
                Role By Id, this can have list of permissions added, and others
                to select from
              </h2>
            ),
          },
        ],
      },
      {
        path: "permissions",
        element: <PermissionsPage />,
      },
    ],
  },
];

export default rbacRoutes;
