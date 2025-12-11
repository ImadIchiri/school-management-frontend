import DashboardLayout from "@/layouts/DashboardLayout";
import { Route, Routes } from "react-router";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route
          index
          element={
            <div>
              <h3>Hello Dashboard !</h3>
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
