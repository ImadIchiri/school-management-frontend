import { Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import Module from "./features/modules/pages/module";
function App() {
  return (
    <>
      <Routes>
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
          <Route path="module" element={<Module />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
