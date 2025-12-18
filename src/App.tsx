import { useRoutes } from "react-router";
import "./App.css";
import { dashboardRoutes } from "./router";
import { ToastProvider } from "@/shared/components/Toast";

function App() {
  const routes = useRoutes(dashboardRoutes);

  return (
    <ToastProvider>
      {routes}
    </ToastProvider>
  );
}

export default App;
