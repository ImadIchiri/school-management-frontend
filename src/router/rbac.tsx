import type { RouteObject } from "react-router";
import DashboardLayout from "@/layouts/DashboardLayout";
import PermissionsPage from "@/pages/rbac/permissions";
import DisplayRoles from "@/pages/rbac/roles/display";
import AffectPermissionsToRole from "@/pages/rbac/roles/AffectPermissionsToRole";

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
            element: <DisplayRoles />,
          },
          {
            path: ":roleId/permissions",
            element: <AffectPermissionsToRole />,
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
