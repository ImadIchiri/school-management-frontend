import Niveaux from "./pages/niveaux";
import NiveauDetailsPage from "./pages/niveauxDetails";

export const appRoutes = [
  {
    path: "/niveaux/:id",
    element: NiveauDetailsPage,
  },
];

export const niveauxRoutes = [
  {
    path: "/niveaux",
    element: Niveaux ,
  },
];