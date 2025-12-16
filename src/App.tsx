import { Route, Routes } from "react-router";
import "./App.css";
import DashboardLayout from "./layouts/DashboardLayout";
import Filieres from "./features/filieres/pages/filieres";
import FiliereDetailsPage from "./features/filieres/pages/filiereDetails";
import Niveaux from "./features/niveaux/pages/niveaux";
import NiveauDetailsPage from "./features/niveaux/pages/niveauxDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
         <Route path="filieres" element={<Filieres />} />
         <Route path="filieres/:id" element={<FiliereDetailsPage />} />
         <Route path="niveaux" element={<Niveaux />} />
         <Route path="niveaux/:id" element={<NiveauDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
