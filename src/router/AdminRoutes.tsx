import Login from "@/features/auth/components/Login";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Route, Routes } from "react-router";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
