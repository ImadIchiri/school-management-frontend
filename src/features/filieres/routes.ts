import Filieres from "./pages/filieres";
import FiliereDetailsPage from "./pages/filiereDetails"; // import de la page détail

export const appRoutes = [
  {
    path: "/filieres/:id", // route pour le détail d'une filière
    element: FiliereDetailsPage ,
  },
];

export const filieresRoutes = [
  {
    path: "/filieres", // route pour la liste des filières
    element: Filieres ,
  },
];






