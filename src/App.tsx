import { Route, Routes } from "react-router"; // ✅ react-router-dom pour Vite + React
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./features/auth/pages/login"; // ta page login

function App() {
  return (
    <Routes>
      {/* Route Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Route Dashboard */}
      <Route path="/" element={<DashboardLayout />}>
        <Route
          index
          element={
            <div>
              <h3>Hello Again !</h3>
              <h3>Hello Dashboard !</h3>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
