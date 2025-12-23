import { RouterProvider } from "react-router";
import mainRouter from "./router";
import "./App.css";
import "./api";

const App = () => <RouterProvider router={mainRouter} />;

export default App;
